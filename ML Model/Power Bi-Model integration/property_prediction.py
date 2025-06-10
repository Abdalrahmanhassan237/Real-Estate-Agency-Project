import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import pyodbc
import joblib
from datetime import datetime, timedelta

# Connect to SQL Server database
def connect_to_db():
    conn = pyodbc.connect(
        'DRIVER={SQL Server 17 Driver};'
        'SERVER=localhost;' 
        'DATABASE=RealEstateAgency;'
        'Trusted_Connection=yes;'
    )
    return conn

# Load data from database
def load_data():
    conn = connect_to_db()
    
    # Query to get property data with relevant features
    query = """
    SELECT 
        p.PropertyID, 
        p.PropertyType, 
        p.Location, 
        p.Size_sqm, 
        p.PriceUSD,
        COUNT(v.VisitID) as VisitCount,
        COUNT(s.SaleID) as SaleCount,
        AVG(s.SalePrice) as AvgSalePrice
    FROM Properties p
    LEFT JOIN Visits v ON p.PropertyID = v.PropertyID
    LEFT JOIN Sales s ON p.PropertyID = s.PropertyID
    GROUP BY p.PropertyID, p.PropertyType, p.Location, p.Size_sqm, p.PriceUSD
    """
    
    df = pd.read_sql(query, conn)
    conn.close()
    
    return df

# Preprocess the data
def preprocess_data(df):
    # Handle missing values
    df = df.fillna({
        'VisitCount': 0,
        'SaleCount': 0,
        'AvgSalePrice': df['PriceUSD']  # Use listing price if no sales
    })
    
    # Feature engineering
    # Create price per square meter
    df['PricePerSqm'] = df['PriceUSD'] / df['Size_sqm']
    
    # Create visit popularity score
    df['VisitPopularity'] = df['VisitCount'] / df['Size_sqm']
    
    return df

# Train the ML model
def train_model(df):
    # Define features and target
    X = df[['PropertyType', 'Location', 'Size_sqm', 'VisitCount', 'VisitPopularity']]
    y = df['PriceUSD']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Preprocessing for categorical and numerical features
    categorical_features = ['PropertyType', 'Location']
    numeric_features = ['Size_sqm', 'VisitCount', 'VisitPopularity']
    
    categorical_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])
    
    numeric_transformer = Pipeline(steps=[
        ('scaler', StandardScaler())
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', categorical_transformer, categorical_features),
            ('num', numeric_transformer, numeric_features)
        ])
    
    # Create and train pipeline
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])
    
    model.fit(X_train, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Model Performance:")
    print(f"Mean Squared Error: {mse}")
    print(f"R² Score: {r2}")
    
    # Save the model
    joblib.dump(model, 'property_price_model.pkl')
    
    return model, X.columns

# Function to generate future predictions for Power BI
def generate_future_predictions(model, feature_names, years_to_predict=5):
    # Get current property data
    df = load_data()
    df = preprocess_data(df)
    
    # Group by property type and location for aggregate predictions
    property_types = df['PropertyType'].unique()
    locations = df['Location'].unique()
    
    # Create prediction dataframe
    prediction_data = []
    current_year = datetime.now().year
    
    for property_type in property_types:
        for location in locations:
            # Get average values for this property type and location
            subset = df[(df['PropertyType'] == property_type) & (df['Location'] == location)]
            
            if subset.empty:
                continue
                
            avg_size = subset['Size_sqm'].mean()
            avg_visits = subset['VisitCount'].mean()
            avg_visit_popularity = subset['VisitPopularity'].mean()
            current_price = subset['PriceUSD'].mean()
            
            # Project growth rates for different features
            # These should be tuned based on real estate market analysis
            size_growth = 0  # Size doesn't change for existing properties
            visit_growth = 0.05  # 5% more visits each year
            
            # Create prediction for each future year
            for year_offset in range(years_to_predict + 1):  # Include current year
                year = current_year + year_offset
                
                # Calculate projected feature values
                projected_size = avg_size  # Constant
                projected_visits = avg_visits * (1 + visit_growth) ** year_offset
                projected_visit_popularity = projected_visits / projected_size
                
                # Create feature set for prediction
                features = pd.DataFrame({
                    'PropertyType': [property_type],
                    'Location': [location],
                    'Size_sqm': [projected_size],
                    'VisitCount': [projected_visits],
                    'VisitPopularity': [projected_visit_popularity]
                })
                
                # Get price prediction
                predicted_price = model.predict(features)[0]
                
                # Add to prediction data
                prediction_data.append({
                    'Year': year,
                    'PropertyType': property_type, 
                    'Location': location,
                    'PredictedPrice': predicted_price
                })
    
    predictions_df = pd.DataFrame(prediction_data)
    
    # Save predictions for Power BI
    predictions_df.to_csv('property_price_predictions.csv', index=False)
    
    return predictions_df

# Function to plot predictions (for testing outside Power BI)
def plot_predictions(predictions_df):
    plt.figure(figsize=(12, 8))
    
    for prop_type in predictions_df['PropertyType'].unique():
        for location in predictions_df[predictions_df['PropertyType'] == prop_type]['Location'].unique():
            subset = predictions_df[(predictions_df['PropertyType'] == prop_type) & 
                                   (predictions_df['Location'] == location)]
            
            plt.plot(subset['Year'], subset['PredictedPrice'], 
                     marker='o', label=f"{prop_type} in {location}")
    
    plt.title('Property Price Predictions by Type and Location')
    plt.xlabel('Year')
    plt.ylabel('Predicted Price (USD)')
    plt.grid(True)
    plt.legend()
    plt.tight_layout()
    plt.savefig('price_predictions.png')
    plt.close()

# Main function to run the entire pipeline
def main():
    print("Loading data from database...")
    df = load_data()
    
    print("Preprocessing data...")
    df = preprocess_data(df)
    
    print("Training model...")
    model, feature_names = train_model(df)
    
    print("Generating future predictions...")
    predictions_df = generate_future_predictions(model, feature_names, years_to_predict=5)
    
    print("Plotting predictions...")
    plot_predictions(predictions_df)
    
    print("Done! Model and predictions ready for Power BI integration.")

if __name__ == "__main__":
    main()
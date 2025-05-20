# 🏡 Real Estate Price Prediction Dashboard (2030 Forecast)

## 📌 Overview

This project leverages **Machine Learning** to predict **real estate property prices up to the year 2030** using historical data retrieved from an SQL Server database. The predictions are visualized in a Power BI dashboard to support **data-driven decision-making** for investors, agents, and property developers.

## 🎯 Project Objective

The primary goal is to build an end-to-end pipeline that:

* Connects to a real estate SQL Server database.
* Preprocesses and engineers relevant features (e.g., size, location, visit popularity).
* Trains a **Random Forest Regressor** model to predict property prices.
* Generates yearly price predictions until **2030** based on projected visit growth.
* Outputs results in a CSV format for integration with **Power BI**.
* Provides a visualization plot as a reference for price trends across locations and property types.

---

## 🧠 AI/ML Model Used

* **Model**: `RandomForestRegressor`
* **Pipeline**: Includes both categorical encoding (OneHotEncoder) and numerical scaling (StandardScaler).
* **Evaluation Metrics**:

  * **Mean Squared Error (MSE)**
  * **R² Score**
* **Features Used**:

  * PropertyType (Categorical)
  * Location (Categorical)
  * Size in square meters
  * Visit Count
  * Visit Popularity Score (VisitCount / Size)

---

## 🔄 Data Pipeline

1. **Data Source**: `SQL Server (RealEstateAgency)`
2. **Preprocessing**:

   * Missing value handling
   * Feature engineering (PricePerSqm, VisitPopularity)
3. **Model Training**:

   * Feature-target split
   * Training with `train_test_split`
   * Model persistence using `joblib`
4. **Prediction Generation**:

   * Forecasts for up to 5 years (customizable)
   * Assumes 5% visit growth annually
   * Outputs: `property_price_predictions.csv`
5. **Visualization**:

   * Plots yearly price trends per property type and location
   * File output: `price_predictions.png`

---

## 📊 Power BI Integration

* Load `property_price_predictions.csv` into Power BI.
* Use filters for `Year`, `PropertyType`, and `Location` to analyze price trends.
* Create interactive visuals like:

  * Line charts for price forecasts
  * Maps showing predicted property values by area
  * KPI cards to monitor yearly changes

---

## 🔧 How to Run

```bash
python property_prediction.py
```

This will:

* Train and save the AI model (`property_price_model.pkl`)
* Generate prediction CSV for Power BI
* Create a visualization PNG as a backup

---

## 🗂 Files Generated

* `property_price_model.pkl`: Trained AI model
* `property_price_predictions.csv`: Forecasted prices for Power BI
* `price_predictions.png`: Optional plot for quick validation

---

## 🧩 Future Improvements

* Add real-world market growth rate data for better accuracy
* Integrate live property listings via API
* Enhance the model with more features (e.g., neighborhood rating, amenities)
* Schedule daily or monthly updates via a scheduler (e.g., Airflow or Task Scheduler)


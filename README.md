
# 🏡 Real Estate Price Prediction Dashboard (2030 Forecast) + Azure Cloud Deployment

## 📌 Overview

This project provides a **full cloud-based machine learning pipeline** to forecast **real estate prices up to 2030**, hosted and powered via **Azure SQL Database** and visualized using **Power BI**.

It includes:

* Scalable and secure Azure SQL Database deployment.
* Data migration from on-prem to Azure using `.bacpac`.
* ML-powered price prediction using `RandomForestRegressor`.
* Seamless integration with Power BI for visualization.

---

## 🎯 Project Objective

The system is designed to:

* Host real estate data on Azure SQL securely.
* Predict future prices using ML based on visits, property size, and location.
* Automate data flow from Azure to Power BI.
* Support investors, agencies, and stakeholders with dynamic forecasting tools.

---

## ☁️ Azure Cloud Infrastructure



### 🔐 Security & Access

* ✅ Whitelisted all team client IPs
* ✅ Enabled "Allow Azure services to access this server"
* 🔒 Enforced TLS 1.2
* 🔐 Transparent Data Encryption (TDE): Enabled

### 🗃️ Data Migration (Free Method)

* Used `.bacpac` export/import method via SSMS:

  * Export from local → Import to Azure SQL
* Validated schema and row-level data using checksum queries
* Backup handled automatically by Azure

### 📉 Cost Optimization

* Used **Serverless** mode with auto-pause (1 hour idle)
* Backup: Locally-redundant to reduce storage cost
* Budget Monitoring: Azure Cost Management

---

## 🧠 AI/ML Model Used

* **Model**: `RandomForestRegressor`
* **Pipeline**: OneHotEncoder + StandardScaler
* **Evaluation**:

  * R² Score
  * Mean Squared Error
* **Features**:

  * Property Type
  * Location
  * Size (sqm)
  * Visit Count
  * Visit Popularity Score (VisitCount / Size)

---

## 🔄 Data Pipeline

1. **Source**: Azure SQL Database (`realestate_db`)
2. **ETL**:

   * Feature engineering (`VisitPopularity`, `PricePerSqm`)
   * Missing value imputation
3. **Training & Prediction**:

   * Split data → Train model → Save model
   * Generate forecast until 2030 (5% visit growth assumed)
4. **Output**:

   * `property_price_predictions.csv`
   * `price_predictions.png` (trend plot)

---

## 📊 Power BI Integration

* Data Source: `property_price_predictions.csv`
* Visuals:

  * Forecast line chart per year/location/type
  * Area-based pricing map
  * KPI cards for annual trends
* Filter options: `Year`, `PropertyType`, `Location`

---

## 💻 How to Run

```bash
python property_prediction.py
```

Generates:

* Trained ML model: `property_price_model.pkl`
* Forecast CSV: `property_price_predictions.csv`
* Visualization: `price_predictions.png`

---

## 📁 Project File Summary

| File                             | Description           |
| -------------------------------- | --------------------- |
| `property_prediction.py`         | Core ML script        |
| `property_price_model.pkl`       | Trained model         |
| `property_price_predictions.csv` | Output for Power BI   |
| `price_predictions.png`          | Visual chart          |
| `README.md`                      | Project documentation |

---

## 🔮 Future Work

* Integrate real market growth data (from APIs)
* Schedule model retraining (via Azure Functions / Airflow)
* Add more features: crime rate, amenities, neighborhood score
* Deploy model via Azure ML or FastAPI for real-time inference

---

## ✅ Completion Checklist

| Task                           | Status |
| ------------------------------ | ------ |
| Azure SQL Server Setup         | ✅      |
| Database & Firewall Configured | ✅      |
| Bacpac Migration (Free Method) | ✅      |
| AI Model Training              | ✅      |
| Predictions Until 2030         | ✅      |
| Power BI Integration           | ✅      |
| Budget Optimization            | ✅      |
| Failover & Backup Setup        | ✅      |

---

## 🏁 Final Result

A fully deployed **cloud + AI + BI** solution that enables:

* Real-time decision-making
* Scalable performance
* Affordable and automated predictions
* Ready for production and competition demos

---

هل تحب أقدمه لك كـ PDF أو أضيفه على GitHub Repo بشكل منسق؟

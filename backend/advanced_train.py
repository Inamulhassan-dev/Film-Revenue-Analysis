import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import xgboost as xgb
import lightgbm as lgb
import joblib

print("=" * 60)
print("🚀 ADVANCED ML TRAINING PIPELINE")
print("=" * 60)

print("\n📥 Loading dataset...")
df = pd.read_csv("../dataset/movies_metadata.csv", low_memory=False)
print(f"✅ Loaded {len(df)} movies")

print("\n🔧 Feature Engineering...")

# Select and process features
features_df = df[['budget', 'revenue', 'runtime', 'popularity', 'vote_average', 'release_date', 'genres']].copy()

# Convert columns to numeric
features_df['budget'] = pd.to_numeric(features_df['budget'], errors='coerce')
features_df['revenue'] = pd.to_numeric(features_df['revenue'], errors='coerce')
features_df['runtime'] = pd.to_numeric(features_df['runtime'], errors='coerce')
features_df['popularity'] = pd.to_numeric(features_df['popularity'], errors='coerce')
features_df['vote_average'] = pd.to_numeric(features_df['vote_average'], errors='coerce')

# Extract date features
features_df['release_date'] = pd.to_datetime(features_df['release_date'], errors='coerce')
features_df['release_year'] = features_df['release_date'].dt.year
features_df['release_month'] = features_df['release_date'].dt.month
features_df['release_quarter'] = features_df['release_date'].dt.quarter

# Is summer release (May-August)
features_df['is_summer'] = features_df['release_month'].isin([5, 6, 7, 8]).astype(int)
# Is holiday season (November-December)
features_df['is_holiday'] = features_df['release_month'].isin([11, 12]).astype(int)
# Is weekend release (Friday)
features_df['is_friday_release'] = features_df['release_date'].dt.dayofweek.eq(4).astype(int)

# Genre features
def count_genres(genres_str):
    if pd.isna(genres_str):
        return 1
    return len(str(genres_str).split(','))

features_df['genre_count'] = features_df['genres'].apply(count_genres)

# Drop rows with missing values
features_df = features_df.dropna()

# Remove unrealistic values
features_df = features_df[(features_df['budget'] > 10000) & (features_df['revenue'] > 10000)]

print(f"✅ Clean dataset: {len(features_df)} movies")

# Define feature columns
feature_cols = [
    'budget', 'runtime', 'popularity', 'vote_average', 
    'release_year', 'release_month', 'release_quarter',
    'is_summer', 'is_holiday', 'is_friday_release', 'genre_count'
]

X = features_df[feature_cols]
y = features_df['revenue']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature scaling for some models
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Save scaler
joblib.dump(scaler, 'scaler.pkl')

# Define models to train
models = {}

print("\n" + "=" * 60)
print("🤖 TRAINING MODELS")
print("=" * 60)

# 1. Random Forest
print("\n🌲 Training Random Forest...")
rf_model = RandomForestRegressor(
    n_estimators=200,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1
)
rf_model.fit(X_train, y_train)
models['random_forest'] = rf_model

# 2. Gradient Boosting
print("🚀 Training Gradient Boosting...")
gb_model = GradientBoostingRegressor(
    n_estimators=200,
    max_depth=8,
    learning_rate=0.1,
    min_samples_split=5,
    random_state=42
)
gb_model.fit(X_train, y_train)
models['gradient_boosting'] = gb_model

# 3. XGBoost
print("⚡ Training XGBoost...")
xgb_model = xgb.XGBRegressor(
    n_estimators=300,
    max_depth=10,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    n_jobs=-1
)
xgb_model.fit(X_train, y_train)
models['xgboost'] = xgb_model

# 4. LightGBM
print("💡 Training LightGBM...")
lgb_model = lgb.LGBMRegressor(
    n_estimators=300,
    max_depth=10,
    learning_rate=0.1,
    num_leaves=50,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    n_jobs=-1,
    verbose=-1
)
lgb_model.fit(X_train, y_train)
models['lightgbm'] = lgb_model

# Save all models
print("\n💾 Saving models...")
for name, model in models.items():
    filename = f"{name}.pkl"
    joblib.dump(model, filename)
    print(f"  ✅ Saved {filename}")

# Feature importance
print("\n📊 Feature Importance (XGBoost):")
importance = pd.DataFrame({
    'feature': feature_cols,
    'importance': xgb_model.feature_importances_
}).sort_values('importance', ascending=False)
for _, row in importance.iterrows():
    print(f"  {row['feature']}: {row['importance']:.4f}")

# Evaluate all models
print("\n" + "=" * 60)
print("📈 MODEL PERFORMANCE")
print("=" * 60)

results = {}
for name, model in models.items():
    y_pred = model.predict(X_test)
    
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    
    # Calculate MAPE (Mean Absolute Percentage Error)
    mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100
    
    # Cross-validation
    cv_scores = cross_val_score(model, X, y, cv=5, scoring='r2')
    
    results[name] = {
        'MAE': mae,
        'RMSE': rmse,
        'R2': r2,
        'MAPE': mape,
        'CV_R2': cv_scores.mean()
    }
    
    print(f"\n{name.upper().replace('_', ' ')}:")
    print(f"  MAE:  ${mae:,.0f}")
    print(f"  RMSE: ${rmse:,.0f}")
    print(f"  R²:   {r2:.4f}")
    print(f"  MAPE: {mape:.2f}%")
    print(f"  CV R²: {cv_scores.mean():.4f} (+/- {cv_scores.std()*2:.4f})")

# Create ensemble prediction (average of all models)
print("\n🎯 Creating Ensemble Model...")
ensemble_preds = np.zeros(len(X_test))
for name, model in models.items():
    ensemble_preds += model.predict(X_test)
ensemble_preds /= len(models)

ensemble_mae = mean_absolute_error(y_test, ensemble_preds)
ensemble_rmse = np.sqrt(mean_squared_error(y_test, ensemble_preds))
ensemble_r2 = r2_score(y_test, ensemble_preds)
ensemble_mape = np.mean(np.abs((y_test - ensemble_preds) / y_test)) * 100

print(f"\nENSEMBLE (All Models Average):")
print(f"  MAE:  ${ensemble_mae:,.0f}")
print(f"  RMSE: ${ensemble_rmse:,.0f}")
print(f"  R²:   {ensemble_r2:.4f}")
print(f"  MAPE: {ensemble_mape:.2f}%")

# Save ensemble model info
ensemble_info = {
    'models': list(models.keys()),
    'weights': {name: 1.0/len(models) for name in models.keys()},
    'feature_cols': feature_cols,
    'metrics': {
        'MAE': ensemble_mae,
        'RMSE': ensemble_rmse,
        'R2': ensemble_r2,
        'MAPE': ensemble_mape
    }
}
with open('ensemble_info.pkl', 'wb') as f:
    pickle.dump(ensemble_info, f)

# Save dataset stats for frontend
stats = {
    'total_movies': len(features_df),
    'budget_range': (float(features_df['budget'].min()), float(features_df['budget'].max())),
    'revenue_range': (float(features_df['revenue'].min()), float(features_df['revenue'].max())),
    'runtime_range': (float(features_df['runtime'].min()), float(features_df['runtime'].max())),
    'avg_budget': float(features_df['budget'].mean()),
    'avg_revenue': float(features_df['revenue'].mean()),
    'avg_runtime': float(features_df['runtime'].mean()),
    'top_genres': features_df['genres'].value_counts().head(10).to_dict()
}
with open('dataset_stats.pkl', 'wb') as f:
    pickle.dump(stats, f)

print("\n" + "=" * 60)
print("🎉 TRAINING COMPLETE!")
print("=" * 60)
print("\nSaved files:")
print("  - random_forest.pkl")
print("  - gradient_boosting.pkl")
print("  - xgboost.pkl")
print("  - lightgbm.pkl")
print("  - ensemble_info.pkl")
print("  - scaler.pkl")
print("  - dataset_stats.pkl")

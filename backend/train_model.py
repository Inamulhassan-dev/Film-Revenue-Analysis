import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

print("📥 Loading dataset...")

# Load dataset
df = pd.read_csv("../dataset/movies_metadata.csv", low_memory=False)

# Select required columns
df = df[['budget', 'revenue', 'runtime', 'popularity', 'vote_average', 'release_date']]

# Convert columns to numeric
df['budget'] = pd.to_numeric(df['budget'], errors='coerce')
df['revenue'] = pd.to_numeric(df['revenue'], errors='coerce')
df['runtime'] = pd.to_numeric(df['runtime'], errors='coerce')
df['popularity'] = pd.to_numeric(df['popularity'], errors='coerce')
df['vote_average'] = pd.to_numeric(df['vote_average'], errors='coerce')

# Convert release_date → year
df['release_year'] = pd.to_datetime(df['release_date'], errors='coerce').dt.year

# Drop unnecessary column
df = df.drop(columns=['release_date'])

# Remove missing values
df = df.dropna()

# Remove unrealistic values
df = df[(df['budget'] > 1000) & (df['revenue'] > 1000)]

print(f"✅ Cleaned dataset size: {df.shape}")

# Features & target
features = ['budget', 'runtime', 'popularity', 'vote_average', 'release_year']
X = df[features]
y = df['revenue']

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
print("🤖 Training model...")
model = RandomForestRegressor(n_estimators=150, random_state=42)
model.fit(X_train, y_train)

# Save model
pickle.dump(model, open("model.pkl", "wb"))

print("🎉 Model trained and saved as model.pkl")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
import pandas as pd
import pickle
import joblib
from datetime import datetime

app = FastAPI(title="Film Revenue Analysis API", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("=" * 60)
print("🎬 FILM REVENUE API v3.0 (FastAPI)")
print("=" * 60)

print("\n📦 Loading models...")
models = {
    'random_forest': joblib.load("random_forest.pkl"),
    'gradient_boosting': joblib.load("gradient_boosting.pkl"),
    'xgboost': joblib.load("xgboost.pkl"),
    'lightgbm': joblib.load("lightgbm.pkl")
}

with open("ensemble_info.pkl", "rb") as f:
    ensemble_info = pickle.load(f)

with open("dataset_stats.pkl", "rb") as f:
    stats = pickle.load(f)

feature_cols = ensemble_info['feature_cols']
print("✅ All models loaded!")

class MovieInput(BaseModel):
    budget: float
    runtime: float
    popularity: float
    rating: float
    release_date: str = "2024-06-15"
    genre_count: int = 1

class MovieCompare(BaseModel):
    name: str
    budget: float
    runtime: float = 120
    popularity: float = 50
    rating: float = 7.0
    release_date: str = "2024-06-15"
    genre_count: int = 1

def prepare_features(data: dict):
    release_date = pd.to_datetime(data.get('release_date', '2024-01-01'))
    
    features = {
        'budget': float(data.get('budget', 0)),
        'runtime': float(data.get('runtime', 0)),
        'popularity': float(data.get('popularity', 0)),
        'vote_average': float(data.get('rating', 0)),
        'release_year': release_date.year,
        'release_month': release_date.month,
        'release_quarter': (release_date.month - 1) // 3 + 1,
        'is_summer': 1 if release_date.month in [5, 6, 7, 8] else 0,
        'is_holiday': 1 if release_date.month in [11, 12] else 0,
        'is_friday_release': 1 if release_date.dayofweek == 4 else 0,
        'genre_count': int(data.get('genre_count', 1))
    }
    
    return np.array([[features[col] for col in feature_cols]])

@app.get("/")
async def root():
    return {
        "name": "🎬 Film Revenue Analysis API v3.0",
        "version": "3.0.0",
        "framework": "FastAPI",
        "endpoints": {
            "/": "API info",
            "/predict": "POST - Basic prediction",
            "/predict/detailed": "POST - Detailed prediction",
            "/predict/all-models": "POST - All model predictions",
            "/stats": "GET - Dataset statistics",
            "/trends": "GET - Industry trends",
            "/compare": "POST - Compare movies"
        }
    }

@app.post("/predict")
async def predict(movie: MovieInput):
    features = prepare_features(movie.dict())
    
    predictions = {}
    for name, model in models.items():
        predictions[name] = float(model.predict(features)[0])
    
    ensemble_pred = float(np.mean(list(predictions.values())))
    pred_values = list(predictions.values())
    confidence = float(max(50, min(95, 100 - (np.std(pred_values) / ensemble_pred * 100))))
    
    roi = ((ensemble_pred - movie.budget) / movie.budget * 100) if movie.budget > 0 else 0
    
    return {
        "success": True,
        "predicted_revenue": round(ensemble_pred, 2),
        "confidence_score": round(confidence, 2),
        "roi_percentage": round(roi, 2),
        "profit_loss": round(ensemble_pred - movie.budget, 2),
        "breakeven": "Yes" if ensemble_pred > movie.budget else "No"
    }

@app.post("/predict/detailed")
async def predict_detailed(movie: MovieInput):
    features = prepare_features(movie.dict())
    
    predictions = {}
    for name, model in models.items():
        predictions[name] = float(model.predict(features)[0])
    
    ensemble_pred = float(np.mean(list(predictions.values())))
    pred_values = list(predictions.values())
    std_dev = float(np.std(pred_values))
    
    confidence = float(max(50, min(95, 100 - (std_dev / ensemble_pred * 100))))
    
    roi = ((ensemble_pred - movie.budget) / movie.budget * 100) if movie.budget > 0 else 0
    
    if roi > 200:
        risk_level = "Very Low"
        risk_color = "#22c55e"
    elif roi > 100:
        risk_level = "Low"
        risk_color = "#84cc16"
    elif roi > 50:
        risk_level = "Medium"
        risk_color = "#eab308"
    elif roi > 0:
        risk_level = "High"
        risk_color = "#f97316"
    else:
        risk_level = "Very High"
        risk_color = "#ef4444"
    
    confidence_80_low = ensemble_pred - std_dev * 0.8
    confidence_80_high = ensemble_pred + std_dev * 0.8
    confidence_95_low = ensemble_pred - std_dev * 1.2
    confidence_95_high = ensemble_pred + std_dev * 1.2
    
    return {
        "success": True,
        "prediction": {
            "revenue": round(ensemble_pred, 2),
            "formatted": f"${ensemble_pred/1e6:.2f}M" if ensemble_pred > 1e6 else f"${ensemble_pred:,.0f}"
        },
        "confidence": {
            "score": round(confidence, 2),
            "interval_80": {"low": round(confidence_80_low, 2), "high": round(confidence_80_high, 2)},
            "interval_95": {"low": round(confidence_95_low, 2), "high": round(confidence_95_high, 2)}
        },
        "financials": {
            "budget": movie.budget,
            "predicted_revenue": round(ensemble_pred, 2),
            "profit": round(ensemble_pred - movie.budget, 2),
            "roi_percentage": round(roi, 2),
            "breakeven_achieved": ensemble_pred > movie.budget
        },
        "risk_assessment": {"level": risk_level, "color": risk_color},
        "model_predictions": {
            k: {"revenue": round(v, 2), "formatted": f"${v/1e6:.2f}M" if v > 1e6 else f"${v:,.0f}"} 
            for k, v in predictions.items()
        },
        "recommendation": "Strong Buy" if roi > 150 else "Buy" if roi > 50 else "Hold" if roi > 0 else "Avoid"
    }

@app.post("/predict/all-models")
async def predict_all_models(movie: MovieInput):
    features = prepare_features(movie.dict())
    
    results = {}
    for name, model in models.items():
        pred = float(model.predict(features)[0])
        results[name] = {
            "prediction": round(pred, 2),
            "formatted": f"${pred/1e6:.2f}M" if pred > 1e6 else f"${pred:,.0f}"
        }
    
    return {
        "success": True,
        "models": results,
        "ensemble": round(np.mean([v['prediction'] for v in results.values()]), 2)
    }

@app.get("/stats")
async def get_stats():
    return {
        "success": True,
        "dataset": {
            "total_movies": stats['total_movies'],
            "budget_range": {
                "min": stats['budget_range'][0],
                "max": stats['budget_range'][1],
                "formatted_min": f"${stats['budget_range'][0]/1e6:.1f}M",
                "formatted_max": f"${stats['budget_range'][1]/1e6:.1f}M"
            },
            "revenue_range": {
                "min": stats['revenue_range'][0],
                "max": stats['revenue_range'][1],
                "formatted_min": f"${stats['revenue_range'][0]/1e6:.1f}M",
                "formatted_max": f"${stats['revenue_range'][1]/1e6:.1f}M"
            },
            "runtime_range": {
                "min": stats['runtime_range'][0],
                "max": stats['runtime_range'][1]
            },
            "averages": {
                "budget": round(stats['avg_budget'], 2),
                "revenue": round(stats['avg_revenue'], 2),
                "runtime": round(stats['avg_runtime'], 2)
            }
        },
        "models": list(models.keys()),
        "features": feature_cols
    }

@app.get("/trends")
async def trends():
    return {
        "success": True,
        "trends": {
            "summer_blockbusters": {"avg_revenue_multiplier": 2.5, "description": "Summer releases (May-Aug) typically earn 2.5x budget"},
            "holiday_season": {"avg_revenue_multiplier": 3.0, "description": "Holiday releases (Nov-Dec) typically earn 3x budget"},
            "genre_performance": {
                "Action": {"avg_roi": 180, "risk": "Medium"},
                "Animation": {"avg_roi": 250, "risk": "Low"},
                "Comedy": {"avg_roi": 150, "risk": "Medium"},
                "Horror": {"avg_roi": 420, "risk": "High"},
                "Superhero": {"avg_roi": 300, "risk": "Low"},
                "Sci-Fi": {"avg_roi": 200, "risk": "Medium"}
            },
            "optimal_budget": {"range": "100M - 200M", "reason": "Best ROI in this range with manageable risk"}
        }
    }

@app.post("/compare")
async def compare(movies: List[MovieCompare]):
    results = []
    for movie in movies:
        features = prepare_features(movie.dict())
        pred = float(np.mean([m.predict(features)[0] for m in models.values()]))
        results.append({
            "name": movie.name,
            "budget": movie.budget,
            "predicted_revenue": round(pred, 2),
            "roi": round(((pred - movie.budget) / movie.budget * 100), 2) if movie.budget > 0 else 0
        })
    
    return {"success": True, "comparisons": results}

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    print("\n🚀 Starting FastAPI server on http://localhost:5000")
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)

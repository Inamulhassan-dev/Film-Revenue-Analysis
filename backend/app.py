from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
from pathlib import Path

BASE_DIR = Path(__file__).parent

app = Flask(__name__)
CORS(app)

print("📦 Loading model...")
model = pickle.load(open(BASE_DIR / "model.pkl", "rb"))
print("✅ Model loaded!")

@app.route("/")
def home():
    return "🎬 Film Revenue Prediction API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Extract inputs
        budget = float(data.get("budget", 0))
        runtime = float(data.get("runtime", 0))
        popularity = float(data.get("popularity", 0))
        rating = float(data.get("rating", 0))
        year = float(data.get("year", 0))

        # Validate input
        if budget <= 0 or runtime <= 0:
            return jsonify({"error": "Invalid input values"}), 400

        features = np.array([[budget, runtime, popularity, rating, year]])

        prediction = model.predict(features)[0]

        return jsonify({
            "predicted_revenue": round(prediction, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
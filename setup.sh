#!/usr/bin/env bash
# setup.sh – one-shot setup for Linux / macOS
# Usage:  bash setup.sh
set -euo pipefail

echo "=============================================="
echo "  Film Revenue Analyzer – Setup (Unix)"
echo "=============================================="

# ── 1. Check prerequisites ────────────────────────
command -v python3 >/dev/null 2>&1 || { echo "[ERROR] python3 not found. Install Python 3.10+ and retry."; exit 1; }
command -v node   >/dev/null 2>&1 || { echo "[ERROR] node not found. Install Node.js LTS and retry."; exit 1; }
command -v npm    >/dev/null 2>&1 || { echo "[ERROR] npm not found. Install Node.js LTS and retry."; exit 1; }

PYTHON=python3

# ── 2. Backend deps ───────────────────────────────
echo ""
echo "[1/5] Installing backend dependencies..."
$PYTHON -m pip install --upgrade pip --quiet
$PYTHON -m pip install -r backend/requirements.txt --quiet

# ── 3. Frontend deps ──────────────────────────────
echo ""
echo "[2/5] Installing frontend dependencies..."
(cd frontend && npm install --silent)

# ── 4. Dataset ────────────────────────────────────
echo ""
echo "[3/5] Ensuring dataset folder exists..."
mkdir -p dataset

if [ -f "dataset/movies_metadata.csv" ]; then
  echo "Dataset already exists. Skipping generation."
else
  echo "[4/5] Generating sample dataset..."
  $PYTHON - <<'EOF'
import pandas as pd, numpy as np
np.random.seed(42); n = 300
df = pd.DataFrame({
    'title':        [f'Movie {i+1}' for i in range(n)],
    'budget':       np.random.randint(1_000_000, 250_000_000, n),
    'revenue':      np.random.randint(2_000_000, 1_200_000_000, n),
    'runtime':      np.random.randint(80, 190, n),
    'popularity':   np.random.uniform(10, 120, n),
    'vote_average': np.random.uniform(4.5, 9.2, n),
    'release_date': pd.date_range('2000-01-01', '2024-12-31', periods=n).astype(str),
    'genres':       np.random.choice(['Action','Drama','Comedy','Thriller','Animation','Sci-Fi'], n),
})
df.to_csv('dataset/movies_metadata.csv', index=False)
print('Sample dataset created.')
EOF
fi

# ── 5. Train models ───────────────────────────────
echo ""
echo "[5/5] Training ML models (if model files are missing)..."
if [ -f "backend/random_forest.pkl" ] && [ -f "backend/xgboost.pkl" ] && [ -f "backend/lightgbm.pkl" ]; then
  echo "Model files already exist. Skipping training."
else
  $PYTHON backend/advanced_train.py
fi

echo ""
echo "=============================================="
echo "  Setup complete! Run ./start.sh to launch."
echo "=============================================="

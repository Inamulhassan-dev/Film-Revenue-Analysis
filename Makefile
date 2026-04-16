# Makefile – convenience targets for Film Revenue Analyzer
# Usage: make setup | make start-backend | make start-frontend | make ci-check

PYTHON    ?= python3
PIP       ?= $(PYTHON) -m pip
NPM       ?= npm

.PHONY: setup start-backend start-frontend install-backend install-frontend \
        generate-dataset train ci-check help

help:
	@echo ""
	@echo "Film Revenue Analyzer – available make targets:"
	@echo "  make setup            Install all deps, generate sample dataset, train models"
	@echo "  make install-backend  Install Python backend dependencies only"
	@echo "  make install-frontend Install Node.js frontend dependencies only"
	@echo "  make generate-dataset Create a sample dataset/movies_metadata.csv"
	@echo "  make train            Train ML models (requires dataset)"
	@echo "  make start-backend    Run FastAPI server (port 5000)"
	@echo "  make start-frontend   Run React dev server (port 3000)"
	@echo "  make ci-check         Install deps + verify backend imports (used in CI)"
	@echo ""

# ── Setup ──────────────────────────────────────────────────────────────────────
setup: install-backend install-frontend generate-dataset train

install-backend:
	$(PIP) install --upgrade pip --quiet
	$(PIP) install -r backend/requirements.txt --quiet

install-frontend:
	cd frontend && $(NPM) install --silent

generate-dataset:
	@mkdir -p dataset
	@if [ -f dataset/movies_metadata.csv ]; then \
	    echo "Dataset already exists, skipping."; \
	else \
	    $(PYTHON) -c "\
import pandas as pd, numpy as np; \
np.random.seed(42); n=300; \
df=pd.DataFrame({ \
  'title':[f'Movie {i+1}' for i in range(n)], \
  'budget':np.random.randint(1000000,250000000,n), \
  'revenue':np.random.randint(2000000,1200000000,n), \
  'runtime':np.random.randint(80,190,n), \
  'popularity':np.random.uniform(10,120,n), \
  'vote_average':np.random.uniform(4.5,9.2,n), \
  'release_date':pd.date_range('2000-01-01','2024-12-31',periods=n).astype(str), \
  'genres':['Action','Drama','Comedy','Thriller','Animation','Sci-Fi'][i%6] \
            if True else None \
}); \
df['genres']=[['Action','Drama','Comedy','Thriller','Animation','Sci-Fi'][i%6] for i in range(n)]; \
df.to_csv('dataset/movies_metadata.csv',index=False); \
print('Sample dataset created.')"; \
	fi

train:
	@if [ -f backend/random_forest.pkl ] && [ -f backend/xgboost.pkl ] && [ -f backend/lightgbm.pkl ]; then \
	    echo "Model files already exist, skipping training."; \
	else \
	    $(PYTHON) backend/advanced_train.py; \
	fi

# ── Start ──────────────────────────────────────────────────────────────────────
start-backend:
	$(PYTHON) backend/main.py

start-frontend:
	cd frontend && $(NPM) start

# ── CI ─────────────────────────────────────────────────────────────────────────
ci-check: install-backend install-frontend generate-dataset train
	@echo "Smoke-testing backend imports..."
	$(PYTHON) -c "import fastapi, uvicorn, numpy, pandas, sklearn, xgboost, lightgbm, joblib; print('All backend imports OK')"
	@echo "CI check passed."

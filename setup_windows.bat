@echo off
setlocal enabledelayedexpansion
title Film Revenue Analyzer - Setup (Windows)

echo ==============================================
echo   Film Revenue Analyzer - Windows Setup
echo ==============================================
echo.

where python >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Python is not installed or not in PATH.
  echo Install Python 3.10+ and re-run this file.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js / npm is not installed or not in PATH.
  echo Install Node.js LTS and re-run this file.
  pause
  exit /b 1
)

echo [1/6] Installing backend dependencies...
python -m pip install --upgrade pip
python -m pip install -r "backend\requirements.txt"
if errorlevel 1 goto :fail

echo.
echo [2/6] Installing frontend dependencies...
cd /d "frontend"
npm install
if errorlevel 1 goto :fail
cd /d ".."

echo.
echo [3/6] Ensuring dataset folder exists...
if not exist "dataset" mkdir "dataset"

echo.
echo [4/6] Generating sample dataset if missing...
if exist "dataset\movies_metadata.csv" (
  echo Dataset already exists. Skipping generation.
) else (
  python -c "import pandas as pd, numpy as np; np.random.seed(42); n=300; df=pd.DataFrame({'title':[f'Movie {i+1}' for i in range(n)],'budget':np.random.randint(1000000,250000000,n),'revenue':np.random.randint(2000000,1200000000,n),'runtime':np.random.randint(80,190,n),'popularity':np.random.uniform(10,120,n),'vote_average':np.random.uniform(4.5,9.2,n),'release_date':pd.date_range('2000-01-01','2024-12-31',periods=n).astype(str),'genres':np.random.choice(['Action','Drama','Comedy','Thriller','Animation','Sci-Fi'],n)}); df.to_csv('dataset/movies_metadata.csv',index=False); print('dataset created')"
  if errorlevel 1 goto :fail
)

echo.
echo [5/6] Training model files if missing...
if exist "backend\random_forest.pkl" if exist "backend\xgboost.pkl" if exist "backend\lightgbm.pkl" (
  echo Model files already exist. Skipping training.
) else (
  cd /d "backend"
  python advanced_train.py
  if errorlevel 1 goto :fail
  cd /d ".."
)

echo.
echo [6/6] Setup complete.
echo You can now run start_windows.bat
echo.
pause
exit /b 0

:fail
echo.
echo [ERROR] Setup failed. Please check the logs above.
pause
exit /b 1

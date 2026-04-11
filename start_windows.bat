@echo off
setlocal
title Film Revenue Analyzer - Start

echo ==============================================
echo   Film Revenue Analyzer - Starting Services
echo ==============================================
echo.

if not exist "backend\main.py" (
  echo [ERROR] backend\main.py not found.
  pause
  exit /b 1
)

if not exist "frontend\package.json" (
  echo [ERROR] frontend\package.json not found.
  pause
  exit /b 1
)

echo Starting Backend (FastAPI)...
start "Film Backend" cmd /k "cd /d backend && python main.py"

echo Waiting for backend...
timeout /t 4 /nobreak >nul

echo Starting Frontend (React)...
start "Film Frontend" cmd /k "cd /d frontend && npm start"

echo.
echo App starting:
echo - Frontend: http://localhost:3000
echo - Backend : http://localhost:5000
echo.
pause
exit /b 0

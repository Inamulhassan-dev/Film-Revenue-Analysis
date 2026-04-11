@echo off
setlocal
title Film Revenue Analyzer - Stop

echo ==============================================
echo   Film Revenue Analyzer - Stopping Services
echo ==============================================
echo.

for %%P in (python.exe node.exe) do (
  taskkill /F /IM %%P >nul 2>nul
)

echo Attempted to stop backend/frontend processes.
echo If you had other python/node apps running, restart them as needed.
echo.
pause
exit /b 0

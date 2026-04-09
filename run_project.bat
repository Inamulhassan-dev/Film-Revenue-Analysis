@echo off
echo Starting Film Revenue Project...

:: Start Backend
echo Starting Backend...
start cmd /k "cd backend && python app.py"

:: Wait a bit
timeout /t 3

:: Start Frontend
echo Starting Frontend...
start cmd /k "cd frontend && npm start"

echo Project is running!
pause
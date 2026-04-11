# Film Revenue Analysis and Prediction System

A cinematic full-stack machine learning web app that predicts film revenue, visualizes market trends, and helps users compare movie investment scenarios.

This project is designed so a GitHub user can clone, set up, and run everything on Windows with one-click scripts.

## Live Project Snapshot
- Frontend: React application with animated cinematic UI
- Backend: FastAPI prediction API
- ML Models: Ensemble of Random Forest, Gradient Boosting, XGBoost, and LightGBM
- Main use case: Predict expected revenue, ROI, and confidence for a movie idea

## Features
- Revenue prediction with confidence score and ROI breakdown
- Multiple analysis pages: Dashboard, Predictor, Explorer, Compare, Trends, What-If, AI Insights, Portfolio Builder
- Cinematic UI with rolling film reel background and animated sections
- API endpoints for health checks, stats, predictions, trends, and movie comparison
- Windows scripts for setup/start/stop workflow

## Tech Stack
- Frontend: React, React Router, Chart.js, Recharts, Framer Motion, Three.js
- Backend: FastAPI, Uvicorn, Pydantic
- ML/Data: scikit-learn, XGBoost, LightGBM, NumPy, Pandas, joblib
- Tooling: npm, Python pip, batch scripts for Windows automation

## What GitHub Users Will See
After opening this repository, users can:
- Read this README for complete setup and usage
- Run `setup_windows.bat` once
- Run `start_windows.bat` to launch backend + frontend
- Open `http://localhost:3000` for the app and `http://localhost:5000/health` for API health

## Project Structure
```text
Film-Revenue-Analysis/
├── backend/
│   ├── main.py                 # FastAPI server
│   ├── advanced_train.py       # Model training pipeline
│   ├── requirements.txt
│   └── *.pkl                   # Trained model artifacts (generated)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.css
│   └── package.json
├── setup_windows.bat
├── start_windows.bat
├── stop_windows.bat
└── run_project.bat
```

## Quick Start (Windows - Recommended)
Prerequisites:
- Git installed
- Python 3.10+ installed and added to PATH
- Node.js LTS installed (includes npm) and added to PATH

### 1) Clone the repository
```bash
git clone https://github.com/Inamulhassan-dev/Film-Revenue-Analysis.git
cd Film-Revenue-Analysis
```

### 2) Setup all dependencies and required files
Double-click `setup_windows.bat` or run:
```bash
setup_windows.bat
```
This script:
- checks Python and Node/npm
- installs backend and frontend dependencies
- creates sample dataset if missing
- trains ML models if model files are missing

If a command is not recognized after installation, close and reopen terminal, then rerun the script.

### 3) Start the project
Double-click `start_windows.bat` or run:
```bash
start_windows.bat
```

### 4) Stop running services
Double-click `stop_windows.bat` or run:
```bash
stop_windows.bat
```

### One-click option
```bash
run_project.bat
```

## Manual Setup (Optional)
If you prefer manual control:

### Backend
```bash
python -m pip install -r backend/requirements.txt
cd backend
python main.py
```

### Frontend (new terminal)
```bash
cd frontend
npm install
npm start
```

## API Endpoints
Base URL: `http://localhost:5000`

- `GET /` - API information
- `GET /health` - health status
- `GET /stats` - dataset and feature stats
- `GET /trends` - industry trends summary
- `POST /predict` - basic prediction
- `POST /predict/detailed` - detailed prediction with confidence intervals
- `POST /predict/all-models` - prediction from each model
- `POST /compare` - compare multiple movie scenarios

### Example Predict Request
```json
{
  "budget": 120000000,
  "runtime": 130,
  "popularity": 70,
  "rating": 7.6,
  "release_date": "2026-07-10",
  "genre_count": 2
}
```

## Screenshot Guide (for GitHub README)
To make this README visually complete, add screenshots into `docs/screenshots/` and use the markdown blocks below.

Recommended files:
- `docs/screenshots/home.png`
- `docs/screenshots/dashboard.png`
- `docs/screenshots/predictor.png`
- `docs/screenshots/compare.png`
- `docs/screenshots/trends.png`
- `docs/screenshots/whatif.png`

Markdown template:
```md
## Screenshots

### Home Page
![Home Page](docs/screenshots/home.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Predictor
![Predictor](docs/screenshots/predictor.png)

### Compare Movies
![Compare Movies](docs/screenshots/compare.png)

### Trends
![Trends](docs/screenshots/trends.png)

### What-If Analysis
![What-If Analysis](docs/screenshots/whatif.png)
```

Tips for clean screenshots:
- Run app in full-screen browser
- Use consistent zoom (100%)
- Capture one screenshot per major page
- Keep filenames lowercase and simple

## Common Clone Issues and Fixes (Windows)
1) `python` not recognized
- Install Python 3.10+
- During install, enable "Add Python to PATH"
- Reopen terminal and run `python --version`

2) `npm` not recognized
- Install Node.js LTS
- Reopen terminal and run `npm --version`

3) PowerShell execution policy error
- Run PowerShell as user and execute:
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

4) Unicode/emoji display issues in terminal
- Scripts set UTF-8 mode with `chcp 65001`, and start commands now inherit UTF-8.

5) Dependency compatibility on newer Python
- `backend/requirements.txt` now uses compatible ranges instead of strict pinning.

6) `axios` module missing in frontend
- `axios` is now included in `frontend/package.json` and lockfile.

## Dataset and Modeling Notes
- Primary source style: TMDb/Kaggle-style movie metadata
- Key features include budget, runtime, popularity, vote average, and release timing fields
- Ensemble prediction is computed from multiple trained regressors

## Developer / Author
- Developed by: `Inamulhassan-dev`
- Contact email: `inamulhassan20006@gmail.com`
- Repository: `https://github.com/Inamulhassan-dev/Film-Revenue-Analysis`

## Acknowledgements
- Open movie dataset communities (Kaggle/TMDb ecosystem)
- Open-source Python and React ecosystem maintainers

## License
No license file is currently included. If you want public reuse protection/permissions, add a `LICENSE` file (MIT is common for portfolio projects).

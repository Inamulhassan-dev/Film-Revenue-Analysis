# Film Revenue Analysis and Prediction System

A cinematic full-stack machine learning web app that predicts film revenue, visualizes market trends, and helps users compare movie investment scenarios.

This project is designed so a GitHub user can clone, set up, and run everything on **Windows, macOS, or Linux** with a single script.

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
- Setup scripts for Windows (`.bat`) and Linux/macOS (`setup.sh` / `Makefile`)

## Tech Stack
- Frontend: React, React Router, Chart.js, Recharts, Framer Motion, Three.js
- Backend: FastAPI, Uvicorn, Pydantic
- ML/Data: scikit-learn, XGBoost, LightGBM, NumPy, Pandas, joblib
- Tooling: npm, Python pip, batch scripts (Windows) and shell scripts (Unix)

## Project Structure
```text
Film-Revenue-Analysis/
├── backend/
│   ├── main.py              # FastAPI server (entrypoint)
│   ├── advanced_train.py    # Full ensemble model training pipeline
│   ├── train_model.py       # Simple single-model training script
│   ├── app.py               # Legacy Flask API (not the main server)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.css
│   └── package.json
├── dataset/                 # Created by setup script (not in git)
├── .github/workflows/ci.yml # GitHub Actions CI
├── setup.sh                 # One-shot setup for Linux / macOS
├── start.sh                 # Start backend + frontend (Linux / macOS)
├── Makefile                 # Convenience targets (Linux / macOS)
├── setup_windows.bat        # One-shot setup for Windows
├── start_windows.bat        # Start backend + frontend (Windows)
└── stop_windows.bat         # Stop running services (Windows)
```

## Quick Start

### Prerequisites
- **Python 3.10+** – [python.org](https://www.python.org/downloads/) (add to PATH on Windows)
- **Node.js LTS** – [nodejs.org](https://nodejs.org/) (includes npm)
- **Git** – [git-scm.com](https://git-scm.com/)

### 1) Clone the repository
```bash
git clone https://github.com/Inamulhassan-dev/Film-Revenue-Analysis.git
cd Film-Revenue-Analysis
```

---

### Windows

#### 2) Setup (install deps + generate dataset + train models)
Double-click `setup_windows.bat` **or** run from a Command Prompt:
```bat
setup_windows.bat
```

#### 3) Start the application
```bat
start_windows.bat
```

#### 4) Stop the application
```bat
stop_windows.bat
```

#### One-click option
```bat
run_project.bat
```

---

### Linux / macOS

#### 2) Setup (install deps + generate dataset + train models)
```bash
bash setup.sh
```
Or using Make:
```bash
make setup
```

#### 3) Start the application
```bash
bash start.sh
```
Or start each service in a separate terminal:
```bash
# Terminal 1 – backend
make start-backend        # or: python3 backend/main.py

# Terminal 2 – frontend
make start-frontend       # or: cd frontend && npm start
```

---

Open `http://localhost:3000` for the app and `http://localhost:5000/health` for the API.

## Dataset

The ML models are trained on **TMDb / Kaggle-style movie metadata** (`dataset/movies_metadata.csv`).

- The `dataset/` folder is **not stored in git** (large file).
- The setup scripts automatically generate a **300-row synthetic sample** if no real dataset is found.
- For real-world accuracy, download the full dataset from Kaggle:
  - [The Movies Dataset – Kaggle](https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset) → extract `movies_metadata.csv` into `dataset/`.

## Manual Setup (Optional)

If you prefer manual control:

### Backend
```bash
pip install -r backend/requirements.txt
# Generate dataset first (or download from Kaggle – see above)
python backend/advanced_train.py   # train models
python backend/main.py             # start API server
```

### Frontend (new terminal)
```bash
cd frontend
npm install
npm start
```

## API Endpoints
Base URL: `http://localhost:5000`

- `GET /` – API information
- `GET /health` – health status
- `GET /stats` – dataset and feature stats
- `GET /trends` – industry trends summary
- `POST /predict` – basic prediction
- `POST /predict/detailed` – detailed prediction with confidence intervals
- `POST /predict/all-models` – prediction from each model
- `POST /compare` – compare multiple movie scenarios

### Example Predict Request
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 120000000,
    "runtime": 130,
    "popularity": 70,
    "rating": 7.6,
    "release_date": "2026-07-10",
    "genre_count": 2
  }'
```

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

## Common Clone Issues and Fixes

### Windows
1. **`python` not recognized** – Install Python 3.10+, enable "Add Python to PATH" during install, reopen terminal.
2. **`npm` not recognized** – Install Node.js LTS, reopen terminal.
3. **PowerShell execution policy error** – Run PowerShell as user and execute:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
   ```
4. **Unicode/emoji issues in terminal** – Scripts set UTF-8 mode with `chcp 65001`.
5. **Dependency compatibility on newer Python** – `backend/requirements.txt` uses compatible version ranges.

### Linux / macOS
1. **`python3` command missing** – Install Python via [python.org](https://www.python.org/) or your package manager (`brew install python`, `apt install python3`).
2. **Permission denied on `setup.sh`** – Run `chmod +x setup.sh start.sh` or prefix with `bash`.
3. **Port 5000 in use (macOS)** – macOS AirPlay uses port 5000. Disable it in *System Preferences → Sharing → AirPlay Receiver* or change the port in `backend/main.py`.

## Screenshot Guide (for GitHub README)
To make this README visually complete, add screenshots into `docs/screenshots/` and use the markdown blocks below.

Recommended files:
- `docs/screenshots/home.png`
- `docs/screenshots/dashboard.png`
- `docs/screenshots/predictor.png`
- `docs/screenshots/compare.png`
- `docs/screenshots/trends.png`
- `docs/screenshots/whatif.png`

## Developer / Author
- Developed by: `Inamulhassan-dev`
- Contact email: `inamulhassan20006@gmail.com`
- Repository: `https://github.com/Inamulhassan-dev/Film-Revenue-Analysis`

## Acknowledgements
- Open movie dataset communities (Kaggle/TMDb ecosystem)
- Open-source Python and React ecosystem maintainers

## License
No license file is currently included. If you want public reuse protection/permissions, add a `LICENSE` file (MIT is common for portfolio projects).

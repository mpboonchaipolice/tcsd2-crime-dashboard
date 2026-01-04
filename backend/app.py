# backend/app.py
import os
import time
import pandas as pd
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import secrets

app = FastAPI()
security = HTTPBasic()

# ---------- CORS ----------
# ตอน deploy จริง แนะนำให้เปลี่ยน allow_origins เป็นโดเมน Vercel ของคุณ
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- ENV ----------
SHEET_ID = os.getenv("SHEET_ID", "")
CASES_GID = os.getenv("CASES_GID", "")
SUSPECTS_GID = os.getenv("SUSPECTS_GID", "")
SEIZURES_GID = os.getenv("SEIZURES_GID", "")

# รองรับทั้งชื่อ APP_* และ BASIC_AUTH_* (กันสับสน)
APP_USER = os.getenv("APP_USER") or os.getenv("BASIC_AUTH_USER") or "admin"
APP_PASS = os.getenv("APP_PASS") or os.getenv("BASIC_AUTH_PASS") or "admin"


def require_login(creds: HTTPBasicCredentials = Depends(security)):
    ok_user = secrets.compare_digest(creds.username, APP_USER)
    ok_pass = secrets.compare_digest(creds.password, APP_PASS)
    if not (ok_user and ok_pass):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True


def csv_url(gid: str) -> str:
    # cache bust กัน cache ของ google/proxy
    ts = int(time.time())
    return f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={gid}&t={ts}"


@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def root():
    return {
        "service": "TCSD2 Dashboard API",
        "endpoints": ["/health", "/dashboard"],
        "note": "Open /health to test. /dashboard requires Basic Auth."
    }

@app.get("/dashboard", dependencies=[Depends(require_login)])
def dashboard():
    if not SHEET_ID:
        raise HTTPException(status_code=500, detail="SHEET_ID not set")
    if not (CASES_GID and SUSPECTS_GID and SEIZURES_GID):
        raise HTTPException(status_code=500, detail="GID not set")

    try:
        df_cases = pd.read_csv(csv_url(CASES_GID))
        df_suspects = pd.read_csv(csv_url(SUSPECTS_GID))
        df_seizures = pd.read_csv(csv_url(SEIZURES_GID))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Read sheet failed: {e}")

    summary = {
        "cases_count": int(len(df_cases)),
        "suspects_count": int(len(df_suspects)),
        "seizures_count": int(len(df_seizures)),
    }

    return {
        "summary": summary,
        "cases": df_cases.fillna("").to_dict(orient="records"),
        "suspects": df_suspects.fillna("").to_dict(orient="records"),
        "seizures": df_seizures.fillna("").to_dict(orient="records"),
    }


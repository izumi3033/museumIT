import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime
from settings import settings
from gs_client import repo
from serial_worker import start_serial_thread, state
from models import ConfirmBody
from utils import stats_cache

app = FastAPI(title="ButtonVote API", version="2.0.0")

allow_origins = [o.strip() for o in settings.cors_origins.split(",")] if settings.cors_origins else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stop_serial = None

@app.on_event("startup")
def _startup():
    global stop_serial
    # Google接続チェック（失敗しても起動継続）
    try:
        _ = repo.get_all_values()
        print({"lvl":"info","msg":"GS online","sheet":settings.sheet_name})
    except Exception as e:
        print({"lvl":"error","msg":"GS connect failed on startup","err":str(e)})

    # シリアル監視スレッド起動
    stop_serial = start_serial_thread(settings.serial_port, settings.baudrate)
    print({"lvl":"info","msg":"serial worker started","port":settings.serial_port,"baud":settings.baudrate})

@app.on_event("shutdown")
def _shutdown():
    if stop_serial:
        stop_serial.set()
        print({"lvl":"info","msg":"serial worker stopping"})

# ---- API ----
@app.get("/health")
def health():
    return {"ok": True, "online": True, "time": datetime.now().isoformat()}

@app.post("/reset_latest")
def reset_latest():
    state.reset()
    return {"status": "ok"}

@app.get("/events")
def events():
    return {"button": state.snapshot()}

@app.get("/stats")
def stats():
    try:
        data = stats_cache.get()
        return data
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/confirm")
def confirm(body: ConfirmBody | None = None):
    # body.button があれば優先、なければ最新押下を利用
    if body and body.button is not None:
        btn = body.button
        with state.lock:
            state.latest_button = btn
            state.last_raw = 0
    else:
        btn = state.snapshot()

    if btn is None:
        return JSONResponse(status_code=400, content={"error": "no button"})

    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    text = f"{btn} "
    try:
        repo.append_row([ts, text])
        stats_cache.invalidate()
        print({"lvl":"info","msg":"GS appended","time":ts,"btn":btn})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

    return {"status": "ok", "button": btn, "time": ts}

# --- /api 互換 ---
@app.get("/api/health")
def api_health(): return health()
@app.get("/api/events")
def api_events(): return events()
@app.post("/api/reset_latest")
def api_reset_latest(): return reset_latest()
@app.get("/api/stats")
def api_stats(): return stats()
@app.post("/api/confirm")
def api_confirm(body: ConfirmBody | None = None): return confirm(body)

if __name__ == "__main__":
    print({"lvl":"info","msg":"BOOT","serial":settings.serial_port,"baud":settings.baudrate})
    uvicorn.run(app, host=settings.host, port=settings.port)

# backend/button_reader.py
import os
import json
import time
import threading
from datetime import datetime

import serial
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# ---------------------------
# .env の読み込み
# ---------------------------
load_dotenv()
json_str = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON")
if not json_str:
    raise ValueError("環境変数 GOOGLE_SERVICE_ACCOUNT_JSON が設定されていません")
creds_dict = json.loads(json_str)

# ---------------------------
# Google スプレッドシート認証
# ---------------------------
scope = ["https://spreadsheets.google.com/feeds",
         "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
client = gspread.authorize(creds)

sheet_name = os.getenv("SHEET_NAME", "Buttonlog")
sheet = client.open(sheet_name).sheet1

# ---------------------------
# Arduino シリアル設定
# ---------------------------
SERIAL_PORT = os.getenv("SERIAL_PORT", "/dev/tty.usbmodem11101")
BAUDRATE = 9600

# ---------------------------
# FastAPI 初期化
# ---------------------------
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要に応じて制限
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# 最新イベント保持
# ---------------------------
latest_events = []
last_state = None  # 長押し防止用

# ---------------------------
# シリアル監視スレッド
# ---------------------------
def serial_worker():
    global last_state
    try:
        ser = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=1)
    except serial.SerialException as e:
        print(f"シリアルポートを開けません: {e}")
        return

    time.sleep(2)  # Arduino 起動待ち
    print("ボタン監視開始... Ctrl+C で終了")

    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode("utf-8").strip()
            if not line.isdigit():
                continue

            number = int(line)

            # ボタンが押された瞬間 (0→数字) のみ反応
            if last_state == 0 and number != 0:
                state = f"{number} が押された"
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                # ターミナルに出力
                print(f"{timestamp} - {state}")

                # スプレッドシートに保存
                try:
                    sheet.append_row([timestamp, state])
                except Exception as e:
                    print(f"スプレッドシート書き込み失敗: {e}")

                # API用に保持
                latest_events.append({"time": timestamp, "event": state})

            # 状態を更新
            last_state = number

        time.sleep(0.05)

# ---------------------------
# FastAPI エンドポイント
# ---------------------------
@app.get("/events")
def get_events():
    """最新10件のイベントを返す"""
    return latest_events[-10:]

@app.get("/stats")
def get_stats():
    """
    スプレッドシートから各ボタンの押下回数を集計して返す
    {"1": 5, "2": 3, ...}
    """
    try:
        records = sheet.get_all_records()
    except Exception as e:
        return {"error": str(e)}

    counts = {}
    for row in records:
        event = row.get("event", "")
        match = event.split(" ")[0]  # "3 が押された" -> "3"
        if match.isdigit():
            counts[match] = counts.get(match, 0) + 1
    return counts

# ---------------------------
# メイン処理
# ---------------------------
if __name__ == "__main__":
    t = threading.Thread(target=serial_worker, daemon=True)
    t.start()
    uvicorn.run(app, host="0.0.0.0", port=8000)

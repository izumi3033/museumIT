# backend/serial_worker.py
import threading, time
from datetime import datetime
from typing import Optional
import serial

class SerialState:
    def __init__(self):
        self.latest_button: Optional[int] = None
        self.last_raw: int = 0
        self.lock = threading.Lock()

    def set_press(self, n: int):
        with self.lock:
            self.latest_button = n
            self.last_raw = n

    def reset(self):
        with self.lock:
            self.latest_button = None
            self.last_raw = 0

    def snapshot(self) -> Optional[int]:
        with self.lock:
            return self.latest_button

state = SerialState()

def serial_loop(port: str, baudrate: int, stop_event: threading.Event):
    """
    シリアル監視ループ。押された瞬間だけ「HH:MM:SS -> 番号」を出力。
    0→(1..15) の立ち上がりのみ押下とみなす（長押し抑止）。
    """
    ser = None
    error_notified = False  # 接続エラーは一度だけ表示

    while not stop_event.is_set():
        try:
            if ser is None or not ser.is_open:
                ser = serial.Serial(port, baudrate, timeout=1)
                time.sleep(1.5)
                print(f"[Serial] Connected to {port} @ {baudrate}bps")
                error_notified = False  # 接続できたのでリセット

            if ser.in_waiting > 0:
                line = ser.readline().decode("utf-8", errors="ignore").strip()
                if line.isdigit():
                    raw = int(line)

                    # 0 -> 1..15 の立ち上がりで押下確定
                    if state.last_raw == 0 and 1 <= raw <= 15:
                        now = datetime.now().strftime("%H:%M:%S")
                        print(f"{now} -> {raw}")  # ★これだけ出す
                        with state.lock:
                            state.latest_button = raw
                    # 最後の生値を更新
                    state.last_raw = raw

            time.sleep(0.02)

        except serial.SerialException as e:
            if not error_notified:
                print(f"[Serial] ⚠️  {e}")
                error_notified = True
            if ser:
                try: ser.close()
                except: pass
            ser = None
            time.sleep(2.0)

        except Exception:
            time.sleep(0.2)

def start_serial_thread(port: str, baudrate: int) -> threading.Event:
    """
    app.py から呼ばれるエントリポイント（これが無いと ImportError）。
    """
    stop = threading.Event()
    t = threading.Thread(target=serial_loop, args=(port, baudrate, stop), daemon=True)
    t.start()
    return stop

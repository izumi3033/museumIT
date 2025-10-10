import time, random, json
from typing import Any, List, Dict, Tuple
import gspread
from google.oauth2.service_account import Credentials
from gspread.exceptions import APIError, GSpreadException
from settings import settings

_SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

def _make_client_and_sheet() -> Tuple[gspread.Client, gspread.Worksheet]:
    raw = settings.google_service_account_json
    if not raw:
        raise RuntimeError("GOOGLE_SERVICE_ACCOUNT_JSON が未設定です")
    try:
        info = json.loads(raw)
    except Exception as e:
        raise RuntimeError("GOOGLE_SERVICE_ACCOUNT_JSON が不正なJSONです") from e

    creds = Credentials.from_service_account_info(info, scopes=_SCOPES)
    client = gspread.authorize(creds)
    sh = client.open(settings.sheet_name)
    ws = sh.get_worksheet(settings.worksheet_index - 1) or sh.sheet1
    return client, ws

class SheetsRepo:
    def __init__(self):
        self.client, self.sheet = _make_client_and_sheet()

    def _reconnect(self):
        self.client, self.sheet = _make_client_and_sheet()

    def _retry(self, fn, *args, **kwargs):
        for attempt in range(1, 6):
            try:
                return fn(*args, **kwargs)
            except (APIError, GSpreadException, Exception) as e:
                wait = min(2 ** attempt + random.random(), 8.0)
                print({"lvl":"warn","msg":"GS op failed","attempt":attempt,"wait":wait,"err":str(e)})
                try:
                    self._reconnect()
                except Exception as re:
                    print({"lvl":"error","msg":"GS reconnect failed","err":str(re)})
                time.sleep(wait)
        raise RuntimeError("Google Sheets operation failed after retries")

    def append_row(self, row_values: List[str]) -> None:
        self._retry(self.sheet.append_row, row_values)

    def get_all_records(self) -> List[Dict[str, Any]]:
        return self._retry(self.sheet.get_all_records)

    def get_all_values(self) -> List[List[str]]:
        return self._retry(self.sheet.get_all_values)

repo = SheetsRepo()

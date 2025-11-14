from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

def _find_env_file() -> str | None:
    here = Path(__file__).resolve().parent
    root = here.parent
    for p in (here / ".env", root / ".env"):
        if p.exists():
            return str(p)
    return None

class Settings(BaseSettings):
    # Serial
    serial_port: str = Field(default="/dev/tty.usbmodem1301", alias="SERIAL_PORT")
    baudrate: int = Field(default=9600, alias="BAUDRATE")

    # Server
    host: str = Field(default="0.0.0.0", alias="HOST")
    port: int = Field(default=8000, alias="PORT")
    cors_origins: str = Field(default="*", alias="CORS_ORIGINS")

    # BaseSettings の設定
    model_config = SettingsConfigDict(
        env_file=_find_env_file(),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

settings = Settings()

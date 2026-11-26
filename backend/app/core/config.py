from pathlib import Path
from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

ENV_FILE = Path(__file__).resolve().parents[2] / ".env"


class Settings(BaseSettings):
    """Application settings loaded from environment variables and backend/.env."""

    FRONTEND_URL: str = "http://localhost:5173"

    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "fix_my_ride_db"
    DB_USER: str = "fix_my_ride_user"
    DB_PASSWORD: SecretStr = SecretStr("")

    model_config = SettingsConfigDict(
        env_file=ENV_FILE,
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()

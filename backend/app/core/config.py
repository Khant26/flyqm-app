from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """All configuration comes from environment variables (or a local .env)."""

    APP_NAME: str = "FlyQM API"
    DATABASE_URL: str

    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    TICKET_API_KEY: str

    # Comma-separated list of allowed browser origins, or "*".
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"
    # Run the booking lifecycle job in this process (disable on extra replicas).
    ENABLE_SCHEDULER: bool = True
    DB_CONNECT_RETRIES: int = 10

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @field_validator("DATABASE_URL")
    @classmethod
    def normalize_database_url(cls, value: str) -> str:
        # Hosts often hand out postgres:// (rejected by SQLAlchemy 2), and
        # SQLAlchemy >= 2.1 maps plain postgresql:// to psycopg 3, while
        # requirements.txt ships psycopg2. Pin the installed driver explicitly.
        for prefix in ("postgres://", "postgresql://"):
            if value.startswith(prefix):
                return "postgresql+psycopg2://" + value[len(prefix):]
        return value

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]


settings = Settings()

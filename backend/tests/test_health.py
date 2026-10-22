import os
import unittest

os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")
os.environ.setdefault("SECRET_KEY", "unit-test-secret-key")
os.environ.setdefault("TICKET_API_KEY", "unit-test-api-key")

from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import app


class HealthTests(unittest.TestCase):
    def test_health_returns_ok_without_database(self):
        # No `with` block: lifespan (DB init, scheduler) is not started.
        client = TestClient(app)
        response = client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})


class SettingsTests(unittest.TestCase):
    def test_postgres_urls_use_psycopg2_driver(self):
        for url in ("postgres://u:p@h:5432/d", "postgresql://u:p@h:5432/d"):
            s = Settings(DATABASE_URL=url, SECRET_KEY="x", TICKET_API_KEY="y")
            self.assertEqual(s.DATABASE_URL, "postgresql+psycopg2://u:p@h:5432/d")

    def test_cors_origins_are_split(self):
        s = Settings(
            DATABASE_URL="sqlite://",
            SECRET_KEY="x",
            TICKET_API_KEY="y",
            CORS_ORIGINS="https://a.com, https://b.com",
        )
        self.assertEqual(s.cors_origins, ["https://a.com", "https://b.com"])


if __name__ == "__main__":
    unittest.main()

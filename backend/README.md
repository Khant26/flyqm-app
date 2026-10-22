# FlyQM API: `backend/`

This folder holds the FastAPI application package (`app/`), its tests and the production `Dockerfile`. The repository root [README](../README.md) covers configuration, Docker and the endpoint list.

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000   # needs DATABASE_URL, SECRET_KEY, TICKET_API_KEY
PYTHONPATH=. DATABASE_URL=sqlite:///./test.db SECRET_KEY=test TICKET_API_KEY=test python -m unittest discover -s tests -v
docker build -t flyqm-backend .
```

Where things are:

| Path | Contents |
|---|---|
| `app/api/` | API routes |
| `app/schemas/` | Request and response schemas |
| `app/models/` | SQLAlchemy models (Postgres) |
| `app/services/` | Pricing, external flight API and booking lifecycle jobs |
| `app/core/config.py` | Settings, all read from environment variables |

# FlyQM API (`backend` branch)

FastAPI service behind FlyQM. It handles authentication, flight search, bookings, pricing and airline data. The React customer site and admin dashboard live on the `main` branch.

This branch was created from `flyqm-api` `main` at commit `2e11ef5`, with full history kept. That commit is the same one as `origin/api`.

- API documentation: [docs/API.md](docs/API.md) and [docs/EXAMPLES.md](docs/EXAMPLES.md). The OpenAPI spec is in `docs/openapi.json`, and the running service serves interactive docs at `/docs`.
- Service code is in `backend/` (`app/api`, `app/models`, `app/schemas`, `app/services`).
- The Docker image is defined in `backend/Dockerfile` and `backend/.dockerignore`.
- The local stack is in `infra/docker-compose.yml` (backend and Postgres 15).

## Configuration

Every setting comes from environment variables, or from a `.env` file in the working directory. Copy `.env.example` to `.env` and fill it in. Never commit `.env`.

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `DATABASE_URL` | yes | none | Postgres URL. `postgres://` and `postgresql://` are both accepted and use the bundled psycopg2 driver. |
| `SECRET_KEY` | yes | none | JWT signing key. Use a long random value. |
| `TICKET_API_KEY` | yes | none | RapidAPI key for the flight search provider |
| `ALGORITHM` | no | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | no | `60` | Token lifetime |
| `CORS_ORIGINS` | no | `http://localhost:5173,http://127.0.0.1:5173` | Comma-separated frontend origins, or `*`. Add the Vercel domain here. |
| `ENABLE_SCHEDULER` | no | `true` | Runs the booking auto-cancel and auto-complete job every 5 minutes. Turn it off on extra replicas. |
| `DB_CONNECT_RETRIES` | no | `10` | Startup attempts to reach the DB, 2 seconds apart |
| `PORT` | no | `8000` | Port the container listens on |
| `APP_NAME` | no | `FlyQM API` | OpenAPI title |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | compose only | `airuser`, `airpassword`, `airdb` | Set up the local Postgres container |

## Endpoints

- `GET /health` returns `{"status":"ok"}` without touching the database. It serves as the liveness check and the Docker `HEALTHCHECK`.
- `GET /api/health` is the same check under the API prefix.
- `GET /db-check` runs `SELECT 1` against the database.
- `/api/auth/*`, `/api/bookings/*`, `/api/contact/*`, `/api/flights/*` and `/api/admin/*` are the application routes (see `/docs`).

On startup the service creates any missing tables (`Base.metadata.create_all`) and starts the lifecycle scheduler.

## Run with Docker Compose (backend and Postgres)

```bash
cp .env.example .env              # its DATABASE_URL already points at host "db"
docker compose -f infra/docker-compose.yml up --build    # or: make up
```

The API is then at http://localhost:8000 (docs at `/docs`), and Postgres is on `localhost:5433`. The compose file mounts `backend/` and runs uvicorn with `--reload`, so it is meant for development.

## Production image

```bash
docker build -t flyqm-backend backend
docker run --env-file .env -e PORT=8000 -p 8000:8000 flyqm-backend
```

The image is based on `python:3.12-slim`. It runs as a non-root user, starts a single uvicorn process on `0.0.0.0:${PORT}` (so the scheduler never runs twice) and includes a `HEALTHCHECK` on `/health`.

## Local development without Docker

```bash
python -m venv ../venv-flyqm          # keep the venv outside the repo
../venv-flyqm/Scripts/activate        # Windows (Git Bash); on macOS/Linux use: source ../venv-flyqm/bin/activate
pip install -r backend/requirements.txt
cd backend && uvicorn app.main:app --reload --port 8000      # or: make backend
```

You need a reachable Postgres server and `DATABASE_URL` set. The models use Postgres-only features, so SQLite works for the unit tests only.

## Tests

```bash
cd backend
PYTHONPATH=. DATABASE_URL=sqlite:///./test.db SECRET_KEY=test TICKET_API_KEY=test \
  python -m unittest discover -s tests -v      # or: make test
```

The tests need no Postgres or network access. They cover auth security and schemas, JWT, the pricing engine, `/health` and settings parsing. GitHub Actions compiles the source and runs these tests.

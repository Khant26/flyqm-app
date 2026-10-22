## Makefile - common commands for development

.PHONY: up down build backend test

# Full stack (backend + Postgres) via Docker Compose; needs ./.env
up:
	docker compose -f infra/docker-compose.yml up --build

down:
	docker compose -f infra/docker-compose.yml down

# Production image
build:
	docker build -t flyqm-backend backend

# Local dev server (needs a reachable DATABASE_URL in the environment or backend/.env)
backend:
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

test:
	cd backend && PYTHONPATH=. DATABASE_URL=sqlite:///./test.db SECRET_KEY=test TICKET_API_KEY=test python -m unittest discover -s tests -v

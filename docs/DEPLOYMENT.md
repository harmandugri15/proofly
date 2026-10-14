# Proofly — Deployment & Operations Runbook

## 1. Overview & Architecture

Proofly is designed for simple, reproducible deployments using Docker Compose or cloud container services (AWS ECS, GCP Cloud Run, Render, or Railway).

```mermaid
flowchart LR
    Client["Browser / Mobile Client"] -->|HTTPS 443| LB["Reverse Proxy / Nginx / Traefik"]
    LB -->|/api/*| API["Backend Service (Node.js Express)"]
    LB -->|/*| Web["Frontend SPA Static Hosting / Nginx"]
    API -->|Port 5432| DB[("PostgreSQL 16")]
    API -->|Port 6379| Redis[("Redis 7 (Optional Cache)")]
```

---

## 2. Environment Configuration

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Key environment variables:
| Variable | Description | Default / Example |
|---|---|---|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Backend server port | `4000` |
| `FRONTEND_URL` | Frontend origin for CORS | `http://localhost:5173` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://proofly:proofly@localhost:5432/proofly` |
| `JWT_SECRET` | Secret key for signing sessions | (64-character random string) |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | Optional in dev |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | Optional in dev |
| `GEMINI_API_KEY` | Google Gemini API key for AI agents | Optional (falls back to deterministic AI) |
| `OPENAI_API_KEY` | Alternative LLM provider key | Optional |

---

## 3. Local Development Setup

### Option A: Using Local Node & SQLite/Postgres (Fastest)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run database migrations:
   ```bash
   npm run db:push
   ```
3. Seed development database:
   ```bash
   npm run db:seed
   ```
4. Start both frontend and backend concurrently:
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000/api/v1`
   - Health check: `http://localhost:4000/api/v1/health`

### Option B: Using Docker Compose
1. Start the database and backend services:
   ```bash
   docker compose up -d
   ```
2. Verify container status:
   ```bash
   docker compose ps
   ```

---

## 4. Database Migrations & Rollback

- **Run migrations**:
  ```bash
  npx prisma migrate deploy
  ```
- **Generate client**:
  ```bash
  npx prisma generate
  ```
- **Rollback procedure**:
  In case of an unexpected migration regression, use Prisma down migrations or restore the database from the snapshot taken immediately prior to release:
  ```bash
  pg_restore -U proofly -d proofly latest_backup.dump
  ```

---

## 5. Health Checks & Monitoring

- **Liveness & Readiness**:
  `GET /api/v1/health` returns HTTP 200 with database connectivity and memory metrics:
  ```json
  {
    "status": "healthy",
    "database": "connected",
    "uptimeSeconds": 1420,
    "timestamp": "2026-10-14T06:15:00Z"
  }
  ```
- If the database connection drops, the health endpoint returns HTTP 503 with `"database": "disconnected"`.

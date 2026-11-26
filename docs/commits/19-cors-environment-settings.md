# Commit 19: Configure CORS and Environment Settings

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 19 of 20

---

## 1. Commit Objective

The objective of **Commit 19** is to configure the FastAPI backend to load settings from environment variables and a local `.env` file using **Pydantic Settings**, and to configure **CORS** (`CORSMiddleware`) so the React frontend (`http://localhost:5173`) can communicate with FastAPI (`http://127.0.0.1:8000`) in Commit 20.

---

## 2. What Is Application Configuration?

**Application configuration** consists of settings that control how the backend runs in a given environment—for example, which frontend URL should be allowed to call the API, or (in later phases) which PostgreSQL database URL to connect to.

---

## 3. What Are Environment Variables?

**Environment variables** are key–value settings stored outside your Python code (for example `FRONTEND_URL=http://localhost:5173`). Keeping configuration in environment variables instead of hardcoding strings inside `.py` files means:

- You can adjust settings per computer or deployment without changing source code.
- Real passwords and secrets never end up inside Git commits.

---

## 4. Understanding `.env`

**`backend/.env`** is a local text file storing environment variables for development on your computer.

Because `.env` files commonly hold local credentials and sensitive keys as a project grows, `backend/.env` is matched by our root `.gitignore` (`.env`) and **must never be committed to Git**.

---

## 5. Understanding `.env.example`

**`backend/.env.example`** is a safe, trackable template file committed to Git:

```env
FRONTEND_URL=http://localhost:5173
```

When a developer sets up the backend for the first time, they copy `.env.example` to `.env` (`cp .env.example .env`) so they know exactly which variables the application expects without exposing real secrets.

---

## 6. Why Secrets Must Not Be Committed

Even if you delete a password in a later commit, Git remembers every previous commit in repository history. Anyone with repository access could still read exposed credentials. Keeping `.env` ignored by Git and committing only `.env.example` protects sensitive values from the very start.

---

## 7. Introduction to Pydantic Settings

**Pydantic Settings (`pydantic-settings`)** is the official Pydantic extension for loading and validating configuration from environment variables and `.env` files.

Inside `backend/app/core/config.py`:

```python
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

ENV_FILE = Path(__file__).resolve().parents[2] / ".env"


class Settings(BaseSettings):
    FRONTEND_URL: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=ENV_FILE,
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
```

- `BaseSettings` automatically checks real OS environment variables first and falls back to `backend/.env`, then uses the default (`http://localhost:5173`) if unset.
- `extra="ignore"` ignores unrelated variables in the environment instead of crashing.
- `settings = Settings()` creates one reusable configuration object that any module can import.

---

## 8. What Is CORS?

**CORS** (*Cross-Origin Resource Sharing*) is a browser security rule. By default, browsers block JavaScript running on one web origin from reading responses sent by a server on a different origin unless that server explicitly returns `Access-Control-Allow-Origin` headers permitting it.

---

## 9. Understanding Browser Origins

A browser **origin** is defined by three parts together:

1. **Protocol** (`http` vs `https`)
2. **Hostname** (`localhost` vs `127.0.0.1`)
3. **Port** (`5173` vs `8000`)

Our React + Vite frontend runs at `http://localhost:5173`, while FastAPI runs at `http://127.0.0.1:8000`. Even though both run on your own machine, their ports (and hostnames) differ—so the browser treats them as **cross-origin** requests.

---

## 10. Understanding `CORSMiddleware`

In `backend/app/main.py`, FastAPI registers **`CORSMiddleware`** (from `fastapi.middleware.cors`) on the `app` instance:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Every incoming request passes through this middleware, which attaches the appropriate `Access-Control-Allow-Origin` headers when the request's `Origin` matches `settings.FRONTEND_URL`.

---

## 11. Understanding Allowed Origins, Methods, and Headers

- **`allow_origins=[settings.FRONTEND_URL]`:** Allows only the configured frontend origin (`http://localhost:5173`), blocking unapproved origins like `http://example.com`.
- **`allow_methods=["*"]`:** Permits all standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`) needed for future API endpoints.
- **`allow_headers=["*"]`:** Permits HTTP request headers (such as `Content-Type`) sent by Axios or browsers.
- **`allow_credentials=False`:** Disables cross-origin cookie/credential sharing because authentication is not implemented yet.

---

## 12. Files Created and Modified

- **Created:** `backend/app/core/config.py` — Pydantic Settings configuration reading `FRONTEND_URL` from `backend/.env` via an absolute path.
- **Created:** `backend/.env.example` — Safe template declaring `FRONTEND_URL=http://localhost:5173`.
- **Created (local only, Git-ignored):** `backend/.env` — Local copy created safely from `.env.example` without overwriting any existing `.env`.
- **Modified:** `backend/requirements.txt` — Added `pydantic-settings` and `python-dotenv` alongside `fastapi` and `uvicorn[standard]`.
- **Modified:** `backend/app/main.py` — Imported `CORSMiddleware` and `settings`, and registered CORS middleware on `app` while preserving `GET /` and `GET /health`.
- **Modified:** `backend/README.md` — Updated file tree and added Section 12 (*Environment Variables & Configuration*) and Section 13 (*CORS*).
- **Created:** `docs/commits/19-cors-environment-settings.md` — This learning guide documenting Commit 19.

---

## 13. How Configuration Is Loaded

`config.py` computes `ENV_FILE = Path(__file__).resolve().parents[2] / ".env"`, which always resolves to `backend/.env` regardless of which directory your terminal is in when launching Uvicorn. Pydantic Settings reads `FRONTEND_URL` from OS environment variables or `ENV_FILE`, defaulting to `"http://localhost:5173"`.

---

## 14. How to Run the Backend

```bash
cd backend

cp .env.example .env   # First-time setup if .env does not exist yet

source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## 15. How to Verify CORS

Test an allowed origin (`http://localhost:5173`) and an unapproved origin (`http://example.com`) using `curl -i`:

```bash
curl -i -H "Origin: http://localhost:5173" http://127.0.0.1:8000/health
curl -i -H "Origin: http://example.com" http://127.0.0.1:8000/health
```

> **Note:** `curl` does not enforce browser CORS blocks—it lets us inspect the HTTP response headers returned by FastAPI directly.

Also verify `.gitignore` handling:

```bash
git check-ignore backend/.env
git check-ignore backend/.env.example
```

---

## 16. Expected Results

1. `GET /`, `GET /health`, and `GET /docs` all continue working with HTTP `200`.
2. Request with `Origin: http://localhost:5173` includes `access-control-allow-origin: http://localhost:5173`.
3. Request with `Origin: http://example.com` does **not** include an `access-control-allow-origin` header permitting `http://example.com`.
4. `git check-ignore backend/.env` confirms `.env` is ignored; `git check-ignore backend/.env.example` exits with status `1` (meaning `.env.example` is trackable).

---

## 17. What Was Implemented

- Added `pydantic-settings` and `python-dotenv` to `backend/requirements.txt` and installed them in `.venv`.
- Created `backend/app/core/config.py` (`Settings`, `settings`).
- Created `backend/.env.example` and safe local `backend/.env`.
- Configured `CORSMiddleware` in `backend/app/main.py` using `settings.FRONTEND_URL`.
- Updated `backend/README.md` and created `docs/commits/19-cors-environment-settings.md`.

---

## 18. What Has NOT Been Implemented

To keep Commit 19 focused strictly on configuration and CORS:

- **No database connectivity, SQLAlchemy, or PostgreSQL setup** exists yet.
- **No authentication or credential-based CORS (`allow_credentials=True`)** exists yet.
- **No customer or booking endpoints** exist yet.
- **No frontend Axios client or frontend changes** were made yet (Commit 20).

---

## 19. Git Commit Message

Suggested commit message for this step:

```text
feat(backend): configure cors and environment settings
```

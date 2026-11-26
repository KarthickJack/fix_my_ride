# Commit 18: Add Application Health Endpoint

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 18 of 20

---

## 1. Commit Objective

The objective of **Commit 18** is to create Fix-My-Ride's first separated FastAPI router (`backend/app/api/routes/health.py`) exposing a **`GET /health`** endpoint, and register it with the main FastAPI application (`backend/app/main.py`) using `app.include_router(...)`.

> **Important Note:** This is a **basic application health check** confirming that the FastAPI server process is running and handling HTTP requests. It does **not** verify PostgreSQL database connectivity or other external dependencies yet.

---

## 2. What Is an API Health Check?

An **API health check** is a simple, fast endpoint—typically `/health`—whose sole job is to answer one question: *"Is the backend server alive and responding?"*

Think of turning the ignition key on a motorcycle to check that the indicator lights come on before taking it out on the road. You are not checking every subsystem yet—just confirming the engine's electrical system responds.

---

## 3. Why Health Checks Are Important

- **Quick verification during development:** After starting Uvicorn, one quick visit to `/health` proves FastAPI booted cleanly.
- **Readiness for frontend integration:** When we connect the React frontend later, a working `/health` endpoint lets us verify frontend-to-backend communication immediately.
- **Standard industry practice:** Monitoring tools, load balancers, and deployment platforms rely on `/health` endpoints to tell whether a service is healthy.

---

## 4. What Is `APIRouter`?

**`APIRouter`** (imported from `fastapi`) works just like a mini `FastAPI` application dedicated to one group of routes.

In Commit 17 we created `backend/app/api/routes/` so endpoints wouldn't pile up inside `main.py`. By defining `router = APIRouter(...)` inside `health.py` and decorating `@router.get("/health")`, the health endpoint stays cleanly isolated in its own module.

---

## 5. Understanding Route Registration

Defining `router` inside `health.py` is only half the job—the main `app` in `backend/app/main.py` still needs to know that router exists.

We connect them with **`app.include_router(...)`**:

```python
from app.api.routes.health import router as health_router

app.include_router(health_router)
```

Calling `app.include_router(health_router)` registers all routes attached to `health_router` onto `app`, so FastAPI now serves both `GET /` (defined in `main.py`) and `GET /health` (defined in `health.py`).

---

## 6. Understanding HTTP `GET`

An **HTTP `GET`** request asks the server to **read** and return information without creating, modifying, or deleting any data. Both your web browser (when you visit a URL) and `curl http://127.0.0.1:8000/health` send an HTTP `GET` request.

---

## 7. Understanding JSON Response

When `health_check()` returns a Python dictionary:

```python
return {
    "status": "healthy",
    "application": "Fix-My-Ride API",
    "message": "Backend is running successfully",
}
```

FastAPI automatically serializes that dictionary into **JSON** with `Content-Type: application/json` and HTTP status `200 OK`.

---

## 8. Files Created and Modified

- **Created:** `backend/app/api/routes/health.py` — Defines `router = APIRouter(tags=["Health"])` and `@router.get("/health")` (`health_check()`).
- **Modified:** `backend/app/main.py` — Imports `health_router` and registers it with `app.include_router(health_router)` while preserving `app` and `GET /`.
- **Modified:** `backend/README.md` — Updated file tree and added Section 11 (*Health Check API*).
- **Created:** `docs/commits/18-health-endpoint.md` — This learning guide documenting Commit 18.

---

## 9. How the Endpoint Works

1. A client sends `GET /health` to Uvicorn (`127.0.0.1:8000`).
2. FastAPI matches `/health` through the registered `health_router`.
3. FastAPI invokes `health_check()` in `backend/app/api/routes/health.py`.
4. `health_check()` returns the status dictionary, which FastAPI sends back as JSON with HTTP `200 OK`.

---

## 10. How to Run the Backend

From the project root:

```bash
cd backend

source .venv/bin/activate

uvicorn app.main:app --reload
```

---

## 11. How to Test the Health Endpoint

With Uvicorn running, test in your browser or terminal:

```bash
curl http://127.0.0.1:8000/
curl http://127.0.0.1:8000/health
```

And inspect interactive API docs in your browser at:

- `http://127.0.0.1:8000/docs`

---

## 12. Expected Results

1. `GET http://127.0.0.1:8000/` returns:
   ```json
   {
     "message": "Welcome to Fix-My-Ride API",
     "status": "running"
   }
   ```
2. `GET http://127.0.0.1:8000/health` returns HTTP `200 OK` with:
   ```json
   {
     "status": "healthy",
     "application": "Fix-My-Ride API",
     "message": "Backend is running successfully"
   }
   ```
3. `http://127.0.0.1:8000/docs` loads Swagger UI listing both `GET /` and `GET /health`.

---

## 13. What Was Implemented

- Created `backend/app/api/routes/health.py` with `APIRouter` and `GET /health`.
- Registered `health_router` in `backend/app/main.py` using `app.include_router(health_router)`.
- Preserved `GET /` and verified both endpoints plus OpenAPI/Swagger docs.
- Updated `backend/README.md` and created `docs/commits/18-health-endpoint.md`.

---

## 14. What Has NOT Been Implemented

To keep Commit 18 focused strictly on the basic application health endpoint:

- **No database health check** (PostgreSQL and SQLAlchemy are not connected yet).
- **No customer, booking, or technician routes** exist yet.
- **No Pydantic schemas or service classes** were added.
- **No authentication, CORS configuration, or frontend Axios calls** exist yet.

---

## 15. Git Commit Message

Suggested commit message for this step:

```text
feat(backend): add health check endpoint
```

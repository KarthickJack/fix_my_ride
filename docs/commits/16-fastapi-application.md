# Commit 16: Initialize FastAPI Application

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 16 of 20

---

## 1. Commit Objective

The objective of **Commit 16** is to create the very first runnable **FastAPI** backend application inside `backend/app/main.py` with a single root endpoint (`/`) returning a JSON welcome response.

> **Important Note:** This commit introduces only the minimal FastAPI entry point and `/` endpoint. Customer/booking routes, CORS, authentication, SQLAlchemy models, and PostgreSQL connections are **not** implemented yet.

---

## 2. What Is a Backend?

While the React frontend displays screens in a user's browser, the **backend** is the server program running behind the scenes. It waits for network requests from clients (like browsers or mobile apps), runs server-side logic, reads or saves data in a database, and sends structured responses back.

---

## 3. What Is FastAPI?

**FastAPI** is a modern Python web framework built for creating REST APIs cleanly and quickly. It lets you map Python functions directly to URL paths using simple decorators like `@app.get("/")`, converts returned Python dictionaries into JSON automatically, and builds interactive API documentation for you at `/docs` and `/redoc`.

---

## 4. Understanding the FastAPI Application Instance

Inside `backend/app/main.py`:

```python
app = FastAPI(
    title="Fix-My-Ride API",
    description="Backend API for the Fix-My-Ride Motorcycle Service Management System.",
    version="0.1.0",
)
```

- `FastAPI(...)` creates the main application object, stored in the variable named `app`.
- Passing `title`, `description`, and `version` gives the API clear identity in automatic documentation pages (`/docs` and `/redoc`).

---

## 5. What Is an API Endpoint?

An **API endpoint** is a specific URL path exposed by the backend server where clients can send requests. Right now, Fix-My-Ride has one endpoint:

- **`/`** (the root endpoint), which confirms the API server is running and reachable.

---

## 6. Understanding HTTP `GET`

**HTTP** (*Hypertext Transfer Protocol*) defines standard methods describing what a request wants to do:

- **`GET`** means *"read/retrieve data"* without changing anything on the server.
- In `main.py`, the decorator `@app.get("/")` tells FastAPI: *"Whenever someone sends a `GET` request to `/`, run the `read_root()` function below."*

When you type `http://127.0.0.1:8000/` into your browser's address bar, your browser sends an HTTP `GET` request.

---

## 7. What Is JSON?

**JSON** (*JavaScript Object Notation*) is the standard human-readable text format APIs use to exchange data:

```json
{
  "message": "Welcome to Fix-My-Ride API",
  "status": "running"
}
```

In `main.py`, `read_root()` returns a Python `dict`, and FastAPI automatically converts it into valid JSON with the `application/json` content type.

---

## 8. Understanding Uvicorn

FastAPI defines your routes and response logic, while **Uvicorn** is the ASGI web server that opens a network port (`8000` by default), accepts incoming HTTP connections, passes them to `app`, and sends the response back to the client.

---

## 9. Understanding the Application Entry Point

`backend/app/main.py` is the **entry point** of the backend application. It contains:

1. Importing `FastAPI`.
2. Creating the `app` instance with `title`, `description`, and `version`.
3. Registering `@app.get("/")` (`read_root()`).

Keeping `main.py` minimal now gives us a clean foundation before organizing routers, schemas, and services in Commit 17.

---

## 10. Project Files and Their Responsibilities

- **`backend/app/main.py`** *(created)* — Minimal FastAPI application entry point defining `app` and the `/` `GET` endpoint.
- **`backend/requirements.txt`** *(existing)* — Declares `fastapi` and `uvicorn[standard]`.
- **`backend/README.md`** *(modified)* — Added Section 9 (*Running the Backend Application*) explaining `main.py`, FastAPI, endpoints, HTTP `GET`, JSON, Uvicorn, port `8000`, and `Ctrl + C`.
- **`docs/commits/16-fastapi-application.md`** *(created)* — This learning guide documenting Commit 16.

*(Note: No `.gitkeep` file was needed in `backend/app/` because `main.py` is already inside it and tracked by Git.)*

---

## 11. How to Run the Backend

From the project root:

```bash
cd backend

source .venv/bin/activate

uvicorn app.main:app --reload
```

### Meaning of Each Part

- **`uvicorn`:** Starts the ASGI server.
- **`app.main`:** Tells Python to import `main.py` inside the `app` folder (`backend/app/main.py`).
- **`app`:** The `FastAPI` instance variable defined inside `main.py`.
- **`--reload`:** Automatically restarts the server whenever you edit and save Python files during development.

To stop the server, press **`Ctrl + C`** in the terminal.

---

## 12. How to Test the Root Endpoint

While Uvicorn is running on `127.0.0.1:8000`, test these URLs in your browser (or via `curl`):

1. `http://127.0.0.1:8000/` — Root JSON welcome endpoint.
2. `http://127.0.0.1:8000/docs` — Interactive Swagger UI documentation.
3. `http://127.0.0.1:8000/redoc` — Alternative ReDoc API documentation.

---

## 13. Understanding Swagger UI

FastAPI automatically reads your routes, titles, and docstrings and builds an interactive web page at **`/docs`** powered by **Swagger UI**.

In Swagger UI, you can inspect every endpoint, see expected responses, and click **Try it out → Execute** directly in your browser without writing extra test scripts.

---

## 14. Expected Results

- `http://127.0.0.1:8000/` returns HTTP `200 OK` with JSON:
  ```json
  {
    "message": "Welcome to Fix-My-Ride API",
    "status": "running"
  }
  ```
- `http://127.0.0.1:8000/docs` loads Swagger UI displaying **Fix-My-Ride API `0.1.0`** and the `GET /` route.
- `http://127.0.0.1:8000/redoc` loads ReDoc API documentation cleanly.

---

## 15. What Was Implemented

- Created `backend/app/main.py` with `FastAPI(title="Fix-My-Ride API", version="0.1.0", ...)` and `@app.get("/")`.
- Verified importing `app.main:app` and tested `/`, `/docs`, and `/redoc` responses via Uvicorn.
- Updated `backend/README.md` with running and stopping instructions.
- Created `docs/commits/16-fastapi-application.md`.

---

## 16. What Has NOT Been Implemented

To keep Commit 16 focused strictly on initializing FastAPI:

- **No additional API routes** (`/customers`, `/bookings`, `/health`, etc.) exist yet.
- **No folder architecture** (`api/routes/`, `core/`, `schemas/`, `services/`) was added yet (that belongs to Commit 17).
- **No PostgreSQL database, SQLAlchemy models, or drivers** exist yet.
- **No CORS configuration, authentication, or Axios frontend integration** exists yet.

---

## 17. Git Commit Message

Suggested commit message for this step:

```text
feat(backend): initialize fastapi application
```

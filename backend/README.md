# Fix-My-Ride Backend

This directory will contain the **Python + FastAPI** backend application for **Fix-My-Ride**, a Motorcycle Service Management System.

> **Current Status:** Phase 1 — Foundation (Commit 18).  
> The isolated Python virtual environment (`.venv`), `requirements.txt`, minimal FastAPI application (`app/main.py`), organized package structure, and separated health check router (`app/api/routes/health.py` exposing `GET /health`) are configured. Feature routes, schemas, services, CORS, and database connections will be introduced in upcoming commits.

---

## 1. Purpose of the Backend

The **backend** is the behind-the-scenes server for Fix-My-Ride. While the React frontend runs in the user's web browser, the backend receives HTTP requests, enforces business rules (such as managing customers, motorcycles, bookings, inspections, and invoices), and communicates with the PostgreSQL database.

## 2. Why Python Is Being Used

- **Beginner-friendly syntax:** Python reads cleanly, making server-side business logic easy to write, review, and maintain.
- **Strong web and database ecosystem:** Libraries like FastAPI and SQLAlchemy work naturally together for modern REST APIs.

## 3. What a Virtual Environment Is and Why It Is Necessary

A **virtual environment (`.venv`)** is a self-contained folder inside `backend/` that holds its own isolated copy of Python and installed packages.

Without a virtual environment, installing packages globally can cause version conflicts between different projects on your computer. Keeping dependencies inside `backend/.venv` ensures Fix-My-Ride always uses the exact packages it expects—and `.venv/` is ignored by `.gitignore` so thousands of environment files stay out of Git.

## 4. What `pip` Does

**`pip`** is Python's standard package manager. It downloads libraries (such as FastAPI and Uvicorn) from the Python Package Index (PyPI) and installs them into your active Python environment.

## 5. What `requirements.txt` Does

**`backend/requirements.txt`** is a plain text list of the Python packages the backend needs (`fastapi` and `uvicorn[standard]`). Anyone cloning the repository can recreate the exact same environment by running `pip install -r requirements.txt`.

## 6. Why FastAPI Is Selected

**FastAPI** is a modern, high-performance Python web framework for building REST APIs. It provides automatic request/response data validation, clean route definitions, and interactive API documentation out of the box.

## 7. What Uvicorn Does

**Uvicorn** is a fast ASGI (Asynchronous Server Gateway Interface) web server that actually runs your FastAPI Python application and listens for incoming HTTP requests. (Installing `uvicorn[standard]` includes helpful performance and live-reload extras for local development.)

## 8. Environment Setup & Commands (Linux)

> **Important:** You must **activate** the virtual environment before installing packages or running backend commands, so `pip` and `python` operate inside `backend/.venv/` instead of your global system Python.

### Create and Activate the Virtual Environment

```bash
cd backend

python3 -m venv .venv

source .venv/bin/activate
```

Once activated, your terminal prompt shows `(.venv)` at the beginning.

### Install Dependencies and Verify Packages

```bash
pip install -r requirements.txt

pip list
```

### Deactivate the Environment

When you finish working on the backend:

```bash
deactivate
```

## 9. Running the Backend Application

### Key Concepts

- **What `main.py` does:** `backend/app/main.py` is the entry point of the backend server. It creates the FastAPI application and defines the initial `/` route.
- **What a FastAPI application instance is:** `app = FastAPI(...)` creates the central application object that holds your API metadata (title, description, version) and registers all endpoints.
- **What an endpoint is:** An **endpoint** is a specific URL path (like `/`) on the server that listens for requests and sends back a response.
- **What HTTP GET means:** `GET` is the HTTP method used to **read** or retrieve information from a server without modifying stored data. Opening a URL in a browser sends a `GET` request.
- **What JSON is:** **JSON** (*JavaScript Object Notation*) is a lightweight text format made of key–value pairs (like `{"message": "Welcome to Fix-My-Ride API", "status": "running"}`) that both Python backends and JavaScript/React frontends understand easily.
- **What Uvicorn does:** Uvicorn runs the FastAPI application and listens for incoming HTTP requests.
- **Why we use port `8000`:** Port `8000` is Uvicorn's standard default development port, which keeps it separate from the React + Vite frontend running on port `5173`.

### Start the Server

```bash
cd backend

source .venv/bin/activate

uvicorn app.main:app --reload
```

### Understanding the `uvicorn` Command

- **`uvicorn`:** The ASGI web server executing your Python app.
- **`app.main`:** The Python module path (`app/main.py` inside `backend/`).
- **`app`:** The FastAPI instance variable created inside `app/main.py` (`app = FastAPI(...)`).
- **`--reload`:** Watches your Python files and automatically restarts the server whenever you save code changes during development.

Once started, open `http://127.0.0.1:8000/`, `http://127.0.0.1:8000/docs` (Swagger UI), or `http://127.0.0.1:8000/redoc` in your browser.

### Stop the Server

Press `Ctrl + C` in the terminal running Uvicorn to stop the development server cleanly.

## 10. Backend Project Structure

### Directory Layout

```text
backend/
├── app/
│   ├── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes/
│   │       ├── __init__.py
│   │       └── health.py
│   ├── core/
│   │   └── __init__.py
│   ├── schemas/
│   │   └── __init__.py
│   ├── services/
│   │   └── __init__.py
│   └── main.py
├── requirements.txt
└── README.md
```

### Why Backend Applications Need Organized Folders

Keeping all endpoints, settings, validation rules, and business logic inside `main.py` quickly turns one file into thousands of lines as features grow. Organizing `app/` into focused Python packages ensures every developer knows where new backend code belongs.

### Folder Responsibilities and Differences

- **`app/api/routes/` (Routes):** Defines HTTP endpoints (URL paths and HTTP methods like `GET`, `POST`, `PUT`, `DELETE`) for resources such as customers, bookings, and technicians.
- **`app/schemas/` (Schemas):** Defines data validation and request/response structures so FastAPI checks incoming data and formats JSON responses cleanly.
- **`app/services/` (Services):** Holds business logic (workshop rules, calculations, coordinating operations) separately from HTTP route handlers.
- **`app/core/` (Core):** Holds application-wide configuration and shared backend settings (such as environment configuration and security settings).

### Why Separating Responsibilities Helps and Why They Are Empty Now

Separating routes, schemas, services, and core settings keeps each layer small, readable, and easy to test or change independently. Right now `core/`, `schemas/`, and `services/` contain only `__init__.py` markers because Fix-My-Ride is built incrementally—each layer will be populated only in the commits that introduce those features.

## 11. Health Check API

### Key Concepts

- **What an API health check is:** A lightweight endpoint (`GET /health`) that reports whether the backend API process is alive and able to respond to HTTP requests.
- **Why applications need health checks:** Developers, automated monitoring tools, and frontends can ping `/health` to confirm the server started properly without waiting on complex business pages. *(Note: At Commit 18, this is a basic application-level check—it does not test database connectivity yet.)*
- **What an `APIRouter` is:** A FastAPI mini-router (`APIRouter()`) used to group related endpoints inside separate files (like `app/api/routes/health.py`) instead of putting every route into `main.py`.
- **Why routes are separated from `main.py`:** Separating routes keeps `main.py` small and focused on wiring the app together, while each feature or utility router lives in its own clean module.
- **How `include_router()` connects a router:** Calling `app.include_router(health_router)` in `app/main.py` attaches all routes defined on `health.router` to the main FastAPI `app`.
- **What an HTTP `GET` request does:** Sends a read-only request to the server asking for status data without changing anything on the server.

### Endpoint Details

- **URL:** `GET http://127.0.0.1:8000/health`
- **Expected Response:**

```json
{
  "status": "healthy",
  "application": "Fix-My-Ride API",
  "message": "Backend is running successfully"
}
```

---

## Planned Future Technologies

The following technologies are **not installed or configured yet** and will be introduced in future commits:

- **SQLAlchemy** for Object-Relational Mapping (ORM)
- **PostgreSQL** drivers and database connections

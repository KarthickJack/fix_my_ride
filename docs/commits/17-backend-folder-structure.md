# Commit 17: Organize Backend Structure

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 17 of 20

---

## 1. Commit Objective

The objective of **Commit 17** is to organize the `backend/app/` directory into a clean, scalable Python package structure (`api/routes/`, `core/`, `schemas/`, `services/`) while keeping the existing FastAPI application in `backend/app/main.py` running exactly as before.

> **Important Note:** The new subdirectories are **structural foundations only** (containing `__init__.py` package markers). No customer, booking, or technician endpoints, schemas, services, or database configurations are implemented yet.

---

## 2. Why Backend Organization Is Necessary

Right now `backend/app/main.py` only has one root `/` endpoint, so everything fits comfortably in 17 lines. However, Fix-My-Ride will soon grow to handle customers, motorcycles, bookings, inspections, service recommendations, and invoices.

If all of that code lived inside `main.py`, the file would quickly become hard to read, debug, and maintain. Establishing clear folders early prevents messy code before feature development begins.

---

## 3. Understanding Separation of Responsibilities

**Separation of responsibilities** means giving each part of the backend one specific job:

- One layer handles **HTTP URLs and requests** (`api/routes/`).
- One layer handles **data shapes and validation** (`schemas/`).
- One layer handles **business logic** (`services/`).
- One layer handles **global configuration** (`core/`).

Just as a motorcycle service centre separates the reception desk, inspection checklist, mechanic bay, and billing ledger, separating backend layers makes each piece easier to understand and update safely.

---

## 4. Understanding the `api` Folder

**`backend/app/api/`** groups everything directly related to the HTTP API layer. As the application grows, API routers and API-level helpers live neatly under `api/` rather than crowding the root of `app/`.

---

## 5. Understanding `routes`

**`backend/app/api/routes/`** is reserved for FastAPI route definitions (endpoints).

In future commits, files like customer endpoints, booking endpoints, and technician endpoints will live here. Their job is strictly to receive HTTP requests, pass validated inputs to a service, and return an HTTP response.

*(Not implemented yet in Commit 17.)*

---

## 6. Understanding `core`

**`backend/app/core/`** is reserved for application-wide configuration and shared backend settings.

In future commits, environment variable settings, application constants, and security configuration will live here so every module reads shared settings from one central place.

*(Not implemented yet in Commit 17.)*

---

## 7. Understanding `schemas`

**`backend/app/schemas/`** is reserved for Pydantic request and response schemas—Python classes that define exactly what fields an API endpoint expects to receive and what fields it sends back as JSON.

Future examples include customer request schemas and booking response schemas.

*(Not implemented yet in Commit 17.)*

---

## 8. Understanding `services`

**`backend/app/services/`** is reserved for business logic—separated cleanly from HTTP route definitions.

Future examples include a booking service and a customer service containing the actual operations and rules, while routes stay thin and readable.

*(Not implemented yet in Commit 17.)*

---

## 9. Understanding Python Packages and `__init__.py`

In Python, placing an **`__init__.py`** file inside a directory explicitly marks that folder as a **Python package** that can be imported cleanly (for example, `from app.core import ...` or `from app.api.routes import ...`).

In addition, because Git does not track completely empty folders, adding an empty `__init__.py` file inside each new directory ensures both Python and Git recognize the package layout without needing extra `.gitkeep` files.

---

## 10. Updated Backend Directory Structure

```text
backend/
├── app/
│   ├── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes/
│   │       └── __init__.py
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

*(Local `backend/.venv/` and `__pycache__/` folders remain ignored by the root `.gitignore`.)*

---

## 11. How the Existing Application Works

`backend/app/main.py` remains unchanged:

- It still creates `app = FastAPI(title="Fix-My-Ride API", version="0.1.0", ...)`.
- It still exposes `@app.get("/")` returning `{"message": "Welcome to Fix-My-Ride API", "status": "running"}`.
- Adding `__init__.py` and empty subpackages does not alter runtime behavior at all—Uvicorn imports `app.main:app` cleanly as before.

---

## 12. How to Run and Test the Backend

From the project root:

```bash
cd backend

source .venv/bin/activate

uvicorn app.main:app --reload
```

Then verify:

1. `http://127.0.0.1:8000/` returns the root JSON welcome response.
2. `http://127.0.0.1:8000/docs` opens Swagger UI showing **Fix-My-Ride API**.
3. `find app -not -path '*__pycache__*' | sort` confirms all new package folders and `__init__.py` files exist.

---

## 13. Expected Results

- Uvicorn starts with zero import or startup errors.
- `http://127.0.0.1:8000/` returns HTTP `200 OK` with:
  ```json
  {
    "message": "Welcome to Fix-My-Ride API",
    "status": "running"
  }
  ```
- `http://127.0.0.1:8000/docs` loads Swagger UI cleanly.
- All frontend files remain completely untouched.

---

## 14. What Was Implemented

- Created `app/__init__.py`, `app/api/__init__.py`, `app/api/routes/__init__.py`, `app/core/__init__.py`, `app/schemas/__init__.py`, and `app/services/__init__.py`.
- Kept `backend/app/main.py` working without losing any functionality.
- Updated `backend/README.md` with Section 10 (*Backend Project Structure*).
- Created `docs/commits/17-backend-folder-structure.md`.

---

## 15. What Has NOT Been Implemented

To keep Commit 17 strictly focused on structural organization:

- No customer, booking, or technician API routes exist yet.
- No Pydantic schemas or service modules exist yet.
- No `core` config files, CORS middleware, or authentication exist yet.
- No SQLAlchemy models or PostgreSQL connections exist yet.

---

## 16. Git Commit Message

Suggested commit message for this step:

```text
refactor(backend): organize backend structure
```

# Fix-My-Ride Backend

This directory will contain the **Python + FastAPI** backend application for **Fix-My-Ride**, a Motorcycle Service Management System.

> **Current Status:** Phase 1 — Foundation (Commit 15).  
> The isolated Python virtual environment (`.venv`) and initial `requirements.txt` (`fastapi`, `uvicorn[standard]`) are configured. No FastAPI application (`main.py`), API routes, or database connections exist yet—those will begin in Commit 16.

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

---

## Planned Future Technologies

The following technologies are **not installed or configured yet** and will be introduced in future commits:

- **SQLAlchemy** for Object-Relational Mapping (ORM)
- **PostgreSQL** drivers and database connections

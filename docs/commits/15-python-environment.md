# Commit 15: Initialize Python Backend Environment

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 15 of 20

---

## 1. Commit Objective

The objective of **Commit 15** is to set up a clean, isolated Python development environment (`backend/.venv`) and declare the initial backend dependencies in `backend/requirements.txt`.

> **Important Note:** This commit is strictly for **environment setup and dependency management**. The FastAPI application (`main.py`), API routes, and endpoints are **not** implemented yet—those begin in **Commit 16**.

---

## 2. What We Are Building

Across Phase 1–5, the **Fix-My-Ride** backend will act as the central API server handling customers, motorcycles, bookings, inspections, invoices, and payments. Before writing our very first Python server file in Commit 16, we need a predictable Python workspace inside `backend/` where packages like FastAPI and Uvicorn can be installed safely.

---

## 3. Why Python?

**Python** is a great fit for the Fix-My-Ride backend because:

- **Easy to read and learn:** Clean syntax lets beginners focus on business logic rather than boilerplate.
- **Fast API development:** Modern frameworks like FastAPI let you build clean REST endpoints quickly.
- **Reliable data tooling:** Python integrates smoothly with SQLAlchemy and PostgreSQL in upcoming database phases.

---

## 4. What Is a Virtual Environment?

A **Python virtual environment** is a self-contained directory (named `.venv` inside `backend/`) containing its own private Python executable and its own `site-packages` folder for installed third-party libraries.

Think of it like giving Fix-My-Ride its own dedicated toolbox inside the workshop instead of sharing one messy drawer with every other project on your computer.

---

## 5. Why Do We Need an Isolated Environment?

If you install Python packages globally into your operating system:

- Project A might require FastAPI version X while Project B needs version Y, causing conflicts.
- Other developers on a team won't know which global packages your project actually relies on.
- You risk accidentally modifying system Python libraries used by your Linux OS.

Using `backend/.venv` keeps Fix-My-Ride's dependencies completely isolated—and because `.venv/` is listed in the root `.gitignore`, it stays safely on your local machine without cluttering Git.

---

## 6. Understanding `pip`

**`pip`** (*Pip Installs Packages*) is Python's built-in package manager. When your `.venv` is active, running `pip install ...` downloads libraries from PyPI (the Python Package Index) and places them inside `backend/.venv/` instead of your global system Python.

---

## 7. Understanding `requirements.txt`

**`backend/requirements.txt`** is a simple text file listing the direct Python packages the backend depends on:

```text
fastapi
uvicorn[standard]
```

Instead of sharing gigabytes of installed library files in Git, we commit only `requirements.txt`. Any teammate can run `pip install -r requirements.txt` inside their own `.venv` to install the exact packages needed.

---

## 8. Introduction to FastAPI

**FastAPI** is the Python web framework we will use (starting in Commit 16) to build Fix-My-Ride's REST API. It handles URL routing, JSON serialization, input validation, and automatically generates interactive API documentation—all with straightforward Python code.

---

## 9. Introduction to Uvicorn

FastAPI defines *how* requests should be handled, while **Uvicorn** is the lightweight ASGI web server that actually listens on a network port and runs the FastAPI application. Installing `uvicorn[standard]` adds standard extras (such as automatic file reloading during development).

---

## 10. Project Files and Their Responsibilities

- **`backend/.venv/`** *(local only, ignored by Git)* — Isolated Python 3.10+ virtual environment holding installed backend packages.
- **`backend/requirements.txt`** *(tracked in Git)* — Lists the initial direct dependencies: `fastapi` and `uvicorn[standard]`.
- **`backend/README.md`** *(tracked in Git)* — Beginner-friendly setup guide explaining Python, `.venv`, `pip`, `requirements.txt`, FastAPI, Uvicorn, and terminal commands.
- **`docs/commits/15-python-environment.md`** *(tracked in Git)* — This learning guide documenting Commit 15.

---

## 11. Setup Instructions

Run these commands in a Linux terminal from the project root:

```bash
cd backend

python3 -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

pip list

deactivate
```

> **Always activate `.venv` first** (`source .venv/bin/activate`) before installing dependencies or running Python backend commands, so nothing gets installed globally by mistake.

---

## 12. How to Verify the Environment

From the project root:

1. Check Python version (`3.10+`):
   ```bash
   python3 --version
   ```
2. Activate `.venv` and inspect installed packages:
   ```bash
   cd backend
   source .venv/bin/activate
   pip list
   deactivate
   ```
3. Confirm `.gitignore` ignores `.venv/` while tracking `requirements.txt`:
   ```bash
   git check-ignore -v backend/.venv/
   git check-ignore backend/requirements.txt
   ```

---

## 13. Expected Results

- `python3 --version` prints Python `3.10.12` (or any Python `3.10+`).
- `source .venv/bin/activate` activates the isolated environment cleanly.
- `pip install -r requirements.txt` installs `fastapi` and `uvicorn` (along with their required sub-dependencies such as `starlette`, `pydantic`, etc.) inside `backend/.venv/`.
- `pip list` shows `fastapi` and `uvicorn` installed.
- `git check-ignore -v backend/.venv/` matches `.gitignore:23:.venv/`.
- `git check-ignore backend/requirements.txt` exits with status `1` (meaning it is **not** ignored and will be tracked by Git).

---

## 14. What Was Implemented

- Created `backend/.venv` using Python `3.10.12`.
- Created `backend/requirements.txt` containing `fastapi` and `uvicorn[standard]`.
- Installed `requirements.txt` inside `backend/.venv`.
- Updated `backend/README.md` with clear explanations and Linux terminal commands.
- Created `docs/commits/15-python-environment.md`.

---

## 15. What Has NOT Been Implemented

To keep Commit 15 strictly focused on environment setup:

- **No `main.py` or FastAPI application instance exists yet.** (No backend server can be started yet.)
- **No API routes or endpoints exist yet.**
- **No SQLAlchemy, PostgreSQL drivers, Alembic, authentication, or test frameworks are installed.**
- **No frontend files were modified.**

---

## 16. Git Commit Message

Suggested commit message for this step:

```text
chore(backend): initialize python environment
```

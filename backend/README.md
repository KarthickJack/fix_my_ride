# Fix-My-Ride Backend

This directory will contain the **Python + FastAPI** backend application for **Fix-My-Ride**, a Motorcycle Service Management System.

> **Current Status:** Phase 2 — Database Foundation (Commit 30).  
> Phase 2 Customer foundation is complete end-to-end: PostgreSQL `customers` table (Alembic migration `402f1c589c46`), SQLAlchemy `Customer` model, Pydantic schemas, service layer, and Customer HTTP API endpoints (`POST /api/customers/`, `GET /api/customers/`, `GET /api/customers/{customer_id}`) are configured and verified. Authentication, authorization, update/delete endpoints, and frontend Customer UI integration remain upcoming work.

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
│   │   ├── __init__.py
│   │   └── config.py
│   ├── schemas/
│   │   └── __init__.py
│   ├── services/
│   │   └── __init__.py
│   └── main.py
├── .env.example
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

Separating routes, schemas, services, and core settings keeps each layer small, readable, and easy to test or change independently. Right now `schemas/` and `services/` contain only `__init__.py` markers because Fix-My-Ride is built incrementally—each layer will be populated only in the commits that introduce those features.

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

## 12. Environment Variables & Configuration

### Key Concepts

- **What environment variables are:** Named configuration values (like `FRONTEND_URL=http://localhost:5173`) supplied outside the Python source code so different machines or environments can use different values without editing code.
- **Why configuration should be separate from code:** Keeping URLs, database credentials, and secrets out of `.py` files prevents accidentally leaking sensitive settings and lets you change environments cleanly.
- **What `.env` does:** `backend/.env` stores local environment settings for your machine. It is ignored by `.gitignore` and **must never be committed** to Git.
- **What `.env.example` does:** `backend/.env.example` is a safe template committed to Git listing required variable names and safe placeholder/default values.
- **How Pydantic Settings reads configuration:** `backend/app/core/config.py` defines `Settings(BaseSettings)` with `SettingsConfigDict` pointing to `backend/.env` using an absolute path derived from `config.py`, loading `FRONTEND_URL` automatically regardless of which folder you start Uvicorn from.

### First-Time Environment Setup

```bash
cd backend
cp .env.example .env
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 13. CORS (Cross-Origin Resource Sharing)

### What CORS Means and What an Origin Is

**CORS** (*Cross-Origin Resource Sharing*) is a browser security mechanism controlling whether web pages running on one **origin** can read responses from a backend server on a different origin.

A browser **origin** is made of three parts:
1. **Protocol** (`http` vs `https`)
2. **Hostname** (`localhost` vs `127.0.0.1`)
3. **Port** (`5173` vs `8000`)

Because the React + Vite frontend runs at `http://localhost:5173` and the FastAPI backend runs at `http://127.0.0.1:8000`, browsers treat them as **different origins** and block frontend API calls unless the backend explicitly permits `http://localhost:5173`.

### How `CORSMiddleware` Is Configured in `app/main.py`

- **`allow_origins=[settings.FRONTEND_URL]`:** Permits requests coming from the configured frontend URL (`http://localhost:5173`).
- **`allow_methods=["*"]`:** Allows HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, etc.) for upcoming API communication.
- **`allow_headers=["*"]`:** Allows standard and custom HTTP request headers (such as `Content-Type`).
- **`allow_credentials=False`:** Keeps cookie/credential sharing disabled because authentication is not implemented yet.

## 14. PostgreSQL Database Setup

### Key Concepts

- **What PostgreSQL is:** An open-source, relational database management system (RDBMS) that stores structured application data reliably on disk.
- **Why Fix-My-Ride needs a database:** In-memory variables reset whenever the server restarts. PostgreSQL provides persistent storage for customers, motorcycles, bookings, inspections, invoices, and payments.
- **Database server vs. database:** The **PostgreSQL server** is the running background service (`postgresql.service`) managing connections and storage, while a **database** (`fix_my_ride_db`) is one isolated logical collection of schemas and tables hosted inside that server.
- **What a database user/role is:** A **role** (`fix_my_ride_user`) is an identity with login privileges and permissions used by Fix-My-Ride to authenticate against PostgreSQL.
- **What a database owner is:** Assigning `OWNER fix_my_ride_user` gives our application role full control over `fix_my_ride_db` (creating tables and reading/writing data inside it) without needing cluster-wide superuser privileges.
- **Why we created a separate application user:** Using a dedicated role instead of the `postgres` superuser limits blast radius and follows least-privilege security practice.
- **What port `5432` is:** The default TCP port where PostgreSQL listens for incoming connections on `localhost`.

### Local Setup Values

- **Host:** `localhost`
- **Port:** `5432`
- **Database:** `fix_my_ride_db`
- **Application User:** `fix_my_ride_user`

*(Never store or document the actual database password in README files or Git.)*

### Installing, Starting, and Verifying PostgreSQL on Ubuntu

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
psql --version
pg_isready
```

### Creating the Role and Database

```bash
sudo -u postgres psql
```

```sql
CREATE ROLE fix_my_ride_user WITH LOGIN;
\password fix_my_ride_user
CREATE DATABASE fix_my_ride_db OWNER fix_my_ride_user;
\q
```

### Connecting, Inspecting, and Exiting `psql`

```bash
psql -h localhost -p 5432 -U fix_my_ride_user -d fix_my_ride_db -W
```

Useful inspection commands inside the PostgreSQL shell:

```sql
SELECT current_database(), current_user;
SELECT current_schema();
SELECT version();
\dt
\l
\q
```

Use `\q` to exit the PostgreSQL shell cleanly.

## 15. Database Dependencies

`backend/requirements.txt` now includes the three database libraries needed for upcoming Phase 2 commits:

- **`SQLAlchemy>=2.0,<3.0`:** Python Object-Relational Mapper (ORM) that lets Python code define tables as classes and read/write PostgreSQL records cleanly using Python objects and expressions.
- **`psycopg[binary]>=3.2,<4.0`:** Modern PostgreSQL database driver (Psycopg 3) that handles the low-level network communication between Python/SQLAlchemy and the PostgreSQL server. The `[binary]` extra includes precompiled binaries for easy local development without needing extra system C build headers.
- **`alembic>=1.14,<2.0`:** Schema migration tool built for SQLAlchemy that tracks versioned database structure changes (like adding new tables or columns) over time.

### Why These Libraries Are Separate

Each library has a focused job: **SQLAlchemy** maps Python objects and queries, **Psycopg** speaks the PostgreSQL wire protocol, and **Alembic** tracks schema version history. Keeping them separate means clean boundaries and standard Python tooling at every layer.

### Installing and Verifying Packages

Always activate `.venv` before installing or verifying packages, and `deactivate` when done:

```bash
cd backend

source .venv/bin/activate

pip install -r requirements.txt

pip list

pip check

deactivate
```

## 16. PostgreSQL Connection (`database.py` & `config.py`)

### Key Concepts

- **Why the application needs a database connection:** FastAPI needs an active bridge to PostgreSQL so future routes can store and query customers, motorcycles, service bookings, and invoices persistently.
- **What SQLAlchemy does:** SQLAlchemy translates Python objects and expressions into SQL queries and manages connection pooling cleanly.
- **What Psycopg does:** Psycopg 3 is the PostgreSQL driver that handles the low-level TCP communication between SQLAlchemy and PostgreSQL.
- **What a SQLAlchemy `engine` is:** Created with `create_engine(DATABASE_URL, pool_pre_ping=True)` in `app/core/database.py`, the engine is the central factory managing the pool of database connections. `pool_pre_ping=True` tests idle connections before reusing them.
- **What a database session is:** A **session** is one short-lived workspace (like a single conversation/transaction with PostgreSQL) used to read or write data during a single API request.
- **What `SessionLocal` does:** Created with `sessionmaker(autocommit=False, autoflush=False, bind=engine)`, `SessionLocal` is a factory that creates new `Session` objects bound to `engine` on demand.
- **Why `get_db()` uses `yield` and `finally`:** `get_db()` opens `db = SessionLocal()`, `yield`s it to a FastAPI endpoint, and guarantees `db.close()` runs inside the `finally` block—even if an error occurs—so database connections never leak.

### Database Environment Variables (`backend/.env`)

`app/core/config.py` loads these settings (with `DB_PASSWORD` stored as a `SecretStr` so it is masked in logs):

- `DB_HOST` (default: `localhost`)
- `DB_PORT` (default: `5432`)
- `DB_NAME` (default: `fix_my_ride_db`)
- `DB_USER` (default: `fix_my_ride_user`)
- `DB_PASSWORD` (set locally inside `backend/.env`)

Copy `backend/.env.example` to `backend/.env` (or edit the existing `backend/.env`) and set your local `DB_PASSWORD` value. **Never commit `.env` or real passwords.**

### Testing the Database Connection

```bash
cd backend
source .venv/bin/activate
python -c "from sqlalchemy import text; from app.core.database import engine;
with engine.connect() as conn:
    print(conn.execute(text('SELECT 1')).scalar())"
```

Expected output when `DB_PASSWORD` is configured and PostgreSQL is running: `1`.

### Common Connection Errors and Troubleshooting

- **Password authentication failed:** Check `DB_USER` and `DB_PASSWORD` in `backend/.env` against the password set for `fix_my_ride_user`.
- **Connection refused on port `5432`:** Ensure PostgreSQL is running (`sudo systemctl status postgresql` / `pg_isready -h localhost -p 5432`).
- **Database does not exist:** Confirm `DB_NAME=fix_my_ride_db` exists and is owned by `fix_my_ride_user`.

## 17. Database Migrations with Alembic

### Key Concepts

- **What Alembic is:** The schema migration tool for SQLAlchemy that tracks and applies incremental database structure changes over time.
- **Why database migrations are necessary:** As Fix-My-Ride adds tables and columns, manual `ALTER TABLE` edits on different machines quickly fall out of sync. Versioned migration scripts make schema updates repeatable and reversible.
- **Difference between SQLAlchemy and Alembic:** SQLAlchemy defines Python ORM models (`Base`) and executes runtime queries; Alembic compares your models against the database and manages versioned schema change scripts (`alembic/versions/`).
- **What `alembic.ini` does:** Stores Alembic's general configuration (`script_location = %(here)s/alembic`, `prepend_sys_path = .`, and logging settings) without storing any database credentials.
- **What `env.py` does:** Runs whenever you execute an `alembic` CLI command; it loads `Base.metadata` (`app.db.base`) and reuses the application's `DATABASE_URL` and `engine` (`app.core.database`).
- **What `target_metadata` means:** Points Alembic to `Base.metadata` so Alembic knows which SQLAlchemy tables and columns exist in code.
- **Offline vs. online migration modes:** **Online mode** connects directly to PostgreSQL through `engine` and executes schema updates; **offline mode** generates raw SQL scripts from `DATABASE_URL` without requiring a live database connection.

### Future Migration Commands (Reference)

Once ORM models exist in upcoming commits, run Alembic from `backend/` with `.venv` active:

```bash
alembic current
alembic history
alembic revision --autogenerate -m "create initial tables"
alembic upgrade head
```

## 18. Customer Database Model

The first SQLAlchemy ORM model is defined in `backend/app/db/models/customer.py` and exposed via `backend/app/db/models/__init__.py` (imported by `alembic/env.py` so Alembic detects it on `Base.metadata`).

- **Class:** `Customer` (inheriting from `Base` in `app.db.base`)
- **Table name:** `customers` *(created in PostgreSQL via Alembic migration `402f1c589c46_create_customer_table.py`)*

### Fields

| Column | Type | Constraints / Defaults |
| :--- | :--- | :--- |
| `id` | `Integer` | Primary key, auto-increment, indexed by primary-key constraint |
| `full_name` | `String(150)` | Not nullable |
| `phone_number` | `String(20)` | Not nullable, unique (stored as text to preserve formatting/leading zeros) |
| `email` | `String(255)` | Nullable (optional), unique |
| `address` | `Text` | Nullable |
| `created_at` | `DateTime(timezone=True)` | Not nullable, `server_default=func.now()` |
| `updated_at` | `DateTime(timezone=True)` | Not nullable, `server_default=func.now()`, `onupdate=func.now()` |

## 19. Migration Workflow & Schema Verification

### Generating, Reviewing, and Applying Migrations

From `backend/` with `.venv` activated:

1. **Generate a migration** from SQLAlchemy model changes:
   ```bash
   alembic revision --autogenerate -m "create_customer_table"
   ```
2. **Review the generated file** inside `backend/alembic/versions/` (`revision`, `down_revision`, `upgrade()`, and `downgrade()`) before running it—never apply autogenerated migrations blindly.
3. **Apply migrations** to PostgreSQL:
   ```bash
   alembic upgrade head
   ```
4. **Check migration status** anytime:
   ```bash
   alembic current
   alembic heads
   alembic history
   alembic check
   ```

### Inspecting the Database Schema

You can inspect tables in PostgreSQL via `psql`:

```bash
psql -h localhost -p 5432 -U fix_my_ride_user -d fix_my_ride_db -W
```

Inside `psql`, run `\dt` to list tables (`customers`, `alembic_version`) and `\d customers` to inspect columns and constraints.

## 20. Customer Pydantic Schemas

Pydantic 2.x data validation and serialization schemas live in `backend/app/schemas/customer.py` (exported via `backend/app/schemas/__init__.py`) and rely on `email-validator` for `EmailStr` validation:

- **`CustomerBase`:** Shared fields (`full_name` max 150, `phone_number` max 20, optional `email` `EmailStr` max 255, optional `address`).
- **`CustomerCreate`:** Inherits `CustomerBase` for incoming customer creation payloads (excludes `id`, `created_at`, `updated_at`).
- **`CustomerUpdate`:** Makes all four editable fields optional using the same length constraints so partial updates (one or more fields) work without allowing `id` or timestamp changes.
- **`CustomerResponse`:** Inherits `CustomerBase`, adds `id`, `created_at`, and `updated_at`, and enables `model_config = ConfigDict(from_attributes=True)` so responses can be built directly from SQLAlchemy `Customer` ORM instances.

## 21. Customer Service Layer

Database operations for customers live in `backend/app/services/customer_service.py` (exported via `backend/app/services/__init__.py`), keeping SQLAlchemy queries separate from HTTP routes:

- **`create_customer(db, customer_data)`:** Converts `CustomerCreate` via `.model_dump()`, creates a `Customer` ORM instance, stages it with `db.add()`, commits with `db.commit()`, reloads database-generated fields (`id`, `created_at`, `updated_at`) via `db.refresh()`, and returns the `Customer` instance. On duplicate `phone_number` or `email` (`IntegrityError`), it calls `db.rollback()` so the session remains usable and raises a clear `ValueError` for the future API layer to translate.
- **`get_customer_by_id(db, customer_id)`:** Queries `select(Customer).where(Customer.id == customer_id)` and returns `Customer` or `None`.
- **`get_customer_by_phone(db, phone_number)`:** Queries `select(Customer).where(Customer.phone_number == phone_number)` and returns `Customer` or `None`.
- **`get_customers(db)`:** Queries `select(Customer).order_by(Customer.id.asc())` and returns `list[Customer]`.

Read functions never call `db.commit()`, and service functions never raise `HTTPException`.

## 22. Customer HTTP API

Customer HTTP routes live in `backend/app/api/routes/customers.py` and are registered in `backend/app/main.py` with `prefix="/api/customers"` and `tags=["Customers"]`. Each route injects a per-request SQLAlchemy `Session` using `Depends(get_db)` and delegates database work to `customer_service.py`.

> **Development-Stage Notice:** This API is for local development learning only and is **not production-ready**. Authentication, authorization, rate limiting, and production security hardening remain future work.

### Available Endpoints

| Method | Path | Success Status | Error Statuses | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/customers/` | `201 Created` | `409 Conflict`, `422 Unprocessable Entity` | Create a new customer |
| `GET` | `/api/customers/` | `200 OK` | — | List all customers ordered by ID |
| `GET` | `/api/customers/{customer_id}` | `200 OK` | `404 Not Found`, `422 Unprocessable Entity` | Retrieve one customer by ID |

### Example Request Payload (`POST /api/customers/`)

```json
{
  "full_name": "Arjun Mehta",
  "phone_number": "+919876543210",
  "email": "arjun@example.com",
  "address": "42 Workshop Lane, Bengaluru"
}
```

### Example Success Response (`201 Created` / `200 OK`)

```json
{
  "full_name": "Arjun Mehta",
  "phone_number": "+919876543210",
  "email": "arjun@example.com",
  "address": "42 Workshop Lane, Bengaluru",
  "id": 1,
  "created_at": "2026-11-27T03:30:00Z",
  "updated_at": "2026-11-27T03:30:00Z"
}
```

### Expected Error Responses

- **`409 Conflict`:** `{"detail": "A customer with this phone number already exists."}` (or email)
- **`404 Not Found`:** `{"detail": "Customer not found"}`
- **`422 Unprocessable Entity`:** FastAPI/Pydantic validation details when required fields are missing, invalid email is sent, lengths exceed limits, or `{customer_id}` is not an integer.

### Testing via Swagger UI or `curl`

1. Start Uvicorn (`uvicorn app.main:app --reload`) and open `http://127.0.0.1:8000/docs` to test endpoints interactively under the **Customers** tag.
2. Or test with `curl`:
   ```bash
   curl -i -X POST http://127.0.0.1:8000/api/customers/ \
     -H "Content-Type: application/json" \
     -d '{"full_name":"Test Rider","phone_number":"+910000009999","email":"test.rider@example.com"}'

   curl -i http://127.0.0.1:8000/api/customers/
   curl -i http://127.0.0.1:8000/api/customers/1
   ```

---

## Next Steps (Beyond Phase 2 Customer Foundation)

- Customer update/delete endpoints, pagination, and filtering
- Authentication, authorization, rate limiting, and production security hardening
- Additional domain modules (Motorcycles, Service Bookings, Inspections, Invoices) and frontend integration

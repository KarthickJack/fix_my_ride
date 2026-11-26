# Commit 23: Configure PostgreSQL Connection

**Phase:** Phase 2 — Database Foundation  
**Increment:** Commit 23

---

## 1. Commit Objective

The objective of **Commit 23** is to connect the **Fix-My-Ride** FastAPI backend to our local PostgreSQL database (`fix_my_ride_db`) using **SQLAlchemy 2.x** and **Psycopg 3**, establishing `URL.create()`, `engine`, `SessionLocal`, and `get_db()` inside `backend/app/core/database.py`.

> **Important Note:** This commit sets up the **database connection and session-management foundation only**. No SQLAlchemy models, database tables, Alembic migrations, or new API endpoints are created yet.

---

## 2. Why We Need a Database Connection

In Commit 21 we created `fix_my_ride_db`, and in Commit 22 we installed SQLAlchemy and Psycopg 3. Now Python needs a central module (`database.py`) that reads database credentials safely from `.env`, creates a reusable SQLAlchemy connection engine, and provides clean per-request database sessions.

---

## 3. How the Application Communicates with PostgreSQL

```mermaid
flowchart LR
    A["FastAPI Route (Future)"] -->|Depends on get_db| B["SessionLocal (Session)"]
    B --> C["SQLAlchemy Engine (pool_pre_ping)"]
    C --> D["Psycopg 3 Driver (postgresql+psycopg)"]
    D --> E[("PostgreSQL (fix_my_ride_db)")]
```

Notice that importing `database.py` creates the lazy `engine` object **without** opening a database connection automatically at import time—connections are opened only when your code actually executes a query or creates a session.

---

## 4. SQLAlchemy Engine Explained

Inside `backend/app/core/database.py`:

```python
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)
```

The **engine** is SQLAlchemy's core connection manager. Instead of opening and closing a brand-new TCP socket from scratch for every query, the engine maintains a pool of reusable connections.

Setting **`pool_pre_ping=True`** tells SQLAlchemy to briefly check whether an idle connection is still alive before handing it to a request, preventing stale-connection errors if PostgreSQL restarted.

---

## 5. Psycopg Explained

**Psycopg 3 (`psycopg`)** is the PostgreSQL driver used under the hood by SQLAlchemy (`postgresql+psycopg`). SQLAlchemy builds the SQL and manages sessions, while Psycopg handles the actual TCP communication with `localhost:5432`.

---

## 6. SQLAlchemy URL and Why `URL.create()` Is Used

Instead of building a connection string manually with string concatenation (like `f"postgresql+psycopg://{user}:{password}@..."`), `database.py` uses **`URL.create()`**:

```python
DATABASE_URL = URL.create(
    drivername="postgresql+psycopg",
    username=settings.DB_USER,
    password=settings.DB_PASSWORD.get_secret_value() or None,
    host=settings.DB_HOST,
    port=settings.DB_PORT,
    database=settings.DB_NAME,
)
```

**Why `URL.create()` is safer:** If your password contains special URL characters (such as `@`, `:`, `/`, `#`, or `%`), manual string concatenation breaks URL parsing. `URL.create()` escapes every part automatically and cleanly.

---

## 7. Database Sessions Explained

A **database session** is a temporary workspace representing one logical unit of work against the database (reading records, inserting rows, committing, or rolling back if an error occurs). Each incoming HTTP request should get its own isolated session and close it when finished.

---

## 8. `SessionLocal` Explained

```python
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)
```

`SessionLocal` is a **session factory**—calling `SessionLocal()` produces a new SQLAlchemy `Session` bound to our `engine`:

- **`autocommit=False`:** Changes are only saved when explicitly committed, giving safe transaction control.
- **`autoflush=False`:** Pending changes aren't flushed implicitly before every query unless needed.
- **`bind=engine`:** Connects every created session to our PostgreSQL engine.

---

## 9. `get_db()` Explained Step by Step

```python
def get_db():
    """Yield a database session per request and close it afterward."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

1. **`db = SessionLocal()`** creates a fresh database session for the request.
2. **`yield db`** hands that session to the FastAPI route (via `Depends(get_db)` in future commits) and pauses `get_db()` while the route runs.
3. **`finally: db.close()`** always runs after the route finishes—**even if an exception occurs**—returning the connection cleanly to the pool so connections never leak.

---

## 10. Environment Variables Explained

`backend/app/core/config.py` extends `Settings(BaseSettings)` with:

- `DB_HOST: str = "localhost"`
- `DB_PORT: int = 5432`
- `DB_NAME: str = "fix_my_ride_db"`
- `DB_USER: str = "fix_my_ride_user"`
- `DB_PASSWORD: SecretStr = SecretStr("")`

Using Pydantic's **`SecretStr`** masks `DB_PASSWORD` as `'**********'` whenever `settings` is printed or inspected, helping keep real passwords out of logs.

---

## 11. Files Created and Modified

- **Created:** `backend/app/core/database.py` — Defines `DATABASE_URL` (`URL.create`), `engine`, `SessionLocal`, and `get_db()`.
- **Modified:** `backend/app/core/config.py` — Added `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` (`SecretStr`).
- **Modified:** `backend/.env.example` — Added safe template database variables with a placeholder password (`your_database_password_here`).
- **Modified (local only, Git-ignored):** `backend/.env` — Safely appended missing database keys while preserving `FRONTEND_URL`.
- **Modified:** `backend/README.md` — Added Section 16 (*PostgreSQL Connection*) and updated status.
- **Created:** `docs/commits/23-postgresql-connection.md` — This learning guide documenting Commit 23.

---

## 12. Implementation Walkthrough

1. Inspected `config.py`, `.env.example`, `.env` key names, `requirements.txt`, and Git status from Commit 22.
2. Added database settings (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD: SecretStr`) to `app/core/config.py`.
3. Updated `backend/.env.example` and appended missing database keys to local `backend/.env` without overwriting `FRONTEND_URL`.
4. Created `app/core/database.py` with `URL.create()`, `create_engine(..., pool_pre_ping=True)`, `SessionLocal`, and `get_db()`.
5. Verified syntax, FastAPI startup, non-connecting lazy import, and ran the explicit `SELECT 1` connection check.

---

## 13. How to Configure `.env`

In `backend/.env` (copied from `backend/.env.example`):

```env
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=fix_my_ride_db
DB_USER=fix_my_ride_user
DB_PASSWORD=your_actual_local_password
```

Replace `your_actual_local_password` with the password you set for `fix_my_ride_user` in Commit 21. Never commit `.env` to Git.

---

## 14. How to Run the Connection Test

```bash
cd backend
source .venv/bin/activate
python -c "from sqlalchemy import text; from app.core.database import engine;
with engine.connect() as conn:
    print(conn.execute(text('SELECT 1')).scalar())"
```

---

## 15. Expected Successful Result

When `DB_PASSWORD` in `backend/.env` matches `fix_my_ride_user` and PostgreSQL is running, the command prints:

```text
1
```

---

## 16. Common Errors and Troubleshooting

- **`password authentication failed for user "fix_my_ride_user"`:** `DB_PASSWORD` in `backend/.env` is empty or does not match the PostgreSQL role password. Update `DB_PASSWORD` in `backend/.env` and re-test.
- **`connection to server at "localhost" (127.0.0.1), port 5432 failed: Connection refused`:** PostgreSQL is stopped; run `sudo systemctl start postgresql` and verify with `pg_isready`.
- **`database "fix_my_ride_db" does not exist`:** Verify `DB_NAME=fix_my_ride_db` matches Commit 21.

---

## 17. What Was Implemented

- Database configuration fields (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` as `SecretStr`) in `app/core/config.py`.
- Updated `backend/.env.example` and preserved local `backend/.env`.
- Created `app/core/database.py` with `URL.create()`, `engine`, `SessionLocal`, and `get_db()`.
- Documented database connection concepts and troubleshooting in `backend/README.md` and `docs/commits/23-postgresql-connection.md`.

---

## 18. What Was Deliberately Not Implemented

- No SQLAlchemy models or database tables.
- No Alembic initialization or migrations.
- No customer or booking API endpoints.
- No changes to the existing `/` or `/health` endpoints, frontend files, or application startup connection attempts.

---

## 19. How This Commit Prepares Us for the Next Step

With `engine`, `SessionLocal`, and `get_db()` ready in `app/core/database.py`, upcoming Phase 2 commits can immediately define SQLAlchemy `Base` models, initialize Alembic migrations, and inject database sessions cleanly into FastAPI routes.

---

## 20. Suggested Git Commit Message

```text
feat(backend): configure postgresql connection
```

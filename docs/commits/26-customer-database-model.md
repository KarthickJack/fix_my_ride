# Commit 26: Create Customer Database Model

**Phase:** Phase 2 — Database Foundation  
**Increment:** Commit 26

---

## 1. Commit Objective

The objective of **Commit 26** is to define Fix-My-Ride's very first SQLAlchemy ORM business model—**`Customer`**—inside `backend/app/db/models/customer.py`, expose it via `backend/app/db/models/__init__.py`, and register the `models` package in `backend/alembic/env.py`.

> **Important Note:** This commit defines the `Customer` model in **Python and SQLAlchemy metadata only**. The actual `customers` table does **not** exist in PostgreSQL yet—no Alembic migration has been generated or applied (that happens in Commit 27).

---

## 2. What a Database Model Is

A **database model** is a Python class that acts as the blueprint for one database table. It specifies the table's name, every column's data type, and rules like required fields (`nullable=False`), uniqueness (`unique=True`), and primary keys.

---

## 3. What the `Customer` Model Represents

In Fix-My-Ride, **`Customer`** represents a motorcycle owner who brings vehicles to the service centre for maintenance or repairs. Every future booking, motorcycle record, and invoice will belong to a customer.

---

## 4. Difference Between a Python Class and a PostgreSQL Table

- **Python class (`Customer`):** Lives in `backend/app/db/models/customer.py`. Python uses it to construct objects in memory and describe schema metadata.
- **PostgreSQL table (`customers`):** Lives inside the `fix_my_ride_db` database on disk. It is only created when a migration runs `CREATE TABLE customers (...)`.

---

## 5. How SQLAlchemy Maps Python Classes to Database Tables

Because `Customer` inherits from `Base` (`class Customer(Base):`) and sets `__tablename__ = "customers"`, SQLAlchemy maps:

- `Customer` → the `customers` table
- Each `mapped_column(...)` attribute → a column in `customers`
- Each `Customer(...)` instance → a row in `customers`

---

## 6. Why We Inherit from the Shared `Base`

Inheriting from `Base` (`from app.db.base import Base`) automatically registers `customers` inside the single shared **`Base.metadata`** catalog. That lets SQLAlchemy validate relationships later and lets Alembic detect `customers` when scanning `target_metadata`.

---

## 7. What `Mapped` Means

In SQLAlchemy 2.x, **`Mapped[...]`** is a Python type annotation describing the Python type a column attribute holds:

- `Mapped[int]` → always an integer (`id`).
- `Mapped[str]` → always a non-null string (`full_name`, `phone_number`).
- `Mapped[Optional[str]]` → either a string or `None` (`email`, `address`).
- `Mapped[datetime]` → a Python `datetime` object (`created_at`, `updated_at`).

---

## 8. What `mapped_column` Does

**`mapped_column(...)`** defines the exact SQL column configuration alongside each `Mapped` type—specifying SQL types (`Integer`, `String(150)`, `Text`, `DateTime(timezone=True)`), constraints (`primary_key=True`, `nullable=False`, `unique=True`), and defaults (`server_default=func.now()`).

---

## 9. Explanation of Every `Customer` Column

| Field | SQLAlchemy Type | Configuration | Purpose |
| :--- | :--- | :--- | :--- |
| `id` | `Integer` | `primary_key=True` | Unique auto-incrementing row identifier (indexed by PK constraint). |
| `full_name` | `String(150)` | `nullable=False` | Customer's full name (required). |
| `phone_number` | `String(20)` | `nullable=False, unique=True` | Primary contact number (required and unique). |
| `email` | `String(255)` | `nullable=True, unique=True` | Optional email address (must be unique if provided). |
| `address` | `Text` | `nullable=True` | Optional multi-line street address. |
| `created_at` | `DateTime(timezone=True)` | `nullable=False, server_default=func.now()` | Timestamp when the record was created. |
| `updated_at` | `DateTime(timezone=True)` | `nullable=False, server_default=func.now(), onupdate=func.now()` | Timestamp refreshed when the row is updated. |

---

## 10. Primary Keys Explained

A **primary key (`primary_key=True`)** uniquely identifies every single row in a table. Two customers can never share the same `id`, PostgreSQL automatically creates a fast primary-key index on `id`, and PostgreSQL auto-increments `id` (`1`, `2`, `3`, ...) when new customers are inserted.

---

## 11. Unique Constraints Explained

A **unique constraint (`unique=True`)** prevents duplicate values in a column across different rows:

- `phone_number` is unique so the same phone number cannot accidentally create duplicate customer profiles.
- `email` is unique so two customers cannot register the same email address (while multiple `NULL` values remain allowed in PostgreSQL because email is optional).

---

## 12. Nullable vs. Non-Nullable Columns

- **Non-nullable (`nullable=False`):** The database refuses to save a row unless this field has a value (e.g., `full_name`, `phone_number`, `created_at`, `updated_at`).
- **Nullable (`nullable=True`):** The column may remain empty (`NULL` in SQL / `None` in Python), such as `email` and `address`.

---

## 13. Why Phone Numbers Are Strings

Phone numbers must always be stored as **`String`**, never `Integer`:

- Integers drop leading zeros (turning `"0987654321"` into `987654321`).
- Strings preserve country codes (`+91`), spaces, or hyphens cleanly.
- You never perform math (addition or multiplication) on a phone number.

---

## 14. Why Email Is Optional

In a real motorcycle service centre, walk-in customers always have a name and phone number for service updates, while some customers may not provide an email address. Making `email` nullable avoids blocking receptionists from registering a customer.

---

## 15. Why Passwords Are Excluded

The `Customer` model represents **workshop customer profile records**, not authentication accounts. Keeping passwords and auth credentials out of `Customer` separates business records cleanly from future authentication design.

---

## 16. Timestamp Fields Explained

- **`created_at`:** Records the exact date and time (with timezone via `DateTime(timezone=True)`) when the customer row was first created.
- **`updated_at`:** Records when the customer row was last modified, initialized on creation and updated via `onupdate=func.now()` whenever SQLAlchemy updates the row.

---

## 17. Database-Side Defaults Explained

Using **`server_default=func.now()`** tells **PostgreSQL itself** (`DEFAULT now()`) to generate the timestamp at insert time rather than relying on the Python client clock. Even if multiple backend instances run simultaneously, the database keeps timestamps consistent.

---

## 18. How Alembic Discovers Models Through `Base.metadata`

Python only executes a module's `class Customer(Base):` definition—and registers `"customers"` inside `Base.metadata.tables`—when that module is **imported**.

To guarantee Alembic always sees `Customer`:

1. `backend/app/db/models/__init__.py` imports `Customer` from `app.db.models.customer`.
2. `backend/alembic/env.py` executes `import app.db.models` before using `target_metadata = Base.metadata`.

Without importing `app.db.models`, Alembic's `target_metadata` would remain empty!

---

## 19. Files Created and Modified

- **Created:** `backend/app/db/models/__init__.py` — Exposes `Customer` cleanly.
- **Created:** `backend/app/db/models/customer.py` — Defines the `Customer(Base)` SQLAlchemy 2.x model for `customers`.
- **Modified:** `backend/alembic/env.py` — Imports `app.db.models` so Alembic discovers `Customer` on `Base.metadata`.
- **Modified:** `backend/README.md` — Added Section 18 (*Customer Database Model*) and updated status.
- **Created:** `docs/commits/26-customer-database-model.md` — This learning guide documenting Commit 26.

---

## 20. Code Walkthrough

1. `customer.py` imports `Base` from `app.db.base`, `Mapped`/`mapped_column` from `sqlalchemy.orm`, and column types/`func` from `sqlalchemy`.
2. `Customer` declares `__tablename__ = "customers"` and the seven typed columns (`id`, `full_name`, `phone_number`, `email`, `address`, `created_at`, `updated_at`).
3. `models/__init__.py` exports `Customer` via `__all__ = ["Customer"]`.
4. `alembic/env.py` imports `app.db.models` alongside `Base` so `target_metadata.tables` includes `"customers"`.

---

## 21. How to Verify the Model

Run a Python metadata check (without creating tables in PostgreSQL):

```bash
cd backend
source .venv/bin/activate
python -c "
from sqlalchemy.orm import DeclarativeBase
from app.db.base import Base
from app.db.models import Customer
from app.core.database import engine
from app.main import app

print('Inherits Base:', issubclass(Customer, Base))
print('Tables:', list(Base.metadata.tables.keys()))
table = Base.metadata.tables['customers']
for col in table.columns:
    print(col.name, col.type, 'nullable=', col.nullable, 'pk=', col.primary_key, 'unique=', col.unique)
"
```

Also verify FastAPI still starts and serves `GET /health`.

---

## 22. Expected Verification Results

- `from app.db.models import Customer` succeeds with zero import errors.
- `issubclass(Customer, Base)` is `True`.
- `Base.metadata.tables` contains `'customers'`.
- All 7 columns (`id`, `full_name`, `phone_number`, `email`, `address`, `created_at`, `updated_at`) match their expected types, nullability, primary key, unique constraints, and `server_default` / `onupdate` settings.
- Alembic's `target_metadata` includes `'customers'`.
- FastAPI starts cleanly and `GET /health` returns HTTP `200`.

---

## 23. What Was Implemented

- Created `backend/app/db/models/customer.py` and `backend/app/db/models/__init__.py`.
- Connected `app.db.models` in `backend/alembic/env.py` for Alembic discovery.
- Verified imports, inheritance, table metadata, Alembic `target_metadata`, and FastAPI `/health`.
- Documented the `Customer` model in `backend/README.md` and `docs/commits/26-customer-database-model.md`.

---

## 24. What Was Deliberately Not Implemented

- **No Alembic migration revision** was generated (`alembic/versions/` remains empty).
- **No `customers` table exists in PostgreSQL yet** (`alembic upgrade` and `create_all` were not run).
- **No Customer API routes, Pydantic schemas, or services** were created.
- **No relationships, passwords, or other models** (Motorcycle, Booking, Service) were added.

---

## 25. How This Prepares Us for Commit 27

With `Customer` registered on `Base.metadata` and imported in `alembic/env.py`, Commit 27 can generate our first real Alembic migration (`alembic revision --autogenerate`) and apply it (`alembic upgrade head`) to create the `customers` table in PostgreSQL.

---

## 26. Suggested Git Commit Message

```text
feat(database): create customer model
```

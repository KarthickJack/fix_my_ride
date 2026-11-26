# Commit 28: Create Customer Schemas

**Phase:** Phase 2 — Database Foundation  
**Increment:** Commit 28

---

## 1. Commit Objective

The objective of **Commit 28** is to create Fix-My-Ride's **Pydantic 2.x** schemas for Customer input validation and API response formatting inside `backend/app/schemas/customer.py`, and install the `email-validator` package needed by `EmailStr`.

> **Important Note:** This commit defines **data contracts only**. No Customer service functions, FastAPI endpoints, or database inserts are implemented yet.

---

## 2. What Pydantic Is

**Pydantic** is a Python data validation library used directly by FastAPI. You define expected field names, Python types, and constraints on a class inheriting from `BaseModel`, and Pydantic automatically checks incoming data, converts compatible types, and reports clear validation errors when data is invalid.

---

## 3. What a Schema Means in API Development

In API development, a **schema** is a contract describing the exact shape of JSON data entering or leaving an API—what fields are required, what fields are optional, maximum string lengths, and which database-managed fields clients are **not** allowed to supply.

---

## 4. SQLAlchemy Model vs. Pydantic Schema

| Aspect | SQLAlchemy Model (`app/db/models/customer.py`) | Pydantic Schema (`app/schemas/customer.py`) |
| :--- | :--- | :--- |
| **Purpose** | Defines the PostgreSQL `customers` table structure. | Validates API request JSON and formats API response JSON. |
| **Base Class** | `DeclarativeBase` (`Base`) | `pydantic.BaseModel` |
| **Usage** | Reading/writing rows inside PostgreSQL via `Session`. | Validating incoming payloads and serializing outgoing responses. |

---

## 5. Why API Validation Is Needed

Never trust raw client input directly against your database:

- Validation catches missing required fields (`full_name`, `phone_number`), malformed emails, or oversized strings before reaching PostgreSQL.
- Separate create/update/response schemas prevent clients from spoofing `id`, `created_at`, or `updated_at`.

---

## 6. `CustomerBase` Explained

`CustomerBase` holds the four fields shared across customer operations:

- `full_name: str = Field(..., max_length=150)`
- `phone_number: str = Field(..., max_length=20)`
- `email: Optional[EmailStr] = Field(default=None, max_length=255)`
- `address: Optional[str] = None`

By defining length constants (`FULL_NAME_MAX_LENGTH = 150`, `PHONE_NUMBER_MAX_LENGTH = 20`, `EMAIL_MAX_LENGTH = 255`), `CustomerBase` and `CustomerUpdate` share the exact same limits without duplicating magic numbers.

---

## 7. `CustomerCreate` Explained

`CustomerCreate(CustomerBase)` inherits directly from `CustomerBase`. Because it adds no database-generated fields (`id`, `created_at`, `updated_at`), incoming creation payloads only supply `full_name`, `phone_number`, and optional `email` / `address`.

---

## 8. `CustomerUpdate` Explained

`CustomerUpdate(BaseModel)` represents **partial updates** (such as updating only a customer's phone number or address). All four editable fields default to `None` while keeping the same `max_length` and `EmailStr` constraints, and `id`, `created_at`, and `updated_at` are omitted so clients cannot alter them.

---

## 9. `CustomerResponse` Explained

`CustomerResponse(CustomerBase)` inherits the four customer fields and adds:

- `id: int`
- `created_at: datetime`
- `updated_at: datetime`
- `model_config = ConfigDict(from_attributes=True)`

This defines the clean JSON shape FastAPI will return once customer endpoints are added, without ever exposing internal database secrets.

---

## 10. Required vs. Optional Fields

- In **`CustomerCreate`**: `full_name` and `phone_number` use `Field(..., ...)` (`...` means *required*), while `email` and `address` default to `None` (*optional*).
- In **`CustomerUpdate`**: Every field defaults to `None`, so sending just `{"phone_number": "+919876543210"}`—or even `{}`—is valid.

---

## 11. Email Validation Explained

Pydantic's **`EmailStr`** verifies that any non-`None` email string follows valid email formatting (like `rider@example.com`) and rejects invalid strings (like `not-an-email`). Installing **`email-validator`** inside `backend/.venv` provides this check cleanly.

---

## 12. Pydantic `Field` Constraints Explained

`Field(...)` attaches metadata and validation constraints to a schema field—for example, `max_length=150` matches `String(150)` on the `Customer` database model so invalid lengths fail at the API boundary before hitting PostgreSQL.

---

## 13. `ConfigDict` Explained

In **Pydantic 2.x**, **`ConfigDict`** replaces Pydantic 1.x's inner `class Config:` syntax to configure model behavior cleanly as a typed dictionary assigned to `model_config`.

---

## 14. `from_attributes` Explained

Setting **`model_config = ConfigDict(from_attributes=True)`** allows `CustomerResponse.model_validate(customer_orm_obj)` to read values from Python object **attributes** (such as `customer.id`, `customer.full_name`) instead of requiring a Python `dict`. That bridges SQLAlchemy ORM objects directly to Pydantic response schemas.

---

## 15. Why Database-Generated Fields Are Excluded from Create Requests

`id` (auto-increment primary key) and `created_at` / `updated_at` (`server_default=func.now()`) are controlled by PostgreSQL and SQLAlchemy. Excluding them from `CustomerCreate` prevents callers from choosing fake IDs or forged timestamps.

---

## 16. Why Clients Cannot Update `id` or Timestamps

Leaving `id`, `created_at`, and `updated_at` out of `CustomerUpdate` guarantees primary keys never change and audit timestamps remain trustworthy.

---

## 17. Files Created and Modified

- **Created:** `backend/app/schemas/customer.py` — Defines `CustomerBase`, `CustomerCreate`, `CustomerUpdate`, and `CustomerResponse`.
- **Modified:** `backend/app/schemas/__init__.py` — Exports all four Customer schemas cleanly.
- **Modified:** `backend/requirements.txt` — Added `email-validator` (installed inside `backend/.venv`).
- **Modified:** `backend/README.md` — Added Section 20 (*Customer Pydantic Schemas*) and updated status.
- **Created:** `docs/commits/28-customer-schemas.md` — This learning guide documenting Commit 28.

---

## 18. Code Walkthrough

1. `customer.py` defines shared max-length constants matching the `Customer` SQLAlchemy column widths.
2. `CustomerBase` declares the shared fields; `CustomerCreate` and `CustomerResponse` inherit from `CustomerBase` to avoid duplicating fields.
3. `CustomerUpdate` declares all four editable fields as `Optional[...]` with `default=None` and the same `max_length` constraints.
4. `schemas/__init__.py` re-exports the four schemas cleanly with no circular imports.

---

## 19. How to Verify Each Schema

Verify all schemas directly in Python without creating endpoints or touching PostgreSQL:

- Import `CustomerBase`, `CustomerCreate`, `CustomerUpdate`, `CustomerResponse` from `app.schemas`.
- Validate valid and invalid `CustomerCreate` payloads (`ValidationError` on missing `full_name`, missing `phone_number`, invalid email, oversized `full_name` > 150, oversized `phone_number` > 20).
- Validate single-field and empty `CustomerUpdate` payloads.
- Validate an in-memory object with `CustomerResponse.model_validate(obj)`.

---

## 20. Example Valid and Invalid Payloads

> *(Illustrative JSON examples only—no Customer API endpoints exist yet in Commit 28.)*

**Valid `CustomerCreate` JSON example:**

```json
{
  "full_name": "Arjun Mehta",
  "phone_number": "+919876543210",
  "email": "arjun@example.com",
  "address": "42 Workshop Lane, Bengaluru"
}
```

**Invalid `CustomerCreate` JSON example (missing `phone_number` and invalid `email`):**

```json
{
  "full_name": "Arjun Mehta",
  "email": "not-an-email"
}
```

**Example `CustomerResponse` JSON output:**

```json
{
  "id": 1,
  "full_name": "Arjun Mehta",
  "phone_number": "+919876543210",
  "email": "arjun@example.com",
  "address": "42 Workshop Lane, Bengaluru",
  "created_at": "2026-11-27T03:00:00Z",
  "updated_at": "2026-11-27T03:00:00Z"
}
```

---

## 21. Expected Verification Results

- `CustomerCreate` accepts valid input and raises `pydantic.ValidationError` for missing required fields, bad emails, or exceeding `max_length`.
- `CustomerUpdate` accepts single-field updates (`full_name`, `phone_number`, `email`, or `address`) as well as `{}`.
- `CustomerResponse.model_validate(in_memory_obj)` produces a valid `CustomerResponse` from an in-memory object.
- FastAPI continues running and `GET /health` returns HTTP `200`.

---

## 22. What Was Implemented

- Added `email-validator` to `backend/requirements.txt` and installed it in `backend/.venv`.
- Created `CustomerBase`, `CustomerCreate`, `CustomerUpdate`, and `CustomerResponse` in `backend/app/schemas/customer.py`.
- Exported schemas in `backend/app/schemas/__init__.py`.
- Verified all validation cases, ORM attribute reading, and FastAPI `/health`.
- Updated `backend/README.md` and created `docs/commits/28-customer-schemas.md`.

---

## 23. What Was Deliberately Not Implemented

- No Customer service functions (`app/services/`).
- No Customer API endpoints (`app/api/routes/`).
- No customer records inserted into PostgreSQL and no changes to `Customer` ORM model or migrations.
- No authentication, other entity schemas, or frontend changes.

---

## 24. How This Prepares Us for Commit 29

With the `customers` PostgreSQL table (`Commit 27`) and Pydantic Customer schemas (`Commit 28`) complete, Commit 29 can build Customer service functions and FastAPI CRUD endpoints cleanly using `CustomerCreate`, `CustomerUpdate`, `CustomerResponse`, `Customer`, and `get_db`.

---

## 25. Suggested Git Commit Message

```text
feat(backend): create customer schemas
```

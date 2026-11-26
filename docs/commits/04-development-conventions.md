# Commit 04: Establish Development Conventions

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 04 of 20

---

## 1. Objective

The objective of **Commit 04** is to establish clear, shared development conventions for **Fix-My-Ride** before any application code is written.

### Why Consistent Development Conventions Matter

Imagine several mechanics working in the same motorcycle workshop. If one mechanic stores metric wrenches in the top drawer, another puts them in a bucket, and a third labels folders in a different language, everyone wastes time searching and fixing avoidable mistakes.

Software works the exact same way. When every developer follows the same naming rules, folder layout, coding habits, documentation format, and Git commit style:

- **Anyone can read the code quickly:** You can tell what a file, function, or variable does just by looking at its name and where it lives.
- **Fewer bugs and merge conflicts:** Shared patterns prevent misunderstandings between teammates and between the frontend and backend.
- **Easier onboarding:** New contributors (or your future self months later) immediately understand how the project is organized.
- **Smooth growth:** As Fix-My-Ride grows from a small foundation into bookings, inspections, and invoicing, the codebase stays clean instead of turning messy.

> **Current Implementation Status:** This is a **documentation-only** commit. None of the future source folders, React components, FastAPI endpoints, or automated formatting tools exist yet—this guide sets the rules we will follow when we build them.

---

## 2. General Development Principles

Every contributor to Fix-My-Ride should follow these seven foundational habits:

1. **Keep code simple and readable:**  
   Write code for humans first, computers second. Clear, straightforward logic is always better than clever one-liners that take five minutes to decode.
2. **Use meaningful variable and function names:**  
   Names should explain *what* a value holds or *what* a function does (for example, `customerPhone` or `calculateInvoiceTotal()` instead of `x` or `doThing()`).
3. **Avoid unnecessary code duplication:**  
   If you copy and paste the same logic in multiple places, updating it later becomes error-prone. Put shared logic in one reusable helper function or component.
4. **Keep responsibilities separated:**  
   Do not mix screen layout, HTTP requests, business rules, and database queries into a single giant file. Each piece should have one clear job.
5. **Write small, understandable functions:**  
   A function that does one focused task (for example, validating a booking date) is much easier to read, test, and fix than a 200-line function that does everything at once.
6. **Do not introduce unnecessary abstractions:**  
   Only create wrapper classes, helper layers, or generic patterns when you actually need them right now—never over-engineer simple code.
7. **Test changes before committing:**  
   Always run and verify your changes locally before creating a Git commit so broken code never enters the shared history.

---

## 3. Frontend Naming Conventions

On the frontend (**React, Vite, JavaScript, Material UI, Axios, and CSS**), we use consistent casing styles so you can recognize what an item is at a glance.

### React Components — `PascalCase`

React component files and component names use **PascalCase** (every word starts with a capital letter, no spaces or underscores).

- **Examples:** `StudentList.jsx`, `BookingList.jsx`, `MotorcycleCard.jsx`, `CustomerForm.jsx`
- **Why:** React treats capitalized names as custom components and lowercase names as built-in HTML tags (like `<div>` or `<button>`).

### JavaScript Variables and Functions — `camelCase`

Regular variables, object properties, and functions use **camelCase** (first word lowercase, every following word capitalized).

- **Examples:** `getStudentDetails()`, `getCustomerBookings()`, `selectedMotorcycle`, `isApprovalPending`
- **Why:** This is the standard JavaScript convention, making variables and functions visually distinct from React components.

### Constants — `UPPER_SNAKE_CASE`

Fixed configuration values that never change while the app runs use **UPPER_SNAKE_CASE** (all capitals with underscores between words).

- **Examples:** `API_BASE_URL`, `DEFAULT_PAGE_SIZE`, `MAX_BOOKING_NOTES_LENGTH`
- **Why:** All-caps immediately signals "this is a fixed setting, do not reassign it."

### CSS Classes — `kebab-case`

CSS class names use **kebab-case** (all lowercase words separated by hyphens).

- **Examples:** `student-list-container`, `booking-card-header`, `invoice-summary-row`
- **Why:** Hyphens are standard across HTML and CSS and keep stylesheet selectors easy to read.

### Frontend Folders — `lowercase`

Folder names use simple **lowercase** names (plural when holding multiple items of that kind).

- **Examples:** `components/`, `pages/`, `layouts/`, `services/`, `styles/`, `assets/`
- **Why:** Lowercase folder names avoid case-sensitivity bugs across Linux, macOS, and Windows filesystems.

---

## 4. Backend Naming Conventions

On the backend (**Python, FastAPI, SQLAlchemy, and PostgreSQL**), we follow Python's standard style conventions (PEP 8) so backend code looks uniform and predictable.

### Python Files — `snake_case`

Python module filenames use **snake_case** (all lowercase words separated by underscores).

- **Examples:** `student_service.py`, `customer_service.py`, `motorcycle_routes.py`, `booking_schema.py`
- **Why:** Python imports filenames directly as module names, and underscores work cleanly in `import` statements.

### Python Functions and Variables — `snake_case`

Functions, methods, and local variables also use **snake_case**.

- **Examples:** `get_student_details()`, `create_service_booking()`, `motorcycle_id`, `assigned_technician`
- **Why:** Matching Python's official style keeps functions and variables clearly separate from class names.

### Python Classes — `PascalCase`

Classes (such as service classes, SQLAlchemy models, and Pydantic schemas) use **PascalCase**.

- **Examples:** `StudentService`, `CustomerService`, `Motorcycle`, `BookingCreateSchema`
- **Why:** Capitalized names make it obvious when you are referencing a class blueprint rather than a regular function or variable.

### Constants — `UPPER_SNAKE_CASE`

Fixed module-level constants and configuration keys use **UPPER_SNAKE_CASE**.

- **Examples:** `DATABASE_URL`, `APP_TITLE`, `DEFAULT_SERVICE_STATUS`
- **Why:** Visually marks settings and constants so developers do not accidentally overwrite them.

---

## 5. Folder Responsibilities

> **Important Note:** All directories listed in this section represent **planned** future directory responsibilities. They **do not** exist in the repository right now—currently only the root `README.md`, `.gitignore`, `frontend/README.md`, `backend/README.md`, and `docs/commits/` exist.

### Planned Frontend Directories (inside future `frontend/src/`)

| Planned Directory | Intended Responsibility | Fix-My-Ride Example |
| :--- | :--- | :--- |
| `components/` | Reusable UI building blocks shared across multiple screens. | `MotorcycleCard.jsx`, `StatusBadge.jsx` |
| `layouts/` | Page shells and shared structural wrappers (header, sidebar, navigation frame). | `DashboardLayout.jsx` |
| `pages/` | Full screen views tied to specific routes or workflows. | `CustomerBookingsPage.jsx`, `InvoicePage.jsx` |
| `services/` | Axios API functions that communicate with the FastAPI backend. | `customerService.js`, `bookingService.js` |
| `styles/` | Shared or custom CSS files for layout and theme adjustments. | `global.css`, `booking.css` |
| `assets/` | Static media files such as logos, icons, and workshop images. | `fix-my-ride-logo.png` |

### Planned Backend Directories (inside future `backend/app/`)

| Planned Directory | Intended Responsibility | Fix-My-Ride Example |
| :--- | :--- | :--- |
| `api/routes/` | FastAPI route definitions that receive HTTP requests and return responses. | `customer_routes.py`, `booking_routes.py` |
| `core/` | Application-wide setup such as environment configuration, database engine setup, and shared constants. | `config.py`, `database.py` |
| `schemas/` | Request and response data shapes (validation rules defining what fields are expected and returned). | `customer_schema.py`, `booking_schema.py` |
| `services/` | Business logic and database operations kept separate from HTTP route handlers. | `customer_service.py`, `booking_service.py` |

---

## 6. Code Organization Principles

Clean folder placement only works when files follow clear boundaries inside the code too. Here are the core organization rules (illustrated with conceptual examples, **not** existing files):

1. **One component should have a clear responsibility:**  
   A `BookingStatusBadge` component should only display a status label (like *Pending* or *Completed*). It should not fetch customers, calculate prices, and render an entire navigation bar at the same time.
2. **Reusable UI elements belong in `components/`:**  
   If both the Receptionist screen and the Customer screen need a motorcycle summary card, build `MotorcycleCard.jsx` once in `components/` and reuse it in both places.
3. **Page-level content belongs in `pages/`:**  
   A page like `CustomersPage.jsx` coordinates the full view—combining a layout, a search bar, a customer list component, and user actions—rather than cramming every button's markup into one giant app file.
4. **HTTP communication should be separated from UI components:**  
   React components should not contain raw Axios URLs and headers everywhere. Instead, put API calls in `services/` (e.g., `getCustomers()` inside `customerService.js`) and let components simply call that function.
5. **API route definitions should be separated from business operations:**  
   In FastAPI, a route function in `api/routes/` should focus on accepting the HTTP request and sending back the HTTP response. The actual work (checking rules, querying PostgreSQL via SQLAlchemy) belongs in `services/` (e.g., `customer_service.py`).
6. **Request and response validation should be handled through appropriate schemas:**  
   Instead of manually checking dictionary keys like `if "phone" not in data`, define structured schemas in `schemas/` so FastAPI automatically checks incoming fields and formats outgoing JSON cleanly.

---

## 7. API Naming Conventions

> **Note:** These are **naming conventions only** for future phases—no FastAPI routes or endpoints are implemented yet.

Fix-My-Ride will follow **REST-style** (Representational State Transfer) API naming conventions:

- **Use plural nouns for resources, not verbs:** URLs describe *things* (`/customers`, `/motorcycles`, `/bookings`, `/invoices`), not actions (`/getAllCustomers`, `/createBooking`).
- **Use HTTP methods to express the action:**
  - **`GET`** — Read/retrieve data (does not change data on the server).
  - **`POST`** — Create a new record.
  - **`PUT`** — Update an existing record.
  - **`DELETE`** — Remove a record.

### Standard Resource URL Examples

| HTTP Method | URL Path | Meaning in Fix-My-Ride |
| :--- | :--- | :--- |
| `GET` | `/customers` | Get a list of customers. |
| `GET` | `/customers/{customer_id}` | Get details for one specific customer by ID. |
| `POST` | `/customers` | Register a new customer. |
| `PUT` | `/customers/{customer_id}` | Update an existing customer's information. |
| `DELETE` | `/customers/{customer_id}` | Remove a customer record. |

The same pattern applies naturally to other resources in Fix-My-Ride (such as `/motorcycles`, `/bookings`, and `/invoices`).

---

## 8. CSS Conventions

Even though we plan to use **Material UI (MUI)** for standard interface building blocks, clear CSS habits prevent styling chaos:

1. **Use separate CSS files where appropriate:** Keep styles in `.css` files rather than crowding `.jsx` files with long style blocks.
2. **Use meaningful class names:** Name classes after what they represent (e.g., `.inspection-notes-box`), not what color they happen to be today (e.g., avoid `.blue-box`).
3. **Avoid unnecessary inline styles:** Putting `style={{ marginTop: '12px', color: 'gray' }}` on dozens of elements makes themes hard to update consistently.
4. **Keep styles organized by component or page:** Pair custom styles cleanly with the component or page they belong to (or in the planned `styles/` folder for shared styles).
5. **Use MUI components for standard UI elements where appropriate:** Use Material UI for buttons, inputs, dialogs, tables, and grids instead of rebuilding common controls from scratch.
6. **Use CSS for project-specific customization:** Reserve custom CSS for branding, special layout spacing, or visual details that MUI components do not cover out of the box.

---

## 9. Git Commit Conventions

Fix-My-Ride follows the **Conventional Commits** format:

```text
<prefix>: <short clear description in lowercase imperative form>
```

Using standard prefixes makes `git log` read like a clean project changelog:

| Prefix | Purpose | Fix-My-Ride Example |
| :--- | :--- | :--- |
| `feat:` | Adds new application functionality or user-facing features. | `feat: add customer registration endpoint` |
| `fix:` | Fixes a bug or broken behavior. | `fix: prevent booking submission without motorcycle selection` |
| `chore:` | Maintenance, setup, dependencies, or configuration tasks. | `chore: configure gitignore` |
| `docs:` | Creates or updates documentation only. | `docs: establish development conventions` |
| `refactor:` | Restructures existing code without changing external behavior. | `refactor: extract booking status helper function` |
| `test:` | Adds or updates automated tests. | `test: add unit tests for invoice total calculation` |
| `style:` | Formatting, whitespace, or visual styling adjustments without logic changes. | `style: align spacing on motorcycle card header` |

---

## 10. Documentation Conventions

Fix-My-Ride is built both as a working application and as a step-by-step learning project. Therefore, we follow one strict rule:

> **Every development commit must include its corresponding learning documentation inside `docs/commits/`.**

For example, Commit 01 has `docs/commits/01-project-skeleton.md`, Commit 03 has `docs/commits/03-gitignore.md`, and Commit 04 has `docs/commits/04-development-conventions.md`.

Each commit document in `docs/commits/` should cover these **9 standard sections**:

1. **Objective** — What this commit sets out to achieve.
2. **Why it is needed** — The problem it solves or why it matters right now.
3. **Concepts involved** — Plain-English explanation of the ideas or tools used.
4. **Files created or modified** — Exact list of changed files and their purpose.
5. **Implementation explanation** — Walkthrough of how the change works.
6. **Execution instructions** — How to run or start the relevant part of the project.
7. **Testing instructions** — Exact commands or steps to verify the change.
8. **Expected results** — What success looks like when testing.
9. **Git commit message** — The suggested Conventional Commit message for the increment.

*(Early foundation commits that are documentation-only or setup-only adapt sections 5–7 to explain the setup and verification steps instead of runtime code.)*

---

## 11. What We Should Avoid

Knowing what **not** to do saves just as much time as knowing best practices. Avoid these common mistakes:

- **Unclear variable names:** Avoid vague names like `data`, `temp`, `val`, or `item2` when you can write `bookingDetails` or `inspectionNote`.
- **Large components with too many responsibilities:** Avoid "god components" that handle forms, tables, API calls, and layout in one 500-line file.
- **Mixing API calls with UI presentation unnecessarily:** Keep Axios requests in `services/` rather than scattering `axios.get(...)` calls inside visual components.
- **Duplicating code:** Don't copy-paste validation rules or UI cards across pages—extract one clean shared function or component.
- **Hardcoding sensitive information:** Never put PostgreSQL passwords, secret keys, or API tokens directly inside `.py` or `.js` files; use environment variables (`.env`) instead.
- **Creating unnecessary folders:** Only create directories when you actually have files that belong in them—empty folders add noise without value.
- **Committing untested changes:** Always verify your code, commands, or documentation before committing.
- **Making unrelated changes in one commit:** Keep one commit focused on one task (don't mix a bug fix, a CSS tweak, and a new API route in the same commit).

---

## 12. Summary

Consistent conventions act as the shared rulebook for **Fix-My-Ride**:

- **Naming conventions** (`PascalCase`, `camelCase`, `snake_case`, `kebab-case`, `UPPER_SNAKE_CASE`) make both React and Python code predictable at a glance.
- **Folder and code organization rules** separate UI components, pages, Axios services, FastAPI routes, validation schemas, and business logic cleanly.
- **REST API and CSS guidelines** keep URLs intuitive and styling maintainable alongside Material UI.
- **Conventional Commits and `docs/commits/` guides** ensure every step of the project stays traceable and beginner-friendly.

Following these habits from Commit 04 onward ensures that as Fix-My-Ride grows across future phases, every new feature fits cleanly into the existing architecture without slowing down development.

---

## 13. Git Commit Message

Suggested commit message for this step:

```text
docs: establish development conventions
```

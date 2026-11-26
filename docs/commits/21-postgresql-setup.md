# Commit 21: Set Up PostgreSQL

**Phase:** Phase 2 — Database Foundation  
**Increment:** Commit 21

---

## 1. Commit Objective

The objective of **Commit 21** is to verify/set up **PostgreSQL** on Ubuntu, create a dedicated local development role (`fix_my_ride_user`) and project database (`fix_my_ride_db`), verify TCP password connectivity using `psql`, and document the database administration workflow.

> **Important Note:** This commit establishes **the PostgreSQL server, application role, and empty database only**. FastAPI, SQLAlchemy, and Python database drivers have **not** been connected to PostgreSQL yet (that begins in upcoming Phase 2 commits).

---

## 2. What Is a Database?

A **database** is an organized, structured system for storing, searching, updating, and protecting data permanently. Instead of keeping customer records or service bookings in temporary variables that disappear when a server stops, a database writes them safely to disk.

---

## 3. Why Applications Need Persistent Storage

In Phase 1, our FastAPI backend only returned static JSON messages like `GET /health`. Once Fix-My-Ride tracks customers, motorcycles, bookings, inspections, and invoices, restarting the backend server must **never** erase existing records. Persistent storage in PostgreSQL ensures data stays intact across restarts and crashes.

---

## 4. Introduction to PostgreSQL

**PostgreSQL** is a mature, open-source relational database management system (RDBMS). It enforces strict data types, relationships between records (for example, linking a motorcycle to its owner), and reliable transactions, making it an ideal database for Fix-My-Ride.

---

## 5. Database Server vs. Database

- **Database Server:** The running PostgreSQL service (`postgresql.service`) on your machine that listens for connections, checks passwords, and manages data files on disk.
- **Database (`fix_my_ride_db`):** A specific, isolated workspace inside that server dedicated to Fix-My-Ride. One PostgreSQL server can host many separate databases (such as `postgres`, `fix_my_ride_db`, or other projects).

---

## 6. Understanding Database Users and Roles

In PostgreSQL, accounts that connect to the server are called **roles** (or users).

- `postgres` is the built-in administrative **superuser** role that owns everything on the cluster.
- `fix_my_ride_user` is our dedicated application role created with `LOGIN` privileges and its own password.

Using a dedicated non-superuser role (`fix_my_ride_user`) instead of `postgres` follows good security practice: the application only receives the permissions it needs inside its own database.

---

## 7. Understanding Database Ownership

When creating `fix_my_ride_db`, we set **`OWNER fix_my_ride_user`**. That makes `fix_my_ride_user` the owner of `fix_my_ride_db`, allowing the application to create schemas, tables, and records inside `fix_my_ride_db` without needing global superuser access.

---

## 8. Understanding Host and Port

When connecting over TCP/IP:

- **Host (`localhost`):** Refers to your own local computer (`127.0.0.1`).
- **Port (`5432`):** PostgreSQL's standard network port. Just as Vite uses `5173` and FastAPI uses `8000`, PostgreSQL listens on `5432`.

---

## 9. Introduction to SQL

**SQL** (*Structured Query Language*) is the standard language used to talk to relational databases—asking questions (`SELECT`), adding data (`INSERT`), updating records (`UPDATE`), and defining structure (`CREATE DATABASE`, `CREATE TABLE`).

For example, `SELECT current_database(), current_user;` is a SQL query asking PostgreSQL which database and role are currently active.

---

## 10. Understanding Tables, Rows, and Columns

Inside a PostgreSQL database, data is organized into **schemas** and **tables**:

- **Schema:** A logical namespace inside a database (by default `public`) that groups tables cleanly.
- **Table:** A structured grid holding one kind of entity (for example, a future `customers` or `motorcycles` table).
- **Column:** A vertical field defining one attribute and its type (such as `name` or `phone`).
- **Row:** A single horizontal record representing one item in that table (such as one customer).

*(No application tables were created in Commit 21—`\dt` reports no relations yet.)*

---

## 11. Installing PostgreSQL

On Ubuntu 22.04 (`Jammy Jellyfish`), PostgreSQL `14.24` (`psql (PostgreSQL) 14.24 (Ubuntu 14.24-0ubuntu0.22.04.1)`) was already installed. On a fresh Ubuntu system where it is not yet installed, run:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

---

## 12. Starting the PostgreSQL Service

To start PostgreSQL and enable it on boot:

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
```

Verify readiness with:

```bash
psql --version
pg_isready
```

---

## 13. Creating the Application User

Using the administrative PostgreSQL shell (`sudo -u postgres psql`):

```sql
CREATE ROLE fix_my_ride_user WITH LOGIN;
\password fix_my_ride_user
```

Using `\password fix_my_ride_user` sets the password interactively so no secret is ever typed in plain SQL files, terminal history scripts, or documentation.

---

## 14. Creating the Project Database

Inside `sudo -u postgres psql`:

```sql
CREATE DATABASE fix_my_ride_db
OWNER fix_my_ride_user;
\q
```

---

## 15. Connecting Through `psql`

Connect over TCP (`localhost:5432`) with password authentication (`-W` prompts interactively):

```bash
psql -h localhost -p 5432 -U fix_my_ride_user -d fix_my_ride_db -W
```

---

## 16. Useful PostgreSQL Commands

Inside `psql`, these queries and meta-commands help inspect the database:

- `SELECT current_database();` — Shows the database you are connected to (`fix_my_ride_db`).
- `SELECT current_user;` — Shows your active database role (`fix_my_ride_user`).
- `SELECT current_schema();` — Shows the active schema (typically `public`).
- `SELECT version();` — Shows the PostgreSQL server version.
- `\dt` — Lists tables in the current schema (empty right now).
- `\l` — Lists all databases and their owners on the PostgreSQL server.
- `\q` — Exits the `psql` shell.

---

## 17. Verification Results

- **OS & PostgreSQL binary:** Verified Ubuntu `22.04.1 LTS` and `psql (PostgreSQL) 14.24 (Ubuntu 14.24-0ubuntu0.22.04.1)`.
- **Service status & readiness:** Verified `postgresql.service` is `active` and `enabled`, and `pg_isready` / `pg_isready -h localhost -p 5432` report `accepting connections`.
- **Interactive role, database, and TCP login verification:** Executed interactively in the user's terminal (`sudo -u postgres psql` and `psql -h localhost -p 5432 -U fix_my_ride_user -d fix_my_ride_db -W`) so passwords remain private and never stored in files or Git.
- **Repository isolation:** Verified no Python database packages were added to `requirements.txt`, no FastAPI or frontend files were modified, and no credentials exist in Git.

---

## 18. What Was Implemented

- Verified PostgreSQL `14.24` installation and running `postgresql.service` on `localhost:5432`.
- Created the `fix_my_ride_user` login role with an interactive password.
- Created the `fix_my_ride_db` database owned by `fix_my_ride_user`.
- Added Section 14 (*PostgreSQL Database Setup*) to `backend/README.md`.
- Created `docs/commits/21-postgresql-setup.md`.

---

## 19. What Has NOT Been Implemented

To keep Commit 21 strictly focused on PostgreSQL setup:

- **No Python connection to PostgreSQL** exists yet (FastAPI is not connected to the database).
- **No SQLAlchemy, Alembic, or PostgreSQL Python drivers (`psycopg2` / `psycopg`)** were installed or added to `requirements.txt`.
- **No database tables, models, or migrations** were created.
- **No frontend files or root `README.md`** were modified.

---

## 20. Git Commit Message

Suggested commit message for this step:

```text
chore(database): document postgresql setup
```

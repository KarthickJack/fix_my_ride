# Commit 01: Project Skeleton

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 01 of 20

---

## 1. Objective

The objective of this first commit is to establish a clean, organized starting directory structure and placeholder documentation for **Fix-My-Ride**, a Motorcycle Service Management System.

At this stage, we are intentionally setting up only folders and `README.md` / documentation files—no programming code, packages, or configurations are added yet.

---

## 2. Why We Need a Project Structure

Think of building a software application like building a house or setting up a motorcycle repair workshop:

- In a workshop, you do not throw wrenches, spare parts, invoices, and oil cans into one giant pile. You keep tools in toolboxes, parts on shelves, and records in folders so everything is easy to find and maintain.
- In software development, a **project structure** gives every part of the application a dedicated home.
- Organizing folders from the very beginning prevents confusion as the project grows, makes collaboration easier, and helps tools and developers immediately understand where different parts of the project live.

---

## 3. Understanding Frontend and Backend

Modern web applications are usually divided into two main parts:

- **Frontend (The Client / User-Facing Side):**  
  This is everything the user sees and interacts with in their web browser—screens, buttons, forms, tables, and colors. When someone uses Fix-My-Ride on a computer, they are interacting with the frontend.
- **Backend (The Server / Behind-the-Scenes Side):**  
  This is the part running on a server that the user does not see directly. It receives requests from the frontend, applies rules and business logic, saves and retrieves information from a database, and sends responses back to the frontend.

Separating the frontend and backend into their own folders keeps the user interface cleanly separated from server logic and data storage.

---

## 4. Understanding Project Directories

Here is what each directory in our initial structure is for:

- **Root directory (`fix-my-ride/`):**  
  The main home folder of the entire project. It holds the main `README.md` and top-level folders.
- **`frontend/`:**  
  Reserved for all user-interface code and frontend assets (to be added in later commits).
- **`backend/`:**  
  Reserved for the Python server code, API logic, and database integration (to be added in later commits).
- **`docs/commits/`:**  
  Stores step-by-step learning notes for each commit so anyone following along can understand what changed and why at every step.

---

## 5. Files Created

In this commit, the following files were created:

1. `README.md` — Main project overview, planned technology stack, and current development phase/commit status.
2. `frontend/README.md` — Placeholder documentation explaining the purpose and planned tools for the `frontend/` directory.
3. `backend/README.md` — Placeholder documentation explaining the purpose and planned tools for the `backend/` directory.
4. `docs/commits/01-project-skeleton.md` — This learning guide documenting Commit 01.

---

## 6. What We Have Accomplished

- Created the top-level directory layout (`frontend/`, `backend/`, and `docs/commits/`).
- Documented the project purpose, planned stack, and separation of responsibilities in the root `README.md`.
- Added clear placeholder explanations in both `frontend/README.md` and `backend/README.md`.
- Established a learning documentation trail starting with `docs/commits/01-project-skeleton.md`.

---

## 7. What We Have NOT Implemented

To keep Phase 1 controlled and incremental, none of the following have been implemented yet:

- No React, Vite, Material UI, Axios, or CSS application files.
- No Python, FastAPI, or SQLAlchemy source files.
- No package manifests (`package.json`, `requirements.txt`) or installed dependencies.
- No PostgreSQL database setup or configuration files.
- No API endpoints, UI components, or working application features.

---

## 8. How to Verify the Structure

You can verify that all expected directories and files are in place from the project root directory using your terminal.

On Linux or macOS:

```bash
find . -maxdepth 3 -not -path '*/.*' | sort
```

Or if `tree` is installed:

```bash
tree -I '.git'
```

You should see:

```text
.
├── README.md
├── backend
│   └── README.md
├── docs
│   └── commits
│       └── 01-project-skeleton.md
└── frontend
    └── README.md
```

Verify that no extra files (such as `package.json`, `requirements.txt`, `.py`, or `.js`/`.jsx` files) are present.

---

## 9. Next Commit Preview

In the next commit (**Commit 02** of Phase 1), we will continue building the repository foundation incrementally on top of this clean directory skeleton, preparing the project environment for upcoming development steps without jumping ahead into application features.

---

## 10. Git Commit Message

Suggested commit message for this step:

```text
chore: initialize project structure
```

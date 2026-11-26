# Commit 07: Organize Frontend Source Structure

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 07 of 20

---

## 1. Commit Objective

The objective of **Commit 07** is to organize `frontend/src/` into a clean, predictable, and scalable folder structure before feature development begins.

Right now, `frontend/src/` contains only the initial React + Vite files (`App.jsx`, `App.css`, `index.css`, `main.jsx`). By creating dedicated folders for assets, reusable components, layouts, pages, services, and shared styles today, every future developer knows exactly where each piece of frontend code belongs.

> **Important Note:** This commit prepares **only the folder structure** (using `.gitkeep` markers so Git tracks empty directories). No feature components, pages, routes, or API services are implemented yet.

---

## 2. Why Folder Organization Matters

Imagine opening a motorcycle workshop's parts room and finding brake pads, customer invoices, spark plugs, and cleaning rags all mixed in a single box. Finding anything takes extra time, and putting new items away gets messy fast.

The same thing happens in a React project when every file is dropped directly into `src/`. Without clear folders:

- `src/` quickly fills up with dozens of unrelated `.jsx`, `.css`, and `.js` files.
- It becomes hard to tell a small reusable button apart from a full application screen.
- API calls end up mixed inside visual UI code, making bugs harder to trace and fix.

Organizing `src/` early keeps Fix-My-Ride easy to navigate, easier to test, and consistent with the project's development conventions.

---

## 3. Explanation of Each Folder

Six dedicated directories have been added inside `frontend/src/`:

1. **`src/assets/`** — Stores static frontend media imported directly by React components, such as logos, motorcycle icons, or workshop illustrations.
2. **`src/components/`** — Stores small, reusable UI building blocks shared across multiple pages (for example, future `Button`, `InputField`, `StatusBadge`, or `DataTable` components).
3. **`src/layouts/`** — Stores application-wide structural wrappers that frame pages with common navigation or chrome (for example, future `MainLayout` or `DashboardLayout` wrappers).
4. **`src/pages/`** — Stores full screen views representing individual routes or workflows (for example, future `DashboardPage`, `CustomersPage`, or `BookingsPage`).
5. **`src/services/`** — Stores external communication logic, such as Axios configuration and functions that talk to the FastAPI backend (for example, future customer or booking API requests).
6. **`src/styles/`** — Stores shared CSS files and global styling resources as the visual layer grows beyond `index.css` and `App.css`.

---

## 4. Difference Between `components/`, `layouts/`, and `pages/`

Beginners often wonder why React projects separate these three folders instead of putting all `.jsx` files in one place. Each level has a distinct scope:

| Folder | Scope | Think of It As... | Fix-My-Ride Future Example |
| :--- | :--- | :--- | :--- |
| **`components/`** | Small, reusable building blocks | Individual Lego bricks | `StatusBadge` (shows *Pending* or *Completed*), `InputField`, `DataTable` |
| **`layouts/`** | Structural page shells | The frame around a screen | `DashboardLayout` (top navigation bar + sidebar + main content area) |
| **`pages/`** | Complete feature screens | A finished room built from bricks inside a frame | `BookingsPage` (combines `DataTable`, `StatusBadge`, and booking actions for the `/bookings` screen) |

In short: **components** are reused everywhere, **layouts** wrap screens with shared structure, and **pages** assemble components to serve a specific user workflow.

---

## 5. Explanation of `services/` and `assets/`

### Why `services/` Is Separate

Your UI files (in `components/` and `pages/`) should focus on **what the user sees and clicks**, not on HTTP URLs, request headers, or Axios configuration.

Putting API communication into `src/services/` means:

- If a backend endpoint URL changes later, you update it in **one** service file instead of hunting across ten React components.
- UI components stay clean, short, and easy to read.
- Future API helpers for customers, motorcycles, and bookings stay neatly grouped together.

### Where `assets/` and `styles/` Belong

- **`src/assets/`** holds files that JavaScript/React modules `import` directly (such as a workshop logo or custom SVG icons processed by Vite's bundler). By contrast, files that must keep an exact unbundled root URL (like `/favicon.svg`) stay in `frontend/public/`.
- **`src/styles/`** holds shared CSS files (such as theme variables, typography rules, or reusable utility classes) once styles outgrow the initial `index.css` and `App.css`. Existing CSS files (`index.css` and `App.css`) remain in place so nothing breaks unnecessarily.

---

## 6. Explanation of the Final Folder Structure

After Commit 07, `frontend/src/` looks like this:

```text
frontend/src/
├── assets/
│   └── .gitkeep
├── components/
│   └── .gitkeep
├── layouts/
│   └── .gitkeep
├── pages/
│   └── .gitkeep
├── services/
│   └── .gitkeep
├── styles/
│   └── .gitkeep
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

- **`main.jsx` and `App.jsx` stay at the root of `src/`** because `index.html` points to `/src/main.jsx`, which mounts `<App />`.
- **`App.css` and `index.css` stay at the root of `src/`** so existing imports (`import './App.css'` and `import './index.css'`) continue working with zero unnecessary churn.
- **`.gitkeep` files** are tiny empty placeholder files used solely so Git tracks the six empty directories until real source files are added inside them in future commits.

---

## 7. Files and Directories Created or Modified

### Directories & Marker Files Created
- `frontend/src/assets/.gitkeep`
- `frontend/src/components/.gitkeep`
- `frontend/src/layouts/.gitkeep`
- `frontend/src/pages/.gitkeep`
- `frontend/src/services/.gitkeep`
- `frontend/src/styles/.gitkeep`

### Files Created or Modified
- Modified `frontend/README.md` — Added a detailed section explaining the new `src/` folder structure, folder responsibilities, and architectural boundaries.
- Created `docs/commits/07-frontend-folder-structure.md` — This learning guide documenting Commit 07.

### Existing Files Preserved Untouched
- `frontend/src/App.jsx`
- `frontend/src/App.css`
- `frontend/src/index.css`
- `frontend/src/main.jsx`
- `frontend/package.json`

---

## 8. Implementation Explanation

1. Inspected `frontend/src/` (`App.jsx`, `App.css`, `index.css`, `main.jsx`) and `frontend/package.json` to confirm the existing app setup and imports.
2. Created the six organizational subdirectories inside `frontend/src/`: `assets/`, `components/`, `layouts/`, `pages/`, `services/`, and `styles/`.
3. Added a `.gitkeep` file in each new directory so Git records the directory structure without adding unnecessary placeholder `.js`/`.jsx` files.
4. Left `App.jsx`, `main.jsx`, `App.css`, and `index.css` in place at the root of `frontend/src/`, preserving all existing behavior and visual design.
5. Updated `frontend/README.md` and created this commit guide.

---

## 9. How to Run the Frontend

From the `frontend/` directory:

```bash
cd frontend
npm run dev
```

*(If dependencies have not been installed locally yet, run `npm install` first.)*

---

## 10. How to Verify the Application

Run the production build from `frontend/` and inspect the `src/` directory layout:

```bash
cd frontend
npm run build
ls -la src
```

Confirm that:

1. All six folders (`assets`, `components`, `layouts`, `pages`, `services`, `styles`) exist inside `frontend/src/`.
2. `App.jsx`, `App.css`, `index.css`, and `main.jsx` remain intact at the root of `frontend/src/`.
3. `npm run build` succeeds with zero errors, proving all existing imports and the application entry point remain intact.

---

## 11. Expected Results

- `ls -la frontend/src` lists `assets/`, `components/`, `layouts/`, `pages/`, `services/`, `styles/`, `App.css`, `App.jsx`, `index.css`, and `main.jsx`.
- `npm run build` completes cleanly with exit code `0` and generates the production bundle inside `frontend/dist/`.
- Running `npm run dev` continues to render the exact same Fix-My-Ride welcome screen as before.

---

## 12. What Has Been Completed

- Created all six planned `frontend/src/` subdirectories (`assets/`, `components/`, `layouts/`, `pages/`, `services/`, `styles/`).
- Added `.gitkeep` files so Git tracks the empty directories cleanly.
- Verified `npm run build` continues to pass without errors or broken imports.
- Documented the folder structure and responsibilities in `frontend/README.md` and `docs/commits/07-frontend-folder-structure.md`.

---

## 13. What Is Intentionally Not Implemented

To keep Commit 07 focused strictly on folder organization:

- No reusable UI components (`Button`, `InputField`, `StatusBadge`, `DataTable`) were created.
- No layout components (`MainLayout`, `DashboardLayout`) or pages (`DashboardPage`, `CustomersPage`, `BookingsPage`) were created.
- No React Router, Material UI, or Axios setup or API service files were added.
- No visual changes or backend changes were made.

---

## 14. Suggested Git Commit Message

```text
refactor(frontend): organize source structure
```

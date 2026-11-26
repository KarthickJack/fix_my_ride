# Commit 13: Create Initial Application Pages

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 13 of 20

---

## 1. Commit Objective

The objective of **Commit 13** is to replace the temporary inline route placeholders from Commit 12 with dedicated, well-structured React page components for **Dashboard**, **Customers**, and **Bookings**, each with its own stylesheet and consistent Material UI layout.

> **Important Note:** These pages establish the **initial page structure and honest placeholder/empty-state UI** only. No forms, data tables, fake business data, or backend API calls are implemented yet.

---

## 2. What a React Page Component Is

A **React page component** is a top-level component that represents an entire screen mapped to a URL in your router:

- Visiting `/dashboard` renders `DashboardPage`.
- Visiting `/customers` renders `CustomersPage`.
- Visiting `/bookings` renders `BookingsPage`.

Just like any other React component, a page is a JavaScript function returning JSX—the difference is its **role**: it owns the content inside the main area of `MainLayout` for a specific route.

---

## 3. Difference Between Pages and Reusable Components

| Aspect | Reusable Components (`src/components/`) | Page Components (`src/pages/`) |
| :--- | :--- | :--- |
| **Purpose** | Provide shared building blocks used across multiple screens. | Represent one full route-level screen in Fix-My-Ride. |
| **Lifetime** | Often stay mounted across route changes (like `Header` and `Sidebar`). | Swap in and out as the browser URL changes. |
| **Fix-My-Ride Examples** | `Header.jsx`, `Sidebar.jsx` (and future `DataTable`, `StatusBadge`). | `DashboardPage.jsx`, `CustomersPage.jsx`, `BookingsPage.jsx`. |

---

## 4. Explanation of the `pages/` Folder

Inside `frontend/src/pages/`, each page gets its own dedicated subfolder:

```text
frontend/src/pages/
├── Bookings/
│   ├── BookingsPage.css
│   └── BookingsPage.jsx
├── Customers/
│   ├── CustomersPage.css
│   └── CustomersPage.jsx
└── Dashboard/
    ├── DashboardPage.css
    └── DashboardPage.jsx
```

Grouping each page's `.jsx` and `.css` files in its own folder (`Dashboard/`, `Customers/`, `Bookings/`) keeps related files together and leaves room for future page-specific subcomponents or helpers without cluttering `src/pages/`.

---

## 5. `DashboardPage` Implementation

`frontend/src/pages/Dashboard/DashboardPage.jsx` uses Material UI `Box`, `Paper`, and `Typography` to display:

- **Heading:** `Dashboard`
- **Description:** Central workspace overview for the Fix-My-Ride Motorcycle Service Management System.
- **Welcome message:** Guidance inviting the user to switch between core workshop sections using the sidebar navigation.
- **Placeholder section:** A clearly labeled dashed container (*Dashboard Statistics (Placeholder)*) explaining that live workshop metrics will be implemented once backend data modules are connected—avoiding any fake numbers.

---

## 6. `CustomersPage` Implementation

`frontend/src/pages/Customers/CustomersPage.jsx` uses the same consistent `Box`, `Paper`, and `Typography` card structure to display:

- **Heading:** `Customers`
- **Description:** Overview of managing motorcycle owners, contact details, and associated service profiles in Fix-My-Ride.
- **Empty state:** `"No customer records available yet."` paired with a brief note explaining that customer registration and management features will be implemented in later phases.

No fake customer tables, registration forms, or edit/delete buttons exist yet.

---

## 7. `BookingsPage` Implementation

`frontend/src/pages/Bookings/BookingsPage.jsx` displays:

- **Heading:** `Bookings`
- **Description:** Overview of tracking motorcycle service appointments, scheduled drop-offs, and workshop service requests in Fix-My-Ride.
- **Empty state:** `"No service bookings available yet."` paired with a brief note explaining that booking scheduling and management features will be implemented in later phases.

No booking forms, fake booking rows, or status workflows exist yet.

---

## 8. Explanation of Page-Specific CSS

Each page imports its own stylesheet (`DashboardPage.css`, `CustomersPage.css`, `BookingsPage.css`).

All three stylesheets:

- Reuse design tokens from `src/styles/global.css` (`--color-surface`, `--color-bg`, `--color-border`, `--color-text-heading`, `--color-text-primary`, `--color-text-secondary`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--radius-md`, `--radius-lg`, `--font-weight-semibold`, `--font-weight-bold`).
- Target MUI root classes cleanly (such as `.dashboard-page-card.MuiPaper-root`) so card padding, surface color, and border radius remain uniform across all three pages.
- Adjust padding smoothly at `@media (max-width: 768px)` for mobile screens.

---

## 9. How Pages Connect to React Router

In `frontend/src/routes/AppRoutes.jsx`, the temporary inline placeholders from Commit 12 are replaced with clean imports:

```jsx
import DashboardPage from '../pages/Dashboard/DashboardPage.jsx';
import CustomersPage from '../pages/Customers/CustomersPage.jsx';
import BookingsPage from '../pages/Bookings/BookingsPage.jsx';
```

And mapped inside `<Routes>`:

- `/` → `<Navigate to="/dashboard" replace />`
- `/dashboard` → `<DashboardPage />`
- `/customers` → `<CustomersPage />`
- `/bookings` → `<BookingsPage />`
- `*` → `<NotFoundPage />`

---

## 10. How `MainLayout` Displays Page Content

`AppRoutes.jsx` wraps `/dashboard`, `/customers`, `/bookings`, and `*` inside `<Route element={<LayoutWrapper />}>`, where `LayoutWrapper` renders `<MainLayout><Outlet /></MainLayout>`.

When React Router matches `/customers`, `<Outlet />` resolves to `<CustomersPage />`, which `MainLayout` renders inside `<main className="main-layout-content">{children}</main>` right beside `Sidebar` and below `Header`.

---

## 11. Component Hierarchy

```text
App
└── BrowserRouter
    └── AppRoutes
        ├── "/" -> Navigate to "/dashboard"
        └── LayoutWrapper (MainLayout)
            ├── Header
            ├── Sidebar (highlights active route via NavLink)
            └── main.main-layout-content
                └── Outlet
                    ├── "/dashboard" -> DashboardPage
                    ├── "/customers" -> CustomersPage
                    ├── "/bookings"  -> BookingsPage
                    └── "*"          -> NotFoundPage
```

---

## 12. Files Created or Modified

- **Created:** `frontend/src/pages/Dashboard/DashboardPage.jsx` & `frontend/src/pages/Dashboard/DashboardPage.css`
- **Created:** `frontend/src/pages/Customers/CustomersPage.jsx` & `frontend/src/pages/Customers/CustomersPage.css`
- **Created:** `frontend/src/pages/Bookings/BookingsPage.jsx` & `frontend/src/pages/Bookings/BookingsPage.css`
- **Modified:** `frontend/src/routes/AppRoutes.jsx` — Replaced inline placeholder components with `DashboardPage`, `CustomersPage`, and `BookingsPage` imports while keeping `/` redirect and `*` `NotFoundPage`.
- **Modified:** `frontend/README.md` — Updated file list and added Section 11 explaining page components, per-page folders, and page CSS.
- **Created:** `docs/commits/13-initial-application-pages.md` — This learning guide documenting Commit 13.

---

## 13. Implementation Explanation

1. Ran preflight inspection and `npm run build` to verify the Commit 12 routing baseline.
2. Created `Dashboard/`, `Customers/`, and `Bookings/` subdirectories under `frontend/src/pages/`, each containing a `.jsx` page component and `.css` stylesheet using Material UI (`Box`, `Paper`, `Typography`) and `global.css` tokens.
3. Updated `AppRoutes.jsx` to import and render the three page components inside `LayoutWrapper` (`MainLayout` + `Outlet`) while preserving `NotFoundPage` and the `/` redirect.
4. Updated `frontend/README.md` and created this commit guide.

---

## 14. How to Run the Application

From `frontend/`:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 15. How to Test All Pages

1. Visit `/` and verify it redirects to `/dashboard` and renders `DashboardPage`.
2. Click **Customers** in `Sidebar` (or visit `/customers`) and verify `CustomersPage` renders with **Customers** highlighted in the sidebar.
3. Click **Bookings** in `Sidebar` (or visit `/bookings`) and verify `BookingsPage` renders with **Bookings** highlighted in the sidebar.
4. Visit `/invalid-page` and verify `NotFoundPage` renders with the **Return to Dashboard** button.
5. Toggle the mobile menu button at narrower viewport widths (`<= 768px`) to confirm responsive layout and navigation stay intact.

---

## 16. Expected Results

- `npm run build` exits with code `0` and bundles all three pages cleanly into `frontend/dist/`.
- Every route (`/`, `/dashboard`, `/customers`, `/bookings`, `/invalid-page`) renders inside `MainLayout` with `Header` and `Sidebar` intact and active route highlighting working.
- Each page displays honest placeholder/empty-state content with consistent card styling and zero invented business records.

---

## 17. What Has Been Completed

- Created `DashboardPage`, `CustomersPage`, and `BookingsPage` with dedicated CSS files.
- Connected all three pages in `frontend/src/routes/AppRoutes.jsx`.
- Preserved `MainLayout`, `Header`, `Sidebar`, `/` redirect, and `*` `NotFoundPage`.
- Updated `frontend/README.md` and created `docs/commits/13-initial-application-pages.md`.

---

## 18. What Is Intentionally Not Implemented

To keep Commit 13 focused strictly on initial page structure:

- No customer registration forms, CRUD tables, or edit/delete actions.
- No booking forms, status workflows, or fake booking records.
- No invented dashboard KPI numbers or charts.
- No Axios setup, backend API calls, database queries, authentication, or role-based access control.

---

## 19. Suggested Git Commit Message

```text
feat(frontend): create initial application pages
```

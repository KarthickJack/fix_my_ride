# Commit 12: Configure Page Routing

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 12 of 20

---

## 1. Commit Objective

The objective of **Commit 12** is to configure **client-side routing** for the **Fix-My-Ride** frontend using **React Router DOM** (`react-router-dom`) and connect the `Sidebar` menu items to real application URLs.

This commit sets up the routing infrastructure and temporary route placeholders so switching between `/dashboard`, `/customers`, `/bookings`, and unknown URLs works smoothly without reloading the browser page.

> **Important Note:** The views rendered for `/dashboard`, `/customers`, and `/bookings` in `AppRoutes.jsx` are **temporary placeholder components only**. Actual separate page files (`src/pages/DashboardPage.jsx`, `CustomersPage.jsx`, `BookingsPage.jsx`) will be created in **Commit 13**.

---

## 2. What Routing Is

**Routing** is the mechanism that decides **what screen to show** based on the **URL** in the browser's address bar.

For example, in Fix-My-Ride:

- Visiting `/dashboard` should display the Workshop Dashboard.
- Visiting `/customers` should display the Customers management view.
- Visiting `/bookings` should display the Service Bookings view.
- Visiting an unrecognized path like `/something-unknown` should display a clear **Page Not Found** message instead of a blank screen.

---

## 3. Client-Side Routing vs. Traditional Navigation

| Aspect | Traditional Server Navigation | Client-Side Routing (React Router) |
| :--- | :--- | :--- |
| **What happens on link click** | Browser requests a brand-new HTML page from the server and discards the current JavaScript state. | JavaScript intercepts the click, updates the URL bar via the browser History API, and swaps React components in memory. |
| **Page reload** | Full browser reload (screen flashes white). | **No full page reload**—`Header`, `Sidebar`, and layout stay mounted. |
| **Browser Back/Forward** | Works across server-loaded pages. | Works seamlessly because `BrowserRouter` tracks history entries. |

---

## 4. Explanation of React Router DOM

**React Router DOM (`react-router-dom`)** is the standard routing library for React web applications. It provides components (`BrowserRouter`, `Routes`, `Route`, `Navigate`, `NavLink`, `Link`, `Outlet`) and hooks (`useLocation`) that connect browser URLs directly to React components.

Because preflight checks confirmed `react-router-dom` was not yet installed in `frontend/package.json`, it was installed prior to creating `AppRoutes.jsx`.

---

## 5. Explanation of `BrowserRouter`

**`BrowserRouter`** wraps the application **once** at the root (`frontend/src/App.jsx`) and connects React to the browser's History API (`window.location` and `history.pushState`).

Why place `BrowserRouter` in `App.jsx`?

- `main.jsx` stays focused strictly on DOM mounting (`createRoot`, `StrictMode`, `./index.css`).
- `App.jsx` wraps `<AppRoutes />` in a single `<BrowserRouter>` so every component inside—including `Sidebar` (`NavLink`, `useLocation`) and `AppRoutes` (`Routes`, `Route`, `Navigate`)—shares one router context.
- Never wrap an app in multiple `BrowserRouter` instances, as nested routers conflict with each other.

---

## 6. Explanation of `Routes` and `Route`

Inside `frontend/src/routes/AppRoutes.jsx`:

- **`<Routes>`** examines the current URL and picks the single best-matching child `<Route>`.
- **`<Route path="..." element={...} />`** pairs a URL pattern (`path`) with the React element (`element`) to render when that URL matches.

---

## 7. Explanation of `Navigate`

**`<Navigate>`** performs a declarative redirect when a route is matched:

```jsx
<Route path="/" element={<Navigate to="/dashboard" replace />} />
```

When a user opens the root URL `/`, `<Navigate to="/dashboard" replace />` immediately redirects them to `/dashboard`. The `replace` prop replaces `/` in browser history so clicking the browser **Back** button does not trap the user in a redirect loop.

---

## 8. Explanation of `NavLink`

**`<NavLink>`** is React Router's navigation link component designed specifically for menus like `Sidebar.jsx`.

Unlike a plain `<a href="/customers">` (which triggers a full browser page reload), `<NavLink to="/customers">` updates the URL on the client side without reloading the page.

In `Sidebar.jsx`, each MUI `ListItemButton` uses `component={NavLink}` and `to={item.path}` along with `useLocation().pathname === item.path` to apply MUI's `selected` state and `.app-sidebar-link-active` highlight to whichever route is active.

---

## 9. Explanation of Nested Routes and `Outlet`

Rather than repeating `<MainLayout>...</MainLayout>` inside every single route, `AppRoutes.jsx` uses a **layout route** with **`<Outlet />`**:

```jsx
function LayoutWrapper() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
```

Inside `<Routes>`:

```jsx
<Route element={<LayoutWrapper />}>
  <Route path="/dashboard" element={<DashboardPlaceholder />} />
  <Route path="/customers" element={<CustomersPlaceholder />} />
  <Route path="/bookings" element={<BookingsPlaceholder />} />
  <Route path="*" element={<NotFoundPage />} />
</Route>
```

`<Outlet />` acts as a slot inside `MainLayout` where React Router automatically renders whichever nested child `<Route>` matches the current URL.

---

## 10. Explanation of the Routing Hierarchy

```text
App
└── BrowserRouter
    └── AppRoutes
        ├── "/" -> Navigate to "/dashboard"
        └── LayoutWrapper (renders MainLayout)
            ├── Header (persists across route changes)
            ├── Sidebar (NavLink items highlight active route)
            └── main.main-layout-content
                └── Outlet
                    ├── "/dashboard" -> DashboardPlaceholder
                    ├── "/customers" -> CustomersPlaceholder
                    ├── "/bookings"  -> BookingsPlaceholder
                    └── "*"          -> NotFoundPage
```

---

## 11. Explanation of Each Configured URL

| URL | Target Component | Purpose |
| :--- | :--- | :--- |
| `/` | `Navigate` → `/dashboard` | Redirects root visits directly to the Dashboard route. |
| `/dashboard` | `DashboardPlaceholder` | Temporary placeholder identifying the `/dashboard` route. |
| `/customers` | `CustomersPlaceholder` | Temporary placeholder identifying the `/customers` route. |
| `/bookings` | `BookingsPlaceholder` | Temporary placeholder identifying the `/bookings` route. |
| `*` | `NotFoundPage` | Catch-all fallback for any unrecognized URL. |

---

## 12. Explanation of the Not Found Route

The wildcard route `path="*"` matches any URL that did not match `/`, `/dashboard`, `/customers`, or `/bookings` (for example, `/invalid-page`).

`NotFoundPage` renders inside `MainLayout` and displays:

- **Page Not Found** heading
- Short explanatory message (*"The page you requested does not exist or may have moved."*)
- A Material UI button configured with React Router `<Link to="/dashboard">` (**Return to Dashboard**) so users can recover with one click without reloading the page.

---

## 13. Files Created or Modified

- **Created:** `frontend/src/routes/AppRoutes.jsx` — Route configuration (`Routes`, `Route`, `Navigate`, `Outlet`, temporary placeholders, and `NotFoundPage`).
- **Modified:** `frontend/src/App.jsx` — Wraps `<AppRoutes />` in a single `<BrowserRouter>`.
- **Modified:** `frontend/src/components/Sidebar.jsx` — Connects `Dashboard`, `Customers`, and `Bookings` menu items to `/dashboard`, `/customers`, and `/bookings` using `NavLink` and `useLocation`, and closes the mobile drawer on click.
- **Modified:** `frontend/src/components/Sidebar.css` — Ensures `text-decoration: none` on `NavLink`-backed `ListItemButton` items.
- **Modified (approved exception):** `frontend/package.json` & `frontend/package-lock.json` — Installed `react-router-dom` after preflight check confirmed it was not yet installed.
- **Modified:** `frontend/README.md` — Updated file list and added Section 10 explaining client-side routing and React Router DOM concepts.
- **Created:** `docs/commits/12-page-routing.md` — This learning guide documenting Commit 12.

---

## 14. Implementation Explanation

1. Inspected `package.json`, `main.jsx`, `App.jsx`, `MainLayout.jsx`, `Header.jsx`, and `Sidebar.jsx`, and installed `react-router-dom` with user confirmation.
2. Created `src/routes/AppRoutes.jsx` with a `LayoutWrapper` (`MainLayout` + `Outlet`), `/` → `/dashboard` redirect, temporary placeholders for `/dashboard`, `/customers`, `/bookings`, and a `*` `NotFoundPage`.
3. Updated `src/App.jsx` to mount `<BrowserRouter><AppRoutes /></BrowserRouter>`.
4. Updated `src/components/Sidebar.jsx` to use `NavLink` and `useLocation` so sidebar items navigate without full page reloads and highlight the active route.
5. Updated `frontend/README.md` and created this commit guide.

---

## 15. How to Run the Application

From `frontend/`:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 16. How to Test Navigation

1. Open `http://localhost:5173/` and observe the automatic redirect to `/dashboard`.
2. Click **Customers** and **Bookings** in the `Sidebar` and watch the URL and placeholder content switch instantly without a browser refresh.
3. Click **Dashboard** to return and confirm active highlighting follows the current route.
4. Visit `http://localhost:5173/invalid-page` to verify **Page Not Found** renders and click **Return to Dashboard**.
5. Test the browser **Back** and **Forward** buttons across visited routes.

---

## 17. Expected Results

- `npm run build` exits with code `0` and bundles `react-router-dom` and `AppRoutes` cleanly into `frontend/dist/`.
- `/` redirects to `/dashboard`.
- `/dashboard`, `/customers`, and `/bookings` each display their corresponding placeholder inside `MainLayout` with the matching `Sidebar` item highlighted.
- Unknown routes display **Page Not Found** with a working **Return to Dashboard** link.

---

## 18. What Has Been Completed

- Installed `react-router-dom`.
- Created `frontend/src/routes/AppRoutes.jsx` with nested layout routing and temporary route placeholders.
- Configured a single `BrowserRouter` in `frontend/src/App.jsx`.
- Connected `Sidebar.jsx` menu items with `NavLink` and active route highlighting.
- Added fallback `*` Not Found handling with a link back to `/dashboard`.
- Documented routing in `frontend/README.md` and `docs/commits/12-page-routing.md`.

---

## 19. What Is Intentionally Not Implemented

To keep Commit 12 focused strictly on routing infrastructure:

- No separate page files (`DashboardPage.jsx`, `CustomersPage.jsx`, `BookingsPage.jsx`) exist yet (Commit 13).
- No dashboard charts/cards, customer CRUD tables, or booking forms exist yet.
- No authentication, protected routes, or role-based route guards exist yet.
- No Axios configuration or backend API calls exist yet.

---

## 20. Suggested Git Commit Message

```text
feat(frontend): configure page routing
```

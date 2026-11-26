# Commit 11: Add Header and Sidebar

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 11 of 20

---

## 1. Commit Objective

The objective of **Commit 11** is to build reusable **`Header`** and **`Sidebar`** components using **Material UI** and component CSS, and integrate them into **`MainLayout`** to replace the Commit 10 placeholder regions.

This commit establishes Fix-My-Ride's visual navigation shell—a clean top application bar and a responsive left sidebar with static menu items (`Dashboard`, `Customers`, `Bookings`)—while preserving the existing welcome screen inside `MainLayout`.

> **Important Note:** The menu items in `Sidebar` are **static visual placeholders only**. Clicking them does **not** navigate to other pages yet; React Router and individual pages will be introduced in Commit 12.

---

## 2. Why an Application Needs a Header and Sidebar

In a multi-screen management system like Fix-My-Ride, users switch constantly between checking workshop status, looking up customers, and managing bookings:

- **The Header** anchors the application's identity at the top of the screen (**Fix-My-Ride** title and motorcycle icon) and gives mobile users an easy menu toggle button.
- **The Sidebar** organizes primary sections (`Dashboard`, `Customers`, `Bookings`) vertically in one consistent place so users immediately see what modules exist and which section is active.

Keeping both outside individual pages inside `MainLayout` means every future screen shares the exact same navigation chrome automatically.

---

## 3. Explanation of Reusable React Components

A **reusable React component** lives in `src/components/` and encapsulates one self-contained piece of the interface:

- `Header.jsx` handles only the top bar.
- `Sidebar.jsx` handles only the navigation sidebar.

Because each component is isolated with its own CSS file (`Header.css`, `Sidebar.css`), `MainLayout.jsx` stays short, readable, and easy to maintain.

---

## 4. Explanation of Material UI

**Material UI (`@mui/material`)** is a widely used React UI component library that provides ready-made, accessible interface primitives.

In this commit we use:

- **`AppBar` and `Toolbar`** (in `Header.jsx`) for a clean, semantic top application bar.
- **`Typography`** (in `Header.jsx`) for the **Fix-My-Ride** brand heading.
- **`IconButton`** (in `Header.jsx` and `Sidebar.jsx`) for accessible clickable icon buttons with proper ARIA labels.
- **`List`, `ListItem`, `ListItemButton`, `ListItemIcon`, and `ListItemText`** (in `Sidebar.jsx`) for structured, accessible navigation rows with built-in keyboard focus and `selected` styling support.

Because Material UI had not been installed earlier in the repository, `@mui/material`, `@emotion/react`, `@emotion/styled`, and `@mui/icons-material` were installed into `frontend/package.json` prior to building these components.

---

## 5. Explanation of Material UI Icons

**Material UI Icons (`@mui/icons-material`)** provides vector SVG icons as React components:

- **`MenuIcon`** — Hamburger icon on the mobile menu toggle button in `Header.jsx`.
- **`TwoWheelerIcon`** — Motorcycle brand badge icon representing Fix-My-Ride in `Header.jsx`.
- **`DashboardIcon`** — Icon for the **Dashboard** item in `Sidebar.jsx`.
- **`PeopleIcon`** — Icon for the **Customers** item in `Sidebar.jsx`.
- **`EventNoteIcon`** — Icon for the **Bookings** item in `Sidebar.jsx`.
- **`CloseIcon`** — Close button icon inside the mobile sidebar header in `Sidebar.jsx`.

---

## 6. Explanation of Props

**Props** (short for *properties*) are arguments passed from a parent component down to a child component:

- `MainLayout` passes `isSidebarOpen` (boolean) and `onToggleSidebar` (function) to `<Header />`.
- `MainLayout` passes `isOpen` (boolean) and `onClose` (function) to `<Sidebar />`.

Props flow downward cleanly so `Header` and `Sidebar` stay focused on rendering while `MainLayout` coordinates their shared open/closed state.

---

## 7. Explanation of React State

**State** is data owned by a component that can change over time and causes React to re-render when updated.

Inside `MainLayout.jsx`:

```jsx
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
```

- `isSidebarOpen` holds the current status (`false` = closed on mobile, `true` = open on mobile).
- `setIsSidebarOpen` is the updater function used to change that state.
- Keeping this single state variable in `MainLayout` (the common parent of `Header` and `Sidebar`) avoids duplicating state across components.

---

## 8. Explanation of Event Handlers

An **event handler** is a function that runs in response to a user action such as clicking a button:

```jsx
const handleToggleSidebar = () => {
  setIsSidebarOpen((prevOpen) => !prevOpen);
};

const handleCloseSidebar = () => {
  setIsSidebarOpen(false);
};
```

- When the user clicks the menu `IconButton` in `Header`, `onClick={onToggleSidebar}` calls `handleToggleSidebar`, flipping `isSidebarOpen` between `true` and `false`.
- When the user clicks the backdrop or close button in `Sidebar`, `onClick={onClose}` calls `handleCloseSidebar`, setting `isSidebarOpen` back to `false`.

---

## 9. Explanation of Sidebar Open/Close Functionality

1. On initial load, `isSidebarOpen` starts as `false`.
2. On **mobile screens (`<= 768px`)**, `.app-sidebar` uses `transform: translateX(-100%)` to stay tucked off-screen on the left.
3. Clicking the hamburger `MenuIcon` in `Header` sets `isSidebarOpen` to `true`, which adds the `.app-sidebar-open` class (`transform: translateX(0)`) and renders `.app-sidebar-backdrop` behind the drawer.
4. Clicking either the close button (`CloseIcon`) or the dark backdrop sets `isSidebarOpen` back to `false`, smoothly sliding the sidebar closed.

---

## 10. Explanation of Responsive Design

**Responsive design** ensures Fix-My-Ride works comfortably on both large desktop monitors and narrow mobile screens without horizontal scrolling:

- **Desktop (`> 768px`):**
  - `Header` spans across the top (`60px` min-height), with the mobile menu toggle button hidden.
  - `Sidebar` sits permanently visible on the left (`240px` fixed width).
  - Main content (`{children}`) fills the remaining horizontal width (`flex: 1; min-width: 0;`).
- **Mobile (`<= 768px`):**
  - `Header` stays visible at the top and reveals the hamburger menu button.
  - `Sidebar` collapses off-screen until toggled open as a slide-in overlay drawer.
  - Main content expands to use the full viewport width, and `.main-layout` sets `overflow-x: hidden`.

---

## 11. Component Hierarchy

```text
App
└── MainLayout (owns isSidebarOpen state)
    ├── Header (receives isSidebarOpen, onToggleSidebar)
    └── .main-layout-body
        ├── Sidebar (receives isOpen, onClose; displays Dashboard, Customers, Bookings)
        └── main.main-layout-content
            └── {children} (Fix-My-Ride Welcome Screen from App.jsx)
```

---

## 12. Files Created or Modified

- **Created:** `frontend/src/components/Header.jsx` — Top navigation bar with `TwoWheelerIcon`, **Fix-My-Ride** title, and mobile menu toggle `IconButton`.
- **Created:** `frontend/src/components/Header.css` — Component styles for `Header` using `global.css` variables and mobile media query.
- **Created:** `frontend/src/components/Sidebar.jsx` — Static navigation sidebar displaying `Dashboard` (selected), `Customers`, and `Bookings` with MUI icons and mobile close/backdrop support.
- **Created:** `frontend/src/components/Sidebar.css` — Component styles for `Sidebar`, active state highlight, and mobile slide-in drawer.
- **Modified:** `frontend/src/layouts/MainLayout.jsx` — Manages `isSidebarOpen` state and integrates `Header` and `Sidebar` while preserving `{children}`.
- **Modified:** `frontend/src/layouts/MainLayout.css` — Removed Commit 10 placeholder label rules and added `overflow-x: hidden` / `min-width: 0` for clean responsive sizing.
- **Modified:** `frontend/package.json` & `frontend/package-lock.json` *(exception)* — Installed `@mui/material`, `@emotion/react`, `@emotion/styled`, and `@mui/icons-material` because preflight inspection showed Material UI was not yet installed.
- **Modified:** `frontend/README.md` — Updated file list, dependency summary, and added Section 9 explaining `Header`, `Sidebar`, MUI usage, props/state communication, and responsive design.
- **Created:** `docs/commits/11-header-and-sidebar.md` — This learning guide documenting Commit 11.

*(Note: `frontend/src/App.jsx` did not need any changes because it already wraps the welcome screen in `<MainLayout>`.)*

---

## 13. Implementation Explanation

1. Ran preflight checks (`node -v`, `npm run build`, directory inspection) and confirmed Material UI was not yet installed in `frontend/package.json`.
2. Installed `@mui/material`, `@emotion/react`, `@emotion/styled`, and `@mui/icons-material`.
3. Created `Header.jsx` and `Header.css` with MUI `AppBar`, `Toolbar`, `IconButton`, `Typography`, `MenuIcon`, and `TwoWheelerIcon`.
4. Created `Sidebar.jsx` and `Sidebar.css` with MUI `List`, `ListItem`, `ListItemButton`, `ListItemIcon`, `ListItemText`, `DashboardIcon`, `PeopleIcon`, `EventNoteIcon`, and `CloseIcon`, highlighting `Dashboard` as the static selected item.
5. Updated `MainLayout.jsx` to hold `isSidebarOpen` state and pass props cleanly to `Header` and `Sidebar`, and simplified `MainLayout.css`.
6. Verified `npm run build` and local `npm run dev` compilation.

---

## 14. How to Run the Application

From `frontend/`:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`) in your browser.

---

## 15. How to Verify the Components

Run both build and dev verification from `frontend/`:

```bash
cd frontend
npm run build
npm run dev
```

Confirm that:

1. `npm run build` succeeds without errors.
2. `Header` displays the **Fix-My-Ride** brand, motorcycle icon, and mobile menu toggle button.
3. `Sidebar` displays **Dashboard** (visually active), **Customers**, and **Bookings** with icons.
4. Resizing the browser below `768px` hides the sidebar until the header menu button is clicked, and clicking the backdrop or close button closes it again.
5. The existing welcome screen remains rendered inside the main content area.

---

## 16. Expected Results

- `npm run build` completes with exit code `0` and bundles Material UI, `Header`, `Sidebar`, `MainLayout`, and `App` cleanly into `frontend/dist/`.
- Desktop views show the full top `Header`, the `240px` `Sidebar` on the left, and the Fix-My-Ride welcome card centered in the remaining space.
- Mobile views keep the `Header` visible at the top and allow toggling the slide-in `Sidebar` cleanly without horizontal page overflow.

---

## 17. What Has Been Completed

- Installed Material UI and Material UI Icons dependencies.
- Created `Header` and `Sidebar` components with dedicated CSS stylesheets.
- Integrated `Header` and `Sidebar` into `MainLayout` with single-source-of-truth toggle state.
- Preserved the Fix-My-Ride welcome screen in `App.jsx` without modification.
- Updated `frontend/README.md` and created `docs/commits/11-header-and-sidebar.md`.

---

## 18. What Is Intentionally Not Implemented

To keep Commit 11 focused strictly on the static visual navigation shell:

- No React Router installation or route configuration (`/` vs `/customers` vs `/bookings`) exists yet.
- Clicking `Dashboard`, `Customers`, or `Bookings` does not navigate or swap pages yet.
- No `DashboardPage`, `CustomersPage`, or `BookingsPage` components were created.
- No authentication, notifications, search bar, user profile, Axios configuration, or backend connection exists yet.

---

## 19. Suggested Git Commit Message

```text
feat(frontend): add header and sidebar
```

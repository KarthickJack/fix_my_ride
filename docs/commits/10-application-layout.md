# Commit 10: Create Application Layout

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 10 of 20

---

## 1. Commit Objective

The objective of **Commit 10** is to create the foundational `MainLayout` component (`frontend/src/layouts/MainLayout.jsx` and `frontend/src/layouts/MainLayout.css`) and integrate it into `App.jsx`.

`MainLayout` gives **Fix-My-Ride** a shared structural shell—header region, sidebar region, and main content area—so future pages can render inside one consistent frame without repeating layout code.

> **Important Note:** The header and sidebar areas inside `MainLayout` are **structural placeholder regions only**. Dedicated `Header` and `Sidebar` components will be built in **Commit 11**.

---

## 2. What an Application Layout Is

An **application layout** is a wrapper component that defines the outer frame shared across screens in a web application.

Think of a motorcycle service workshop's clipboard template: the top banner and side checklist stay in the same place on every sheet, while the middle area changes depending on whether you are looking at a customer profile, an inspection report, or an invoice.

In React, a layout component renders that persistent outer shell and leaves a flexible slot (`{children}`) in the middle for whatever page content is currently active.

---

## 3. Why a Management Application Needs a Shared Layout

Fix-My-Ride will eventually include multiple screens—such as Customers, Motorcycles, Service Bookings, Technician Assignments, and Invoices. Without a shared layout:

- Every single page would have to copy and paste the same header, sidebar, and responsive flex wrapper.
- Changing sidebar width or header spacing later would require editing every page individually.
- Switching between pages would feel inconsistent if margins or backgrounds differed slightly.

Using `MainLayout` centralizes the page skeleton in **one** place so every screen automatically inherits the same structure and responsive behavior.

---

## 4. Explanation of React Components

A **React component** is a reusable JavaScript function that accepts inputs (called **props**) and returns JSX describing what should appear on screen.

`MainLayout` is a regular React function component (`function MainLayout({ children }) { ... }`) whose job is strictly structural: arrange the header placeholder, sidebar placeholder, and main content area.

---

## 5. Explanation of the `children` Prop

In React, **`children`** is a special built-in prop that automatically holds whatever JSX you place **between** a component's opening and closing tags.

For example, when `App.jsx` writes:

```jsx
<MainLayout>
  <div className="welcome-page">...</div>
</MainLayout>
```

React passes `<div className="welcome-page">...</div>` into `MainLayout` as the `children` prop. Inside `MainLayout.jsx`, placing `{children}` inside `<main className="main-layout-content">{children}</main>` renders that inner JSX right inside the main content area.

---

## 6. Explanation of Semantic HTML Elements Used

Instead of building everything out of generic `<div>` tags, `MainLayout.jsx` uses meaningful **semantic HTML5 elements**:

- **`<header>` (`className="main-layout-header"`):** Marks the top banner/header region of the application.
- **`<aside>` (`className="main-layout-sidebar"`):** Marks the complementary side panel region reserved for future navigation.
- **`<main>` (`className="main-layout-content"`):** Marks the primary content landmark of the page where `{children}` renders.

Using `<header>`, `<aside>`, and `<main>` helps screen readers, assistive tools, and developers understand the page structure immediately. Because `<main>` now lives in `MainLayout.jsx`, `App.jsx` uses `<div className="welcome-page">` around `.welcome-card` so the page has only one `<main>` landmark.

---

## 7. Explanation of `MainLayout` Structure

`frontend/src/layouts/MainLayout.jsx` follows this clean hierarchy:

```text
MainLayout (.main-layout)
├── <header> (.main-layout-header)  — Header Placeholder
└── .main-layout-body
    ├── <aside> (.main-layout-sidebar) — Sidebar Placeholder
    └── <main> (.main-layout-content)
        └── {children}                 — Page / App content
```

Notice that both the header and sidebar are simple placeholder containers displaying small labels (`Header Placeholder` and `Sidebar Placeholder`). They are intentionally **not** full `Header` or `Sidebar` components yet.

---

## 8. Explanation of `MainLayout` CSS

`frontend/src/layouts/MainLayout.css` styles the layout using tokens from `src/styles/global.css`:

- **Full viewport height:** `.main-layout` sets `min-height: 100vh`, `display: flex`, `flex-direction: column`, and `background-color: var(--color-bg)`.
- **Header placeholder:** `.main-layout-header` uses `min-height: 60px`, `background-color: var(--color-surface)`, and a subtle bottom border (`var(--color-border)`).
- **Application body:** `.main-layout-body` uses `flex: 1` and `display: flex` so the sidebar and main content fill the remaining vertical space below the header.
- **Sidebar placeholder:** `.main-layout-sidebar` has a fixed `220px` width on wider screens (`flex-shrink: 0`), `background-color: var(--color-surface)`, and a right border (`var(--color-border)`).
- **Main content area:** `.main-layout-content` uses `flex: 1`, `display: flex`, `flex-direction: column`, and `min-width: 0` so inner content expands flexibly without overflowing horizontally.
- **Responsive rule (`@media (max-width: 768px)`):** On narrower screens, `.main-layout-body` stacks vertically (`flex-direction: column`), and `.main-layout-sidebar` spans `100%` width with a bottom border so the welcome content stays readable without horizontal scrolling.

---

## 9. Difference Between Layout and Page

| Concept | Folder | Purpose | Fix-My-Ride Example |
| :--- | :--- | :--- | :--- |
| **Layout** | `src/layouts/` | Provides the persistent outer frame (header, sidebar, content container) shared across screens. | `MainLayout.jsx` |
| **Page** | `src/pages/` | Supplies the specific screen content rendered inside a layout's `{children}` slot. | Future `CustomersPage.jsx` or `BookingsPage.jsx` |

---

## 10. How `App.jsx` Uses `MainLayout`

`frontend/src/App.jsx` imports `MainLayout` from `./layouts/MainLayout.jsx` and wraps the existing Fix-My-Ride welcome screen inside `<MainLayout>...</MainLayout>`.

- `MainLayout` owns the outer page shell (`<header>`, `<aside>`, `<main>`).
- `App.jsx` supplies the welcome card content as `children`.
- `App.css` was minimally updated (`min-height: 100vh` → `flex: 1` on `.welcome-page`) so the welcome card centers cleanly inside `.main-layout-content` without extending past the header.

---

## 11. Files Created or Modified

- **Created:** `frontend/src/layouts/MainLayout.jsx` — Reusable layout shell with header placeholder, sidebar placeholder, and `{children}` main content area.
- **Created:** `frontend/src/layouts/MainLayout.css` — Responsive flexbox styles for `MainLayout` using global CSS variables.
- **Modified:** `frontend/src/App.jsx` — Wraps the welcome screen inside `<MainLayout>` and replaces the inner `<main>` with `<div className="welcome-page">` to keep one `<main>` landmark.
- **Modified:** `frontend/src/App.css` — Changed `.welcome-page` from `min-height: 100vh` to `flex: 1` so it centers cleanly inside `.main-layout-content`.
- **Modified:** `frontend/README.md` — Added documentation explaining application layouts, the `children` prop, layout vs. page components, and separate layout CSS.
- **Created:** `docs/commits/10-application-layout.md` — This learning guide documenting Commit 10.

---

## 12. Implementation Explanation

1. Inspected `App.jsx`, `App.css`, `src/layouts/`, and `src/styles/global.css`.
2. Built `MainLayout.jsx` with semantic `<header>`, `<aside>`, and `<main>` regions and simple structural placeholder labels.
3. Styled `MainLayout.css` using CSS flexbox and shared variables (`--color-bg`, `--color-surface`, `--color-border`, `--color-text-secondary`, `--spacing-md`, `--spacing-lg`, `--font-weight-medium`) with a responsive breakpoint at `768px`.
4. Wrapped the existing welcome card inside `<MainLayout>` in `App.jsx` and adjusted `.welcome-page` height sizing in `App.css` so the welcome card stays centered within the main region.
5. Updated `frontend/README.md` and created this commit guide.

---

## 13. How to Run the Application

From the `frontend/` directory:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`) in your web browser.

---

## 14. How to Verify the Layout

Run the production build from `frontend/`:

```bash
cd frontend
npm run build
```

Verify that:

1. `npm run build` succeeds with zero errors.
2. All layout styles and `MainLayout` JSX compile cleanly into `frontend/dist/`.
3. Running `npm run dev` serves `App.jsx` wrapped inside `MainLayout` with the header placeholder, sidebar placeholder, and Fix-My-Ride welcome screen inside the main content area.

---

## 15. Expected Results

- `npm run build` exits with code `0` and bundles HTML, CSS (including `MainLayout.css` and `App.css`), and JS into `frontend/dist/`.
- On desktop widths (`> 768px`), the header placeholder spans the top, the sidebar placeholder sits on the left (`220px`), and the Fix-My-Ride welcome card appears centered in the flexible main content region.
- On narrower screens (`<= 768px`), the sidebar placeholder stacks cleanly above the main content area.

---

## 16. What Has Been Completed

- Created `frontend/src/layouts/MainLayout.jsx` and `frontend/src/layouts/MainLayout.css`.
- Integrated `MainLayout` into `frontend/src/App.jsx` with the existing welcome screen rendered via `children`.
- Preserved clean separation between layout structure, global styles, and root `App` content.
- Documented `MainLayout` and React's `children` prop in `frontend/README.md` and `docs/commits/10-application-layout.md`.
- Verified `npm run build` completes cleanly.

---

## 17. What Is Intentionally Not Implemented

To keep Commit 10 focused strictly on the structural layout shell:

- No `Header.jsx` or `Sidebar.jsx` components were created (Commit 11).
- No navigation menus, links, or React Router configuration exist yet.
- No dashboard pages, Material UI components, Axios requests, or backend integration exist yet.

---

## 18. Suggested Git Commit Message

```text
feat(frontend): create application layout
```

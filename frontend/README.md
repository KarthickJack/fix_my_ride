# Fix-My-Ride Frontend

This directory contains the **React + Vite (JavaScript)** frontend application for **Fix-My-Ride**, a Motorcycle Service Management System.

> **Current Status:** Phase 1 — Foundation (Commit 11).  
> The React + Vite application skeleton, organized `src/` folder structure, global CSS foundation, `MainLayout`, and Material UI-based `Header` and `Sidebar` navigation shell are configured. Future frontend libraries (**Axios**, **React Router**) and feature modules will be added in upcoming commits.

---

## 1. What is React?

**React** is a JavaScript library for building user interfaces out of small, reusable pieces called **components** (such as pages, forms, cards, and buttons). Instead of manually updating HTML elements one by one, you describe what the screen should look like for a given state, and React updates the browser DOM efficiently.

## 2. What is Vite?

**Vite** is a modern frontend build tool and local development server. During development, it starts almost instantly and updates your browser immediately when you edit a file (Hot Module Replacement). When you are ready to deploy, Vite bundles and optimizes your JavaScript, CSS, and assets into static files.

## 3. Why We Use React with Vite

- **Fast startup and instant updates:** Vite serves modern ES modules directly during development so edits appear in milliseconds.
- **Simple configuration:** The official React + Vite JavaScript setup works out of the box with minimal boilerplate (`vite.config.js`).
- **Clean production output:** Vite uses Rollup under the hood to generate an optimized `dist/` folder for deployment.

## 4. What Each File Does

- `index.html` — The single HTML page served to the browser. Contains `<div id="root"></div>` where React mounts and loads `/src/main.jsx`.
- `package.json` — Lists project metadata, dependencies (`react`, `react-dom`, `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`), devDependencies (`vite`, `@vitejs/plugin-react`), and npm scripts (`dev`, `build`, `preview`).
- `package-lock.json` — Records exact installed package versions so everyone gets identical installs.
- `vite.config.js` — Vite configuration enabling the official React plugin (`@vitejs/plugin-react`).
- `public/favicon.svg` — Static icon file served directly at `/favicon.svg`.
- `src/main.jsx` — The JavaScript entry point that finds `#root` in `index.html` and renders the `<App />` component inside `<StrictMode>`.
- `src/App.jsx` — The root React component currently displaying the minimal Fix-My-Ride welcome screen.
- `src/App.css` — Component-level styles specific to the root `App` welcome screen, consuming shared CSS variables.
- `src/index.css` — Global browser defaults (box-sizing, body margin, base font/colors, `#root` minimum height) that imports `src/styles/global.css`.
- `src/styles/global.css` — Shared `:root` CSS custom properties (colors, typography, spacing, border radius, and shadows).
- `src/layouts/MainLayout.jsx` — Reusable structural shell managing sidebar open/close state and composing `Header`, `Sidebar`, and the `{children}` main content area.
- `src/layouts/MainLayout.css` — Responsive flexbox styles specific to `MainLayout`, consuming shared CSS variables.
- `src/components/Header.jsx` — Reusable top application bar built with Material UI showing the Fix-My-Ride title, brand icon, and mobile sidebar toggle button.
- `src/components/Header.css` — Component-specific styling for `Header`.
- `src/components/Sidebar.jsx` — Reusable navigation sidebar built with Material UI displaying static menu items (`Dashboard`, `Customers`, `Bookings`) and mobile drawer behavior.
- `src/components/Sidebar.css` — Component-specific styling for `Sidebar` and its responsive mobile drawer/backdrop.
- `src/assets/`, `src/components/`, `src/layouts/`, `src/pages/`, `src/services/`, `src/styles/` — Organized source directories prepared for upcoming application growth (unused directories currently hold `.gitkeep` markers so Git tracks them).

## 5. Source Folder Organization (`src/`)

### Why We Organize Frontend Code

Keeping all React files directly inside `src/` quickly becomes hard to navigate as features grow. Organizing `src/` into clear, purpose-based folders ensures every developer knows where to place new code and where to find existing files without guessing.

### Folder Responsibilities

- **`src/assets/`:** Static media files imported directly by React components (images, icons, logos, illustrations).
- **`src/components/`:** Reusable UI building blocks used across multiple screens (such as future `Button`, `InputField`, `StatusBadge`, or `DataTable` components).
- **`src/layouts/`:** Application-wide structural page shells (such as future `MainLayout` or `DashboardLayout` wrappers).
- **`src/pages/`:** Individual route-level application pages (such as future `DashboardPage`, `CustomersPage`, or `BookingsPage`).
- **`src/services/`:** External communication and API logic (such as future Axios setup, customer API requests, and booking API requests).
- **`src/styles/`:** Shared CSS files and global styling resources as styling grows beyond `index.css` and `App.css`.

### Difference Between `components/`, `layouts/`, and `pages/`

- **Components** are small, reusable UI pieces (like a status badge or form input) that do not represent a whole screen by themselves.
- **Layouts** define the outer frame shared across screens (such as navigation headers, sidebars, and content wrappers).
- **Pages** represent full views for a specific screen or route, combining layouts and reusable components to deliver a user workflow.

### Why `services/` Are Separated from UI Components

Separating API communication into `src/services/` keeps React components focused purely on presentation and user interaction. If backend endpoints or HTTP configuration change later, updates happen in one service module rather than across multiple UI files.

### Where Shared Styles and Assets Belong

- **Shared styles** go into `src/styles/` once styles expand beyond the initial `index.css` (global base styles) and `App.css` (root welcome styles).
- **Imported assets** (processed by Vite when imported in JSX/CSS) belong in `src/assets/`, whereas static files served directly at fixed root paths (like `/favicon.svg`) remain in `public/`.

## 6. Application Entry Point and Startup Flow

### How a React Application Starts

1. The browser requests and loads `index.html`.
2. `index.html` defines an empty `<div id="root"></div>` container and loads `/src/main.jsx` as an ES module.
3. `src/main.jsx` executes, loads global styles (`./index.css`), locates `#root` in the DOM, and mounts the `<App />` component inside `<StrictMode>` using `createRoot`.
4. `src/App.jsx` renders the top-level Fix-My-Ride interface inside `#root`.

### Roles of Each Startup File and API

- **`index.html`:** The single HTML shell served to the browser. It sets the page title (`Fix-My-Ride`), provides `<div id="root"></div>`, and loads `/src/main.jsx`.
- **`src/main.jsx`:** The JavaScript entry point solely responsible for bootstrapping and mounting React into the DOM (no UI layout or business logic).
- **`createRoot` (from `react-dom/client`):** Attaches a React root controller to `<div id="root"></div>` and renders the React component tree via `.render(...)`.
- **`React.StrictMode` (`StrictMode` from `react`):** A development-only wrapper that performs extra checks to catch potential issues early without rendering visible DOM elements or affecting production builds.
- **`src/App.jsx`:** The root React component that defines the top-level UI (currently the Fix-My-Ride welcome screen) and imports component-level styles (`./App.css`).

### How These Files Work Together

`index.html` provides the `#root` anchor and loads `main.jsx`; `main.jsx` initializes React and mounts `<App />` into `#root`; and `App.jsx` supplies the UI rendered to the user.

## 7. Global CSS and Design Variables

### What Global CSS Is

**Global CSS** defines shared styling rules and design values that apply across the whole application (such as resetting browser margins, setting default typography, and defining brand colors) instead of repeating them inside every component.

### What CSS Custom Properties Are

**CSS custom properties** (CSS variables) are reusable named values declared inside `:root` (for example, `--color-primary: #2563eb;`). Because `:root` targets the top-level HTML element, those variables are available throughout the entire application.

### Why Design Variables Are Useful

- **Consistency:** Every screen uses the exact same colors, spacing, and border radii.
- **Easy maintenance:** Updating a brand color or spacing token in `src/styles/global.css` updates every rule that references it.
- **Readability:** Names like `var(--color-surface)` or `var(--spacing-lg)` explain intent better than raw hex or pixel numbers.

### Difference Between `global.css`, `index.css`, and `App.css`

- **`src/styles/global.css`:** Stores shared `:root` design tokens (colors, typography, spacing, border radius, shadows) with no element selectors.
- **`src/index.css`:** Imports `./styles/global.css` and sets browser-wide resets and defaults (`box-sizing`, `body` font/colors/margin, `#root` min-height).
- **`src/App.css`:** Styles only the root `App.jsx` welcome screen while referencing variables from `global.css`.

### Basic CSS Inheritance

In CSS, properties like `font-family`, `color`, and `line-height` set on `body` automatically **inherit** down to child elements inside `#root`, so headings and paragraphs share consistent defaults unless a more specific rule overrides them.

### Using a CSS Variable with `var()`

Define a variable in `:root` (`src/styles/global.css`) and apply it anywhere with `var(...)`:

```css
/* In src/styles/global.css */
:root {
  --color-primary: #2563eb;
  --spacing-lg: 24px;
}

/* In a component stylesheet */
.welcome-subtitle {
  margin-bottom: var(--spacing-lg);
  color: var(--color-primary);
}
```

## 8. Application Layout and `children` Props

### What an Application Layout Is

An **application layout** is a reusable wrapper component that provides the consistent outer structure of an app—such as a header bar, sidebar area, and main content container—while letting each screen supply its own inner content.

### Why Multiple Pages Share a Common Layout

Sharing `MainLayout` across future pages (Customers, Motorcycles, Bookings, Invoices) avoids duplicating header/sidebar markup on every screen, keeps spacing and backgrounds uniform, and lets layout adjustments happen in a single place.

### What React `children` Props Are and How `MainLayout` Uses Them

In React, `children` is a built-in prop containing whatever JSX is nested inside `<MainLayout>...</MainLayout>`. `MainLayout` receives `{ children }` and renders `{children}` inside `<main className="main-layout-content">`.

```jsx
// Simple example of a layout component receiving children
function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <header className="main-layout-header">Header Placeholder</header>
      <main className="main-layout-content">{children}</main>
    </div>
  );
}

// Usage in App.jsx
<MainLayout>
  <p>Welcome to Fix-My-Ride.</p>
</MainLayout>
```

### Difference Between Layout Components and Page Components

- **Layout components** (`src/layouts/`) define the shared outer frame around screens.
- **Page components** (`src/pages/`) define the screen-specific content rendered inside that frame's `{children}` slot.

### Why Layout-Specific CSS Is Kept Separate

Keeping `MainLayout.css` next to `MainLayout.jsx` separates structural page-shell styling (flex layout, header/sidebar dimensions, responsive breakpoints) from `global.css` tokens and page/component styles like `App.css`.

## 9. Header, Sidebar, and Responsive Navigation

### What `Header` and `Sidebar` Are

- **Header (`src/components/Header.jsx`):** The top bar that stays visible across the application, displaying the **Fix-My-Ride** brand identity/icon and a mobile menu toggle button.
- **Sidebar (`src/components/Sidebar.jsx`):** The side navigation panel displaying top-level sections (`Dashboard`, `Customers`, `Bookings`) with icons and clear active-item highlighting. *(In Commit 11, these items are static visual placeholders—routing is added in Commit 12.)*

### Why Reusable Components Are Useful

Separating `Header` and `Sidebar` into `src/components/` keeps `MainLayout.jsx` clean and modular. Instead of crowding one file with AppBar, icon, and list markup, each component owns one clear job.

### How Material UI Components Are Used

Material UI (`@mui/material` and `@mui/icons-material`) supplies accessible building blocks (`AppBar`, `Toolbar`, `IconButton`, `Typography`, `List`, `ListItemButton`, `ListItemIcon`, `ListItemText`) and standard vector icons (`MenuIcon`, `TwoWheelerIcon`, `DashboardIcon`, `PeopleIcon`, `EventNoteIcon`, `CloseIcon`), styled alongside our `global.css` tokens in `Header.css` and `Sidebar.css`.

### How Props Communicate Between Components and How Sidebar State Works

`MainLayout` owns a single boolean state `isSidebarOpen` (defaulting to `false`) via `useState(false)`:

- `MainLayout` passes `isSidebarOpen` and `onToggleSidebar` to `Header`. Clicking the menu button triggers `onToggleSidebar`, toggling `isSidebarOpen`.
- `MainLayout` passes `isOpen={isSidebarOpen}` and `onClose={handleCloseSidebar}` to `Sidebar`. On mobile screens, `Sidebar` slides open when `isOpen` is `true` and closes when the backdrop or close button triggers `onClose`.

### What Responsive Design Means

**Responsive design** ensures the interface adapts smoothly to different screen widths:

- **Desktop (`> 768px`):** The header spans the top, the `240px` sidebar stays visible on the left, and main content fills the remaining width.
- **Mobile (`<= 768px`):** The header remains visible with a menu toggle button, while the sidebar collapses off-screen until opened as an overlay drawer—preventing horizontal overflow.

## 10. How to Install Dependencies

From the `frontend/` directory:

```bash
npm install
```

*(Note: Vite 8 requires a modern Node.js version such as Node 20.19+ or 22.12+. If your default shell uses an older Node version via `nvm`, switch to a supported version first.)*

## 11. How to Start the Development Server

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) where you can open the app in your browser.

## 12. How to Build the Application

To generate an optimized production build inside `frontend/dist/`:

```bash
npm run build
```

## 13. How to Preview the Production Build

To serve and test the built `dist/` files locally:

```bash
npm run preview
```

---

## Planned Future Technologies

The following technologies are **not installed yet** and will be introduced in future commits:

- **Axios** for communicating with the FastAPI backend API
- **React Router** for multi-page client-side navigation

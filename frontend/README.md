# Fix-My-Ride Frontend

This directory contains the **React + Vite (JavaScript)** frontend application for **Fix-My-Ride**, a Motorcycle Service Management System.

> **Current Status:** Phase 1 — Foundation (Commit 08).  
> The minimal React + Vite application skeleton, organized `src/` folder structure (`assets/`, `components/`, `layouts/`, `pages/`, `services/`, `styles/`), and clearly separated application entry point (`index.html`, `main.jsx`, `App.jsx`) are verified and configured. Future frontend libraries (**Material UI**, **Axios**, **React Router**) and feature modules will be added in upcoming commits.

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
- `package.json` — Lists project metadata, dependencies (`react`, `react-dom`), devDependencies (`vite`, `@vitejs/plugin-react`), and npm scripts (`dev`, `build`, `preview`).
- `package-lock.json` — Records exact installed package versions so everyone gets identical installs.
- `vite.config.js` — Vite configuration enabling the official React plugin (`@vitejs/plugin-react`).
- `public/favicon.svg` — Static icon file served directly at `/favicon.svg`.
- `src/main.jsx` — The JavaScript entry point that finds `#root` in `index.html` and renders the `<App />` component inside `<StrictMode>`.
- `src/App.jsx` — The root React component currently displaying the minimal Fix-My-Ride welcome screen.
- `src/App.css` — Component-level styles for the welcome page layout and card.
- `src/index.css` — Minimal global CSS rules (box-sizing, body margin, default font, and background color).
- `src/assets/`, `src/components/`, `src/layouts/`, `src/pages/`, `src/services/`, `src/styles/` — Organized source directories prepared for upcoming application growth (each currently contains a `.gitkeep` marker so Git tracks empty folders).

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

## 7. How to Install Dependencies

From the `frontend/` directory:

```bash
npm install
```

*(Note: Vite 8 requires a modern Node.js version such as Node 20.19+ or 22.12+. If your default shell uses an older Node version via `nvm`, switch to a supported version first.)*

## 8. How to Start the Development Server

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) where you can open the app in your browser.

## 9. How to Build the Application

To generate an optimized production build inside `frontend/dist/`:

```bash
npm run build
```

## 10. How to Preview the Production Build

To serve and test the built `dist/` files locally:

```bash
npm run preview
```

---

## Planned Future Technologies

The following technologies are **not installed yet** and will be introduced in future commits:

- **Material UI (MUI)** for pre-built UI components
- **Axios** for communicating with the FastAPI backend API
- **React Router** for multi-page client-side navigation

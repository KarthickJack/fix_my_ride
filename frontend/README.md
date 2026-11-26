# Fix-My-Ride Frontend

This directory contains the **React + Vite (JavaScript)** frontend application for **Fix-My-Ride**, a Motorcycle Service Management System.

> **Current Status:** Phase 1 — Foundation (Commit 05).  
> Only the minimal React + Vite application skeleton is configured right now. Future frontend libraries (**Material UI**, **Axios**, **React Router**) and feature modules will be added in upcoming commits.

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

## 5. How to Install Dependencies

From the `frontend/` directory:

```bash
npm install
```

*(Note: Vite 8 requires a modern Node.js version such as Node 20.19+ or 22.12+. If your default shell uses an older Node version via `nvm`, switch to a supported version first.)*

## 6. How to Start the Development Server

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) where you can open the app in your browser.

## 7. How to Build the Application

To generate an optimized production build inside `frontend/dist/`:

```bash
npm run build
```

## 8. How to Preview the Production Build

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

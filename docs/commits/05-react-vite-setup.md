# Commit 05: Initialize React + Vite Application

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 05 of 20

---

## 1. Objective

The objective of **Commit 05** is to initialize the **Fix-My-Ride** frontend using **React**, **Vite**, and **JavaScript**.

This is the first commit in the repository that introduces runnable application code. Rather than building dashboards, navigation bars, or API integrations prematurely, our goal here is small and focused: set up a clean, minimal React application that runs locally in development mode and builds cleanly for production.

---

## 2. What is React?

**React** is a JavaScript library created for building interactive user interfaces (UIs).

Instead of writing one giant HTML file and manually changing text or elements with `document.querySelector(...)`, React lets you break the screen into **components**—small, self-contained JavaScript functions that return **JSX** (HTML-like syntax inside JavaScript).

For example, in `App.jsx`, a single function `App()` describes the Fix-My-Ride welcome card, and React handles rendering it into the web page.

---

## 3. What is Vite?

**Vite** (pronounced *"veet"*, French for "fast") is a frontend build tool and local development server.

Browsers cannot directly understand JSX syntax or bundle dozens of JavaScript modules cleanly on their own without tooling. Vite handles two essential jobs:

1. **Development Server (`npm run dev`):** Serves your code locally with near-instant startup and **Hot Module Replacement (HMR)**—when you save a file, the browser updates automatically without losing your place.
2. **Production Bundler (`npm run build`):** Compiles, bundles, and minifies your React, JavaScript, and CSS files into static files inside `dist/` ready to host on any web server.

---

## 4. Why React and Vite?

We chose **React + Vite (JavaScript)** for Fix-My-Ride because:

- **Speed and simplicity:** Vite starts in fractions of a second and requires very little configuration (`vite.config.js` is only a few lines).
- **Clean JavaScript learning path:** Starting with plain JavaScript (`.jsx`) avoids TypeScript complexity while learning React fundamentals.
- **Strong ecosystem fit:** React pairs naturally with Material UI, Axios, and React Router, which we will introduce in later commits only when needed.

---

## 5. Understanding the Project Structure

Inside `frontend/`, we now have a clean initial structure based on the official Vite React JavaScript template, with unused demo content and assets removed:

```text
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

*(Note: `node_modules/` and `dist/` are created locally when you run `npm install` and `npm run build`, and are ignored by our root `.gitignore`.)*

### What Each File Does

- **`public/favicon.svg`:** Static icon served directly at `/favicon.svg` without bundling.
- **`index.html`:** The entry HTML page loaded by the browser. It defines `<div id="root"></div>` and loads `/src/main.jsx`.
- **`src/main.jsx`:** The JavaScript entry point that mounts React into `#root`.
- **`src/App.jsx`:** The root React component rendering the welcome page.
- **`src/App.css`:** Component-specific styles for the welcome page and card.
- **`src/index.css`:** Global base styles applied across the whole page.
- **`package.json`:** Declares project dependencies and npm scripts (`dev`, `build`, `preview`).
- **`package-lock.json`:** Locks exact dependency versions for reproducible installs.
- **`vite.config.js`:** Configures Vite with `@vitejs/plugin-react` so Vite understands JSX and React Fast Refresh.
- **`README.md`:** Frontend-specific setup and command guide.

*(Planned folders such as `components/`, `pages/`, `layouts/`, and `services/` are intentionally not created yet until actual features require them.)*

---

## 6. Understanding `main.jsx`

`frontend/src/main.jsx` is the starting point where JavaScript connects React to the HTML page:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Mount the root React component into the #root element in index.html.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Step by step:

1. **`createRoot(document.getElementById('root'))`** finds the `<div id="root"></div>` element inside `index.html` and creates a React root inside it.
2. **`.render(...)`** tells React what component tree to display inside that root.
3. **`<StrictMode>`** is a development-only wrapper that warns you about potential React mistakes without affecting production builds.
4. **`<App />`** is our main application component imported from `./App.jsx`.

---

## 7. Understanding `App.jsx`

`frontend/src/App.jsx` defines the main `App` component:

```jsx
import './App.css';

function App() {
  return (
    <main className="welcome-page">
      <section className="welcome-card">
        <h1 className="welcome-title">Fix-My-Ride</h1>
        <p className="welcome-subtitle">Motorcycle Service Management System</p>
        <p className="welcome-message">Welcome to Fix-My-Ride.</p>
        <p className="welcome-description">
          Your motorcycle service management platform.
        </p>
      </section>
    </main>
  );
}

export default App;
```

Notice how `App` is simply a JavaScript function returning JSX. In React, HTML's `class` attribute is written as `className` because `class` is a reserved keyword in JavaScript.

---

## 8. Understanding CSS Files

We keep styling separated into two focused CSS files:

- **`src/index.css` (Global Styles):** Sets universal defaults once for the entire application:
  - `box-sizing: border-box` so padding and borders never unexpectedly inflate element widths.
  - `margin: 0` on `body` to remove the browser's default outer spacing.
  - A clean system `font-family`, readable `line-height`, and light neutral background (`#f5f7fa`).
- **`src/App.css` (Component Styles):** Styles the welcome screen using kebab-case class names (`.welcome-page`, `.welcome-card`, `.welcome-title`, `.welcome-subtitle`, `.welcome-message`, `.welcome-description`) to center a clean white card on screen.

---

## 9. Understanding `package.json`

`frontend/package.json` is the manifest for the frontend project:

- **`"type": "module"`:** Tells Node.js that `.js` files (like `vite.config.js`) use modern ES module `import` / `export` syntax.
- **`"scripts"`:** Shortcut commands you run with `npm run <name>`:
  - `"dev": "vite"` — Starts the local development server.
  - `"build": "vite build"` — Creates the production bundle in `dist/`.
  - `"preview": "vite preview"` — Serves the built `dist/` folder locally to test the production output.
- **`"dependencies"`:** Packages required by the running app in the browser (`react`, `react-dom`).
- **`"devDependencies"`:** Tools needed only during development and building (`vite`, `@vitejs/plugin-react`).

---

## 10. Understanding `npm` and Node.js

- **Node.js** is the JavaScript runtime installed on your computer that lets JavaScript tools (like Vite) run outside a web browser.
- **npm** (Node Package Manager) comes with Node.js. It reads `package.json`, downloads the listed libraries from the npm registry into `node_modules/`, writes exact versions into `package-lock.json`, and runs scripts like `npm run dev`.

---

## 11. How to Run the Application

Navigate to the `frontend/` directory and start the development server:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (by default `http://localhost:5173`) in your browser.

### Development Server vs. Production Build

- **Development Server (`npm run dev`):** Runs locally on your machine, compiles files on demand, preserves readable source maps, and reloads changes instantly as you code. It is **not** meant for public deployment.
- **Production Build (`npm run build`):** Bundles, optimizes, and minifies all HTML, CSS, and JavaScript into static files in `frontend/dist/`. Those static files load fast for real users and can be served by any web server (and tested locally with `npm run preview`).

---

## 12. How to Build the Application

From the `frontend/` directory, run:

```bash
npm run build
```

To preview the production output locally:

```bash
npm run preview
```

---

## 13. Testing and Verification

Verify the frontend setup from `frontend/` with these steps:

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start and verify the development server:**
   ```bash
   npm run dev
   ```
   Confirm Vite starts cleanly with no compilation errors and serves the welcome page HTML/app.
3. **Run the production build:**
   ```bash
   npm run build
   ```
   Confirm Vite generates the `dist/` bundle cleanly without errors or warnings.

---

## 14. Expected Output

- `npm install` finishes cleanly, creating `node_modules/` (ignored by Git) and `package-lock.json`.
- `npm run dev` prints a local server URL (`http://localhost:5173`) and serves the React app, displaying:
  - **Fix-My-Ride**
  - **Motorcycle Service Management System**
  - **Welcome to Fix-My-Ride.**
  - **Your motorcycle service management platform.**
- `npm run build` completes with exit code `0` and outputs bundled static files inside `frontend/dist/`.

---

## 15. Files Created or Modified

- Created `frontend/index.html`
- Created `frontend/package.json`
- Created `frontend/package-lock.json`
- Created `frontend/vite.config.js`
- Created `frontend/public/favicon.svg`
- Created `frontend/src/main.jsx`
- Created `frontend/src/App.jsx`
- Created `frontend/src/App.css`
- Created `frontend/src/index.css`
- Updated `frontend/README.md`
- Created `docs/commits/05-react-vite-setup.md`

---

## 16. What We Accomplished

- Initialized a clean React + Vite + JavaScript application inside `frontend/`.
- Removed unused demonstration files and assets.
- Built a minimal, clean welcome screen for Fix-My-Ride.
- Verified local dependency installation, development server startup, and production build output.
- Documented the frontend setup in both `frontend/README.md` and this commit guide.

---

## 17. What We Have Not Implemented

To keep Commit 05 focused strictly on React + Vite setup:

- No Material UI, Axios, or React Router packages are installed.
- No TypeScript configuration is included.
- No dashboard, navigation header, sidebar, or feature pages (`components/`, `pages/`, `layouts/`, `services/`) exist yet.
- No FastAPI backend, API calls, or database connections exist yet.

---

## 18. Git Commit Message

Suggested commit message for this step:

```text
feat(frontend): initialize vite react app
```

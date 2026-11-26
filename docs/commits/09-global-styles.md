# Commit 09: Establish Global Styles

**Phase:** Phase 1 — Foundation  
**Increment:** Commit 09 of 20

---

## 1. Commit Objective

The objective of **Commit 09** is to establish a consistent global CSS foundation for the **Fix-My-Ride** React application.

By defining reusable CSS variables (colors, typography, spacing, border radius, and shadows) and clean browser-wide defaults now, every future page and component will share the same visual language without duplicating raw hex codes or magic pixel numbers.

> **Important Note:** This commit sets up the **global styling foundation** only. No new pages, dashboards, or visual redesigns are introduced—the existing welcome screen keeps the exact same look and layout.

---

## 2. Why Global Styling Is Needed

Imagine building ten screens in Fix-My-Ride—customers, motorcycles, bookings, inspections, and invoices—and copying `#2563eb`, `24px`, and `12px` by hand into every CSS file. Later, if you decide to adjust the brand blue or standard card padding, you would have to hunt down and edit dozens of files.

A global CSS foundation solves this by:

- **Creating a single source of truth:** Shared colors, fonts, spacing, and borders live in one central place (`src/styles/global.css`).
- **Keeping screens consistent:** Every button, card, and heading naturally matches across the whole app.
- **Reducing duplicate CSS:** Common browser resets (`box-sizing`, `margin: 0`, `#root` height) are written once in `src/index.css`.

---

## 3. Explanation of CSS Custom Properties

**CSS custom properties** (often called **CSS variables**) are named values you define inside CSS—usually inside `:root`—and reuse anywhere else in your stylesheets with `var(--variable-name)`.

Why `:root`? In a web page, `:root` matches the top-level `<html>` element, so variables declared inside `:root` become available to every element and component on the page.

```css
:root {
  --color-primary: #2563eb;
  --spacing-lg: 24px;
}

.example-card {
  border-color: var(--color-primary);
  padding: var(--spacing-lg);
}
```

---

## 4. Explanation of Color Variables

`frontend/src/styles/global.css` defines a restrained, professional color palette tailored for a workshop management platform:

- **`--color-primary` (`#2563eb`) & `--color-primary-hover` (`#1d4ed8`):** Main brand blue used for primary highlights, active accents, and interactive hover states.
- **`--color-secondary` (`#475569`):** Neutral slate accent for secondary UI elements.
- **`--color-bg` (`#f5f7fa`):** Soft light-gray page background that keeps long work sessions easy on the eyes.
- **`--color-surface` (`#ffffff`):** Clean white background for cards, panels, and content containers.
- **`--color-text-heading` (`#111827`), `--color-text-primary` (`#1f2937`), & `--color-text-secondary` (`#4b5563`):** High-contrast dark charcoal for headings and body text, plus muted gray for supporting descriptions.
- **`--color-border` (`#e5e7eb`):** Subtle neutral border color for cards and dividers.
- **`--color-success` (`#16a34a`), `--color-warning` (`#d97706`), & `--color-error` (`#dc2626`):** Semantic status colors reserved for future workshop feedback such as *Completed*, *Pending Approval*, or *Validation Error*.

---

## 5. Explanation of Typography Variables

Consistent typography keeps text legible across every screen without relying on external web fonts:

- **`--font-family-base`:** Uses the operating system's native UI font stack (`system-ui`, `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`, `sans-serif`), which loads instantaneously with zero network downloads.
- **`--font-size-base` (`16px`):** Standard readable base body font size.
- **`--font-weight-medium` (`500`), `--font-weight-semibold` (`600`), & `--font-weight-bold` (`700`):** Predictable weights for subtitles, emphasis labels, and headings.
- **`--line-height-base` (`1.5`):** Comfortable vertical spacing between lines of text.

---

## 6. Explanation of Spacing Variables

Consistent spacing keeps layouts tidy and balanced:

- **`--spacing-sm` (`8px`):** Tight gaps between closely related elements (such as a heading and its subtitle).
- **`--spacing-md` (`16px`):** Standard inner spacing and form field gaps.
- **`--spacing-lg` (`24px`):** Section padding and outer page breathing room.
- **`--spacing-xl` (`32px`):** Generous container padding (such as card horizontal padding).

---

## 7. Explanation of Border Radius and Shadows

- **Border Radius:**
  - `--radius-sm` (`6px`) for small controls or badges.
  - `--radius-md` (`8px`) for medium inputs and containers.
  - `--radius-lg` (`12px`) for prominent cards like `.welcome-card`.
- **Shadows:**
  - `--shadow-sm` (`0 1px 2px rgba(0, 0, 0, 0.05)`) for subtle elevation.
  - `--shadow-md` (`0 4px 16px rgba(0, 0, 0, 0.06)`) for raised cards on the page background.

---

## 8. Difference Between Global CSS and Component-Specific CSS

| Type | Scope | Where It Lives | Example in Fix-My-Ride |
| :--- | :--- | :--- | :--- |
| **Global CSS** | Shared tokens and browser-wide defaults affecting the entire app. | `src/styles/global.css` and `src/index.css` | `:root` variables, `box-sizing: border-box`, `body` font and background, `#root` min-height. |
| **Component-Specific CSS** | Visual rules targeting one specific component or screen. | Next to the component (e.g., `src/App.css`) | `.welcome-page`, `.welcome-card`, `.welcome-title` styling the welcome screen. |

---

## 9. Explanation of `global.css`

`frontend/src/styles/global.css` contains only `:root` design tokens (colors, typography, spacing, border radius, and shadows). It intentionally avoids styling specific HTML tags or component classes so it never introduces unintended side effects.

---

## 10. Explanation of `index.css`

`frontend/src/index.css` imports `./styles/global.css` and applies clean browser defaults:

- `*, *::before, *::after { box-sizing: border-box; }` so padding and borders stay inside declared widths.
- `body` resets default browser `margin: 0` and inherits `--font-family-base`, `--font-size-base`, `--line-height-base`, `--color-text-primary`, and `--color-bg`.
- `#root { min-height: 100vh; }` ensures the React mount container spans at least the full viewport height.

Because `font-family` and `color` are set on `body`, child elements inside `#root` automatically inherit them through normal CSS inheritance unless overridden.

---

## 11. Explanation of `App.css`

`frontend/src/App.css` remains focused strictly on styling the welcome screen rendered by `App.jsx` (`.welcome-page`, `.welcome-card`, `.welcome-title`, `.welcome-subtitle`, `.welcome-message`, `.welcome-description`).

Instead of repeating raw values like `#ffffff`, `#2563eb`, `12px`, or `24px`, `App.css` now references `var(--color-surface)`, `var(--color-primary)`, `var(--radius-lg)`, and `var(--spacing-lg)` while keeping the exact same visual appearance.

---

## 12. How CSS Imports Work

Our CSS import chain flows strictly in **one direction** with no circular imports:

1. **`src/main.jsx`** imports **`./index.css`** and **`./App.jsx`**.
2. **`src/index.css`** imports **`./styles/global.css`** at the top, making all `:root` variables available before any page or component styles load.
3. **`src/App.jsx`** imports **`./App.css`**, which uses the variables defined in `global.css`.

`global.css` never imports `index.css` or `App.css`, preventing circular dependencies.

---

## 13. Files Created or Modified

- **Created:** `frontend/src/styles/global.css` — Shared CSS custom properties for colors, typography, spacing, border radii, and shadows.
- **Modified:** `frontend/src/index.css` — Imports `./styles/global.css`, applies CSS variables to `body`, and sets `#root { min-height: 100vh; }`.
- **Modified:** `frontend/src/App.css` — Updated welcome screen styles to consume CSS custom properties from `global.css` without changing the layout or appearance.
- **Modified:** `frontend/README.md` — Added documentation explaining global CSS, CSS custom properties, inheritance, `var()`, and the roles of `global.css`, `index.css`, and `App.css`.
- **Created:** `docs/commits/09-global-styles.md` — This learning guide documenting Commit 09.

---

## 14. Implementation Explanation

1. Inspected `index.css`, `App.css`, `main.jsx`, `App.jsx`, `src/styles/`, and `package.json` to preserve existing appearance and behavior.
2. Extracted the existing palette, font stack, spacing, border radius, and card shadow into `:root` custom properties inside `src/styles/global.css`, adding semantic status colors (`--color-success`, `--color-warning`, `--color-error`) and hover/secondary tokens for future growth.
3. Imported `./styles/global.css` at the top of `src/index.css`, applied variables to `body`, and added `#root { min-height: 100vh; }`.
4. Refactored `src/App.css` to consume `var(...)` tokens while keeping computed sizes and colors identical to before.

---

## 15. How to Run the Application

From the `frontend/` directory:

```bash
cd frontend
npm run dev
```

Open the local URL displayed by Vite (typically `http://localhost:5173`) in your web browser.

---

## 16. How to Verify the Styles

Run the production build from `frontend/`:

```bash
cd frontend
npm run build
```

You can also inspect the compiled CSS bundle inside `frontend/dist/assets/` (or open browser DevTools on the running dev server) to verify `:root` custom properties and `var(...)` declarations are included cleanly without build errors.

---

## 17. Expected Results

- `npm run build` exits with code `0` and generates `dist/index.html`, `dist/assets/*.css`, and `dist/assets/*.js`.
- All CSS imports (`main.jsx` → `index.css` → `styles/global.css`, and `App.jsx` → `App.css`) resolve cleanly with no warnings or circular imports.
- The Fix-My-Ride welcome screen renders with the exact same centered card layout, typography, and colors as before.

---

## 18. What Has Been Completed

- Created `frontend/src/styles/global.css` with color, typography, spacing, border-radius, and shadow variables.
- Updated `frontend/src/index.css` with browser defaults, `#root` minimum height, and `global.css` import.
- Updated `frontend/src/App.css` to use CSS variables while keeping the existing welcome screen appearance unchanged.
- Documented global CSS concepts in `frontend/README.md` and `docs/commits/09-global-styles.md`.
- Verified `npm run build` passes cleanly.

---

## 19. What Is Intentionally Not Implemented

To keep Commit 09 focused strictly on the global CSS foundation:

- No dashboard layout, header, sidebar, or new application pages were created.
- No Material UI components, React Router, Axios, or backend connections were added.
- No dark mode or runtime theme-switching system was implemented.
- No external CSS frameworks, CSS-in-JS libraries, or web fonts were installed.

---

## 20. Suggested Git Commit Message

```text
feat(frontend): establish global styles
```

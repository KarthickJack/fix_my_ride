import './MainLayout.css';

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <header className="main-layout-header">
        <span className="main-layout-placeholder-label">
          Header Placeholder
        </span>
      </header>

      <div className="main-layout-body">
        <aside className="main-layout-sidebar" aria-label="Sidebar placeholder">
          <span className="main-layout-placeholder-label">
            Sidebar Placeholder
          </span>
        </aside>

        <main className="main-layout-content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;

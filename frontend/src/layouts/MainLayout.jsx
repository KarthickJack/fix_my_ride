import { useState } from 'react';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import './MainLayout.css';

function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevOpen) => !prevOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="main-layout">
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
      />

      <div className="main-layout-body">
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

        <main className="main-layout-content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;

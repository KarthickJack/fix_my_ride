import MainLayout from './layouts/MainLayout.jsx';
import './App.css';

function App() {
  return (
    <MainLayout>
      <div className="welcome-page">
        <section className="welcome-card">
          <h1 className="welcome-title">Fix-My-Ride</h1>
          <p className="welcome-subtitle">Motorcycle Service Management System</p>
          <p className="welcome-message">Welcome to Fix-My-Ride.</p>
          <p className="welcome-description">
            Your motorcycle service management platform.
          </p>
        </section>
      </div>
    </MainLayout>
  );
}

export default App;

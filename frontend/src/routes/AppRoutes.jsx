import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MainLayout from '../layouts/MainLayout.jsx';
import DashboardPage from '../pages/Dashboard/DashboardPage.jsx';
import CustomersPage from '../pages/Customers/CustomersPage.jsx';
import BookingsPage from '../pages/Bookings/BookingsPage.jsx';

function LayoutWrapper() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

function NotFoundPage() {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-heading)' }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', mb: 2 }}>
        The page you requested does not exist or may have moved.
      </Typography>
      <Box>
        <Button component={Link} to="/dashboard" variant="contained">
          Return to Dashboard
        </Button>
      </Box>
    </Paper>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<LayoutWrapper />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

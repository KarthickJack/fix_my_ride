import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MainLayout from '../layouts/MainLayout.jsx';

function LayoutWrapper() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

function DashboardPlaceholder() {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-heading)' }}>
        Dashboard
      </Typography>
      <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
        Temporary placeholder for the <strong>/dashboard</strong> route. Full Dashboard content will be built in Commit 13.
      </Typography>
    </Paper>
  );
}

function CustomersPlaceholder() {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-heading)' }}>
        Customers
      </Typography>
      <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
        Temporary placeholder for the <strong>/customers</strong> route. Full Customers page will be built in Commit 13.
      </Typography>
    </Paper>
  );
}

function BookingsPlaceholder() {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-heading)' }}>
        Bookings
      </Typography>
      <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
        Temporary placeholder for the <strong>/bookings</strong> route. Full Bookings page will be built in Commit 13.
      </Typography>
    </Paper>
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
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
        <Route path="/customers" element={<CustomersPlaceholder />} />
        <Route path="/bookings" element={<BookingsPlaceholder />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

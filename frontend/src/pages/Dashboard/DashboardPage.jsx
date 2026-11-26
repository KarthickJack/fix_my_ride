import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './DashboardPage.css';

function DashboardPage() {
  return (
    <Box className="dashboard-page">
      <Paper elevation={0} className="dashboard-page-card">
        <Typography variant="h5" component="h1" className="dashboard-page-title">
          Dashboard
        </Typography>
        <Typography variant="body1" className="dashboard-page-description">
          Central workspace overview for the Fix-My-Ride Motorcycle Service
          Management System.
        </Typography>
        <Typography variant="body1" className="dashboard-page-welcome">
          Welcome to Fix-My-Ride. Use the sidebar navigation to switch between
          core workshop sections.
        </Typography>

        <Box className="dashboard-page-placeholder">
          <Typography
            variant="subtitle1"
            component="h2"
            className="dashboard-page-placeholder-title"
          >
            Dashboard Statistics (Placeholder)
          </Typography>
          <Typography
            variant="body2"
            className="dashboard-page-placeholder-text"
          >
            Live workshop metrics and service summaries will be implemented
            here in upcoming phases once backend data modules are connected.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default DashboardPage;

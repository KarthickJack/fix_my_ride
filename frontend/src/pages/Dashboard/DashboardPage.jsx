import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { getHealthStatus } from '../../services/healthService.js';
import './DashboardPage.css';

function DashboardPage() {
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const checkBackendHealth = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await getHealthStatus();
      setHealthData(data);
    } catch {
      setHealthData(null);
      setErrorMessage(
        'Unable to connect to the backend. Please check whether the backend server is running.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkBackendHealth();
  }, [checkBackendHealth]);

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

        <Box className="dashboard-connection-box">
          <Typography
            variant="subtitle1"
            component="h2"
            className="dashboard-section-title"
          >
            Backend Connection Status
          </Typography>

          {isLoading && (
            <Box className="dashboard-loading-row">
              <CircularProgress size={18} />
              <Typography variant="body2" className="dashboard-status-muted">
                Checking backend connection...
              </Typography>
            </Box>
          )}

          {!isLoading && !errorMessage && healthData && (
            <Box className="dashboard-status-details">
              <Typography
                variant="body2"
                className="dashboard-status-connected"
              >
                Backend: Connected
              </Typography>
              <Typography variant="body2" className="dashboard-status-item">
                <strong>Application:</strong> {healthData.application}
              </Typography>
              <Typography variant="body2" className="dashboard-status-item">
                <strong>Status:</strong> {healthData.status}
              </Typography>
              <Typography variant="body2" className="dashboard-status-item">
                <strong>Message:</strong> {healthData.message}
              </Typography>
            </Box>
          )}

          {!isLoading && errorMessage && (
            <Box className="dashboard-status-error-box">
              <Typography variant="body2" className="dashboard-status-error">
                {errorMessage}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={checkBackendHealth}
                className="dashboard-retry-button"
              >
                Retry
              </Button>
            </Box>
          )}
        </Box>

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

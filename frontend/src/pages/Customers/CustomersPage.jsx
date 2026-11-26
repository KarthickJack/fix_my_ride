import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './CustomersPage.css';

function CustomersPage() {
  return (
    <Box className="customers-page">
      <Paper elevation={0} className="customers-page-card">
        <Typography variant="h5" component="h1" className="customers-page-title">
          Customers
        </Typography>
        <Typography variant="body1" className="customers-page-description">
          Manage motorcycle owners, contact details, and associated service
          profiles in Fix-My-Ride.
        </Typography>

        <Box className="customers-page-empty-state">
          <Typography
            variant="subtitle1"
            component="h2"
            className="customers-page-empty-title"
          >
            No customer records available yet.
          </Typography>
          <Typography variant="body2" className="customers-page-empty-text">
            Customer registration and management features will be implemented
            in later phases.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default CustomersPage;

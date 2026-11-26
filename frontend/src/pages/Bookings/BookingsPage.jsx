import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './BookingsPage.css';

function BookingsPage() {
  return (
    <Box className="bookings-page">
      <Paper elevation={0} className="bookings-page-card">
        <Typography variant="h5" component="h1" className="bookings-page-title">
          Bookings
        </Typography>
        <Typography variant="body1" className="bookings-page-description">
          Track motorcycle service appointments, scheduled drop-offs, and
          workshop service requests in Fix-My-Ride.
        </Typography>

        <Box className="bookings-page-empty-state">
          <Typography
            variant="subtitle1"
            component="h2"
            className="bookings-page-empty-title"
          >
            No service bookings available yet.
          </Typography>
          <Typography variant="body2" className="bookings-page-empty-text">
            Booking scheduling and management features will be implemented in
            later phases.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default BookingsPage;

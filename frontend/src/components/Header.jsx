import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import './Header.css';

function Header({ isSidebarOpen, onToggleSidebar }) {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      className="app-header"
    >
      <Toolbar className="app-header-toolbar">
        <div className="app-header-left">
          <div className="app-header-menu-wrap">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Toggle navigation menu"
              aria-expanded={isSidebarOpen}
              aria-controls="primary-sidebar"
              onClick={onToggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          </div>

          <div className="app-header-brand">
            <span className="app-header-logo" aria-hidden="true">
              <TwoWheelerIcon fontSize="small" />
            </span>
            <Typography variant="h6" component="span" className="app-header-title">
              Fix-My-Ride
            </Typography>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

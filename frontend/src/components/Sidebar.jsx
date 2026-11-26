import { NavLink, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CloseIcon from '@mui/icons-material/Close';
import './Sidebar.css';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { id: 'customers', label: 'Customers', path: '/customers', icon: PeopleIcon },
  { id: 'bookings', label: 'Bookings', path: '/bookings', icon: EventNoteIcon },
];

function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="app-sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="primary-sidebar"
        className={`app-sidebar ${isOpen ? 'app-sidebar-open' : ''}`}
        aria-label="Primary navigation"
      >
        <div className="app-sidebar-mobile-header">
          <span className="app-sidebar-heading">Navigation</span>
          <IconButton
            size="small"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        <nav>
          <List className="app-sidebar-list" disablePadding>
            {MENU_ITEMS.map((item) => {
              const IconComponent = item.icon;
              const isSelected = pathname === item.path;

              return (
                <ListItem key={item.id} disablePadding className="app-sidebar-item">
                  <ListItemButton
                    component={NavLink}
                    to={item.path}
                    selected={isSelected}
                    onClick={onClose}
                    className={`app-sidebar-link ${
                      isSelected ? 'app-sidebar-link-active' : ''
                    }`}
                  >
                    <ListItemIcon className="app-sidebar-icon">
                      <IconComponent fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        className: 'app-sidebar-label',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

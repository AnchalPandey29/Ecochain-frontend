import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is used for routing
import { useAuth } from '../AuthContext';

const AppBarComponent = () => {
  const { isLoggedIn, logout, role } = useAuth(); // Added role from useAuth context
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate(); // Navigation hook from react-router-dom

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  // Conditional rendering of nav items based on role
  const navItems = isLoggedIn
    ? role === 'collector'
      ? [
          { text: 'Collection Requests', path: '/collection-requests' },
          { text: 'My Profile', path: '/profile' },
          { text: 'Logout', action: handleLogout }, // No 'path', only 'action'
        ]
      : [
          { text: 'Report Waste', path: '/report' },
          { text: 'My Profile', path: '/userprofile' },
          { text: 'Logout', action: handleLogout }, // No 'path', only 'action'
        ]
    : [
        { text: 'Login', path: '/login' },
        { text: 'Signup', path: '/signup' },
      ];

  const drawerList = (
    <List>
      <ListItem button onClick={() => handleNavigation('/')}>
        Home
      </ListItem>
      {navItems.map((item, index) => (
        <ListItem
          button
          key={index}
          onClick={() => {
            item.action ? item.action() : handleNavigation(item.path);
          }}
        >
          {item.text}
        </ListItem>
      ))}
    </List>
  );

  return (
    <motion.div initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EcoChain
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => toggleDrawer(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
              >
                {drawerList}
              </Drawer>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleNavigation('/')}>
                Home
              </Button>
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Button
                    color="inherit"
                    onClick={() => {
                      item.action ? item.action() : handleNavigation(item.path);
                    }}
                  >
                    {item.text}
                  </Button>
                </motion.div>
              ))}
              {isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                </motion.div>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default AppBarComponent;

import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 250;

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
          borderRight: '1px solid #333',
        },
      }}
    >
      {/* Sidebar content */}
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ListItemText primary="Menu" />
        <IconButton onClick={onClose} color="inherit">
          <MenuIcon />
        </IconButton>
      </div>
      <List>
        {/* Sidebar navigation links */}
        <ListItem button component={RouterLink} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/register">
          <ListItemText primary="Register NGO" />
        </ListItem>
        <ListItem button component={RouterLink} to="/donate">
          <ListItemText primary="Donate" />
        </ListItem>
        <ListItem button component={RouterLink} to="/about">
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={RouterLink} to="/contact">
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

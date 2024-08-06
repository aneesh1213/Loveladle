import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import ladleIcon from './assets/ladle2.png';
import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { showLogout } from './atoms';

// import { response } from 'express';
function Appbar({ onMenuButtonClick }) {
  const showlogout=useRecoilValue(showLogout)
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#4CAF50' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuButtonClick}
          >
            <MenuIcon />
          </IconButton>
          <Avatar sx={{ bgcolor: 'white', color: '#4CAF50', marginRight: '8px' }}>
            <img src={ladleIcon} alt="ladle_icon" width="24" height="24" />
          </Avatar>
          <Typography variant="h6" component="div" sx={{
            flexGrow: 1,
            fontFamily: 'Great Vibes, cursive', // Apply the cursive font
            // Additional styles for the Typography component
            fontSize: '1.5rem', // Example: Adjust font size
            fontWeight: 'normal', // Example: Set font weight
            color: '#FFFFFF', // Example: Set font color
          }}>
            LOVELADLE
          </Typography>
          {
            !showlogout ?
              <div>
                <Button href="/signin" color="inherit">
                  Login
                </Button>
                <Button href="/signup" color="inherit">
                  Sign up
                </Button>
              </div>
              : <Button href="/signup" color="inherit">
                Logout
              </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Appbar;

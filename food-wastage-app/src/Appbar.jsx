import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import ladleIcon from './assets/ladle2.png';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { showLogout } from './atoms';
import { useNavigate } from 'react-router-dom';

function Appbar({ onMenuButtonClick }) {
  const showlogout = useRecoilValue(showLogout);  // Reading the current state
  const setShowLogout = useSetRecoilState(showLogout); // Function to update the state
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setShowLogout(true); // Update the atom to show the logout button
    }
  }, [setShowLogout]);

  const handleLogout = ()=>{
    localStorage.removeItem("userToekn");
    setShowLogout(true);
    navigate("/signin")
  }

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
            fontFamily: 'Great Vibes, cursive',
            fontSize: '1.5rem',
            fontWeight: 'normal',
            color: '#FFFFFF',
          }}>
            LOVELADLE
          </Typography>
          {
            showlogout ?
              <div>
                <Button href="/signin" color="inherit">
                  Login
                </Button>
                <Button href="/signup" color="inherit">
                  Sign up
                </Button>
              </div>
              : <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Appbar;

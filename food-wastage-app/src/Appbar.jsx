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
import { showLogout, role } from './atoms'; // Import role atom
import { useNavigate, useLocation } from 'react-router-dom';

function Appbar({ onMenuButtonClick }) {
  const showlogout = useRecoilValue(showLogout);  // Reading the current state
  const setShowLogout = useSetRecoilState(showLogout); // Function to update the state
  const userRoleState = useRecoilValue(role); // Get the role state from Recoil

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const ngoToken = localStorage.getItem("ngoToken");

    if (userToken || ngoToken) {
      setShowLogout(true);
    } else {
      setShowLogout(false);
    }
  }, [setShowLogout]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("ngoToken");
    setShowLogout(false);
    navigate("/"); // Redirect to choice page on logout
  };

  const isChoicePage = location.pathname === '/';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#4CAF50' }}>
        <Toolbar>
          {!isChoicePage && (
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
          )}
          <Avatar sx={{ bgcolor: 'white', color: '#4CAF50', marginRight: '8px' }}>
            <img src={ladleIcon} alt="ladle_icon" width="24" height="24" />
          </Avatar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: 'Great Vibes, cursive',
              fontSize: '1.5rem',
              fontWeight: 'normal',
              color: '#FFFFFF',
            }}
          >
            LOVELADLE
          </Typography>

          {!isChoicePage && (
            showlogout === false ? (
              // Conditionally show buttons based on the role
              userRoleState.ngoRole ? (
                // NGO-specific buttons
                <div>
                  <Button href="/ngologin" color="inherit">
                    NGO Login
                  </Button>
                  <Button href="/register" color="inherit">
                    NGO Register
                  </Button>
                </div>
              ) : userRoleState.userRole ? (
                // User-specific buttons
                <div>
                  <Button href="/signin" color="inherit">
                    User Sign in
                  </Button>
                  <Button href="/signup" color="inherit">
                    User Sign up
                  </Button>
                </div>
              ) : null
            ) : (
              // When logged in, check role and display logout and dashboard links
              <>
                {userRoleState.ngoRole && (
                  <Button onClick={() => navigate('/userconnect')} color="inherit">
                    NGO Dashboard
                  </Button>
                )}
                {userRoleState.userRole && (
                  <Button onClick={() => navigate('/')} color="inherit">
                    Dashboard
                  </Button>
                )}
                {/* Logout button for both roles */}
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </>
            )
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Appbar;

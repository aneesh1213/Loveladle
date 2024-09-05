import React from 'react';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { role } from './atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
function Choice() {
  const navigate = useNavigate();
  const setRole = useSetRecoilState(role);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 250 }}>
      <Card variant="outlined" style={{ width: 400, padding: 20, height: 200 }}>
        <div>
          <Button
            size="large"
            variant="contained"
            style={{ backgroundColor: '#4CAF50', marginLeft: 145, marginTop: 45 }}
            onClick={() => {
                setRole({ userRole: false, ngoRole: true });
                navigate('/ngologin')
              }
            } // Redirect to NGO login
          >
            I am NGO
          </Button>
        </div>
        <br /><br />
        <div>
          <Button
            size="large"
            variant="contained"
            style={{ backgroundColor: '#4CAF50', marginLeft: 143 }}
            onClick={() => {
                setRole({ userRole: true, ngoRole: false }); // Set User role
                navigate('/signin'); // Redirect to User login
            }} // Redirect to User login
          >
            I am User
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Choice;

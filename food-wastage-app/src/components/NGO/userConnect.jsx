import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Box, Typography, Card, Button } from '@mui/material';

export default function UserConnect() {
    const { ngoId } = useParams();  // Get ngoId from URL
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        
        axios.get(`http://localhost:3000/ngo/userconnect/${ngoId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            setUsers(res.data);
        }).catch((err) => {
            console.error('There was an error fetching the users!', err);
        });
    }, [ngoId]);

    const handleConnect = (userId) => {
        navigate(`/userconnect/${ngoId}/${userId}`);
    };

    return (
        <Grid container spacing={3} style={{ marginTop: 50 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {users.map(user => (
                <Grid item xs={12} lg={8} sm={6} md={3} key={user._id}>
                    <User user={user} onConnect={() => handleConnect(user._id)} />
                </Grid>
            ))}
        </Grid>
    );
}

function User({ user, onConnect }) {
    return (
        <Card style={{ margin: 20, width: 300, minHeight: 200 }}>
            <Box style={{ backgroundColor: '#4CAF50', padding: 10 }}>
                <Typography textAlign="center" variant="h6" style={{ color: 'white' }}>
                    {user.name}
                </Typography>
            </Box>
            <Box style={{ padding: 10 }}>
                <Typography textAlign="center" variant="subtitle1"><strong>Email: </strong>{user.email}</Typography>
                <Typography textAlign="center" variant="subtitle1"><strong>Address: </strong>{user.Useraddress}</Typography>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button size="medium" variant="contained" style={{ backgroundColor: '#4CAF50' }} onClick={onConnect}>
                    Connect
                </Button>
            </Box>
        </Card>
    );
}

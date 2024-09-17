import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { showLogout } from '../../atoms';

function NgoLogin() {
    // const setShowLogout = useSetRecoilState(showLogout)
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handlesignin = async () => {
        navigate('/');
    }

    return <div>
        <div style={{
            paddingTop: 200,
            marginBottom: 10,
            display: 'flex',
            justifyContent: "center"
        }}>
            <Typography variant={'h6'}>
                Welcome to Loveladle !!
                .Login Ngo below
            </Typography>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Card variant="outlined" style={{
                width: 400,
                padding: 20
            }}>
                <TextField
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />
                <br /> <br />
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                />
                <br /> <br />
                <Button size='large' variant='contained'
                    style={{ backgroundColor: '#4CAF50' }}
                    onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/ngo/login", {
                                email: email,
                                password: password
                            });

                            // Successful login
                            localStorage.setItem('userToken', response.data.token);
                            const ngoId = response.data.ngoId
                            alert(response.data.message);
                            navigate(`/userconnect/${ngoId}`);  // Redirect after successful login

                        } catch (error) {
                            // Error handling
                            if (error.response && error.response.status === 401) {
                                alert("Wrong Password");
                            } else if (error.response && error.response.status === 204) {
                                alert("NGO doesn't exist, please register the NGO");
                            } else {
                                console.error(error);
                                alert("An unexpected error occurred. Please try again later.");
                            }
                        }
                    }}
                >Log in</Button>
            </Card>
        </div>
    </div>
}

export default NgoLogin;



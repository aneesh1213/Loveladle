import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return <div>
        <div style={{
            paddingTop: 200,
            marginBottom: 10,
            display: 'flex',
            justifyContent: "center"
        }}>
            <Typography variant={'h6'}>
                Welcome to Loveladle !!
                .Sign up below
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
                    onChange={(e)=>{
                        setEmail(e.value);
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />
                <br /> <br />
                <TextField
                    onChange={(e)=>{
                        setPassword(e.value);
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                />
                <br /> <br />
                <Button size='large' variant='contained' 
                style={{backgroundColor:'#4CAF50'}}
                onClick={()=>{
                    axios.post("http://localhost:3000/user/signup",{
                        username:email, 
                        password:password
                    })
                }}
                >sign up</Button>
            </Card>
        </div>
    </div>
}

export default Signup;



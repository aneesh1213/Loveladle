import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
import { useSetRecoilState } from 'recoil';
import { showLogout } from '../../atoms';

function Signup() {
    const setShowLogout = useSetRecoilState(showLogout)
    const navigate=useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handlesignup = async()=>{
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
                        setEmail(e.target.value);
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />
                <br /> <br />
                <TextField
                    onChange={(e)=>{
                        setPassword(e.target.value);
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
                    console.log(email)
                    console.log(password)
                    axios.post("http://localhost:3000/user/signup",{
                        email:email, 
                        password:password
                    }).then((response)=>{
                        if(response.status==203){
                            alert("Email already exists")
                            return
                        }
                        // console.log(response.data)
                        setShowLogout(true)
                        localStorage.setItem('userToken',response.data.token)
                        alert("User Signin Successful!!")
                    }).then(handlesignup);
                }}
                >sign up</Button>
            </Card>
        </div>
    </div>
}

export default Signup;



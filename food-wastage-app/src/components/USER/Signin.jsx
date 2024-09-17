import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { useSetRecoilState } from 'recoil';
import { showLogout } from '../../atoms';

function Signin() {
    const setShowLogout = useSetRecoilState(showLogout)
    const navigate=useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handlesignin = async()=>{
        navigate('/landing');
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
                .Login below
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
                    onChange={(e) =>{
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
                    axios.post("http://localhost:3000/user/login",{
                        email:email, 
                        password:password
                    }).then((response)=>{
                        if(response.status==203){
                            alert("Wrong Password")
                            return
                        }
                        // console.log(response.data)
                        setShowLogout(true)
                        
                        localStorage.setItem('userToken',response.data.token)
                        alert("logged successfully")
                    }).then(handlesignin);
                }}
                >Log in</Button>
            </Card>
        </div>
    </div>
}

export default Signin;



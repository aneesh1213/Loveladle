import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();
    const handleregister = async()=>{
        navigate('/userconnect');
    }

    return (
        <div style={{
            paddingTop: 100,
            marginBottom: 10,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Card variant="outlined" style={{
                    width: 400,
                    padding: 20
                }}>
                    <Typography variant={'h6'}>
                        Register NGO
                    </Typography>
                    <TextField
                        label="NGO Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        label="Location"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
       
                        fullWidth
                        onClick={()=>{
                            axios.post("http://localhost:3000/ngo/register", {
                                name:name,
                                email:email,
                                address:address,
                                location:location,
                                phone:phone,
                                password:password
                            }).then((response)=>{
                                console.log(response.data);
                                if(response.status == 205){
                                    alert("this ngo exists already!!")
                                }
                                else{
                                    alert('registered ngo successfully!!!');
                                }
                            }).then(handleregister);
                        }}
                        style={{ marginTop: 20 , backgroundColor:"#4CAF50"}}
                    >
                        Register
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default Register;



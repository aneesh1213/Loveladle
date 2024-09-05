import React from "react";
import Button from '@mui/material/Button';
import { TextField, Typography, FormControl, InputLabel, Select, MenuItem, MenuList } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios  from 'axios';
import { set } from "mongoose";


export default function Connect(){
    const { ngoId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');
    console.log("the token coming from connect ngo is:", token);


    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [foodType, setFoodType] = useState('');
    const [noofPeople, setNoOfPeople] = useState(0);


    return <div>
        <div style={{
            paddingTop: 130,
            marginBottom: 10,
            display: 'flex',
            justifyContent: "center"
        }}>
            <Typography variant={'h6'}>
                Fill the data correctly!!!
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
                        setName(e.target.value);
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                />
                <br /> <br />
                <TextField
                    onChange={(e)=>{
                        setAddress(e.target.value);
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                />
                <br /> <br />
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
                        setPhone(e.target.value);
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                />
                <br /> <br />
                {/* <TextField
                    onChange={(e)=>{
                        setformData(e.target.foodType);
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Foddtype"
                    variant="outlined"
                /> */}
                <FormControl fullWidth variant="outlined">
                    <InputLabel id = 'food-type-label' >Food Type</InputLabel>
                    <Select
                        labelId="food-type-label"
                        id="food-type-select"
                        value={foodType}
                        onChange={(e)=>{setFoodType(e.target.value)}}
                        label="Food Type">   
                        <MenuItem value="Breakfast">Breakfast</MenuItem>
                        <MenuItem value="Lunch">Lunch</MenuItem>
                        <MenuItem value="Dinner">Dinner</MenuItem>
                    </Select>
                </FormControl>
                <br /> <br />
                <TextField
                    onChange={(e)=>{
                        setNoOfPeople(e.target.value);
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="No of People"
                    variant="outlined"
                />
                <br /> <br />
                <Button size='large' variant='contained' 
                style={{backgroundColor:'#4CAF50'}}
                onClick={()=>{
                    axios.post(`http://localhost:3000/user/donate/connect/${ngoId}`,{
                        name:name,
                        address:address, 
                        email:email,
                        phone:phone,
                        foodType:foodType,
                        noofPeople:noofPeople
                    }, 
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }}
                    ).then(alert("Notified with your request to ngo!!")).then(navigate("/donate"));
                }}
                >Notify Ngo</Button>
                <Button size='large' variant='contained' 
                style={{backgroundColor:'#4CAF50', marginLeft:160}} onClick={()=>{navigate('/donate')}}>
                    Close
                </Button>
            </Card>
        </div>
    </div>
}
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';



export default function Donate() {
    const navigate = useNavigate()
    

    const [ngos, setNgos] = useState([]);

    useEffect(() => {
        try {
            const token = localStorage.getItem('userToken');
            
            // console.log("the token got is:", token);
            axios.get("http://localhost:3000/user/donate", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                setNgos(res.data);
            })

        } catch (err) {
            console.error('There was an error fetching the NGOs!', err);
        }
    }, []);

    const hadleconnect = ((ngoId)=>{
        navigate(`/connect/${ngoId}`)
    })
    
    

    return (
        <Grid container spacing={3} style={{ marginTop: 50}} columns={{ xs: 4, sm: 8, md: 12 }}>
            {ngos.map(ngo => (
                <Grid item xs={12} lg={8} sm={6} md={3} key={ngo._id}>
                    <Ngo ngo={ngo} onConnect={()=>{hadleconnect(ngo._id)}}/>
                </Grid>
            ))}
        </Grid>
    );
}



function Ngo({ngo, onConnect}) {
    return <Card style={{ margin: 20, width: 300, minHeight: 200 }}>
        <Box style={{ backgroundColor: '#4CAF50', padding: 10 }}>
            <Typography textAlign={"center"} variant="h6" style={{ color: 'white' }}>
                {ngo.name}
            </Typography>
        </Box>
        <Box style={{ padding: 10 }}>
            <Typography textAlign={"center"} variant="subtitle1"><strong>Email: </strong>{ngo.email}</Typography>
            {/* <Typography textAlign={"center"} variant="subtitle1">{props.ngo.email}</Typography> */}
            <Typography textAlign={"center"} variant="subtitle1"><strong>Location: </strong>{ngo.location}</Typography>
            {/* <Typography textAlign={"center"} variant="subtitle1">{props.ngo.location}</Typography> */}
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
            <Button size='medium' variant='contained' style={{ backgroundColor: '#4CAF50' }} onClick={onConnect}>
                Connect
            </Button>
        </Box>
    </Card>
}


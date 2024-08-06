import express from 'express';
import Ngo from '../db/ngo.js';
import UserAuth  from '../middleware/auth.js';

const router = express.Router();

// router.post('/signup', async (req, res) => {
//     const { email, password } = req.body;
//     const ngo = await Ngo.findOne({ email });

//     if (ngo) {
//         return res.status(403).json({ message: 'This NGO already exists' });
//     }

//     const newNgo = new Ngo({ email, password });
//     await newNgo.save();

//     const token = authenticatejwt(newNgo);
//     res.json({ message: 'NGO created successfully', token });
// });

router.post('/register', async (req, res) => {
    const {name, email, address, location, phone} = req.body;
    const ngo = await Ngo.findOne({email});

    if(ngo){
        return res.status(205).json({message:`this ngo is already registered here`});
    }

    const newngo = new Ngo({name, email, address, location, phone});
    newngo.save();
    res.json({message:'registered ngo successfully'});

});





export default router;

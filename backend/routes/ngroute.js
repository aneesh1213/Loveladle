import express from 'express';
import User from '../db/user.js';
import userAuth , {SECRET} from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
import UserAuth from '../middleware/auth.js';
import Ngo from '../db/ngo.js';
import transporter from '../config/nodemailer.js';
import connectWithUser from '../controllers/ngoControllers.js';

const router = express.Router();


router.post('/register', async (req, res) => {
    const {name, email, address, location, phone, password} = req.body;
    const ngo = await Ngo.findOne({email});

    if(ngo){
        return res.status(205).json({message:`this ngo is already registered here`});
    }

    const newngo = new Ngo({name, email, address, location, phone, password});
    newngo.save();
    res.json({message:'registered ngo successfully'});

});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;  // Destructure email and password from req.body
    console.log(email);

    const ngo = await Ngo.findOne({ email });  // Pass email as a string
    if (ngo) {
        if (ngo.password === password) {
            const token = jwt.sign({ "email": email, "password": password }, SECRET);
            return res.status(200).json({ message: 'NGO Logged in Successfully', token: token, ngoId:ngo._id });
        } else {
            return res.status(401).json({ message: "Wrong password entered!" });
        }
    } else {
        return res.status(204).json({ message: "NGO doesn't exist, please register the NGO" });
    }
});

// getting the users from the backend to conncect with them 

router.get('/userconnect/:ngoId', userAuth,async (req, res) => {
    try {
        const { ngoId, userId } = req.params;

        // Find the NGO by its ID and populate the usersInfo array
        const ngo = await Ngo.findById(ngoId).populate('usersInfo');  // Assuming usersInfo is a populated field
        
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }

        // Respond with the list of users (usersInfo) associated with the NGO
        res.json(ngo.usersInfo);
        console.log(ngo.usersInfo)
    
    } catch (err) {
        console.log(err);
        console.error('Error fetching users for NGO:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// router.post('/connect/:ngoId/:userId', async(req, res)=>{
//     const {ngoId, userId} = req.params;
//     const user = User.findById(userId);
//     console.log('ngoId in post request /connect/:ngoId/:userId is :', ngoId);
//     console.log('user id in post request /connect/:ngoId/:userId is :', userId);

//     try{
//         await connectWithUser(ngoId, userId);
//         return res.status(200).json({message: `connection is successful!`});
//     }
//     catch(err){
//         console.log("error found while sending an email", err);
//         return res.status(500).json({message:`eroor connecting with the user `, err});
//     }
// });

router.post('/connect/:ngoId/:userId', connectWithUser);


export default router;

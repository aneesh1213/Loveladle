import express from 'express';
import User from '../db/user.js';
import userAuth , {SECRET} from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
import UserAuth from '../middleware/auth.js';
const router = express.Router();
import Ngo from '../db/ngo.js';


router.post('/signup' ,async (req, res) => {
    const email = req.body.email;
    const password=req.body.password;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({ message: 'This username already exists' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    const token = jwt.sign({"username" : email , "password" : password} , SECRET )
    res.json({ message: 'User created successfully', token });
});

router.post('/login',async(req, res) => {
    const email = req.body.email;
    const password=req.body.password;
    console.log(email)
    const user = await User.findOne({email});
    // console.log(user.password)
    // console.log(password)
    if (user) {
        if(user.password == password){
            const token = jwt.sign({"username" : email , "password" : password} , SECRET )
            return res.status(200).json({ message: 'Logged in Successfully' , "token": token});
        }
        else{
            return res.status(401).json({ message: 'Wrong Password'})
        } 
    }
    else{
        return res.status(204).json({message:"Email doesn't exists, Please sign up"})
    }
})


// router.get("/me", userAuth, async(req, res)=>{
//     // res.json()
//     res.json({
//         email: req.user.email
//     })
// }); 


router.get('/donate', UserAuth, async (req, res) => {
    try {
        const ngos = await Ngo.find({});
        res.json(ngos);
    } catch (error) {
        console.error('Error fetching NGOs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/donate/connect/:ngoId', userAuth, async(req, res) => {
    try{    
        const ngoId = req.params.ngoId;
        console.log("ngoId from /connect/:ngoId is:", ngoId);

        
        const ngo = await Ngo.findById(ngoId);
        if(!ngo){
            res.status(404).json({message:'this ngo do not exists!!'})
        }

        const newUserInfo = {
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            foodType: req.body.foodType,
            noofPeople: req.body.noofPeople,
        }
        
        console.log("came response in the connect/ngoid roiute is :",newUserInfo)
        ngo.usersInfo.push(newUserInfo)
        await ngo.save();

        res.status(201).json({message:'user connected to ngo successFully', ngo})
    }
    catch(err){
        console.log('error connecting to ngo !!');
        res.status(500).json({message:'server error is there !'})
    }
});

export default router;

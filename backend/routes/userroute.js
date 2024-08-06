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
        return res.status(203).json({ message: 'This username already exists' });
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
    console.log(user.password)
    console.log(password)
    if (user) {
        if(user.password == password){
            const token = jwt.sign({"username" : email , "password" : password} , SECRET )
            return res.status(200).json({ message: 'Logged in Successfully' , "token": token});
        }
        else{
            return res.status(203).json({ message: 'Wrong Password'})
        } 
    }
    else{
        return res.status(204).json({message:"Email doesn't exists, Please sign up"})
    }
})


router.get("/me", userAuth, async(req, res)=>{
    // res.json()
    res.json({
        email: req.user.email
    })
}); 

router.get('/donate', userAuth, async(req, res) => {
    const ngos = await Ngo.find({});
    console.log(ngos);
});



export default router;

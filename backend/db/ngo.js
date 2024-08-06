
import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
    name:String, 
    email:String, 
    address:String, 
    location:String, 
    phone:String,
});

const Ngo = mongoose.model('NGO', ngoSchema);

export default Ngo; 
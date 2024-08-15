import mongoose from 'mongoose';

// Define the schema for user info
const userInfoSchema = new mongoose.Schema({
    name: String,
    Useraddress: String,
    email: String,
    phone: String,
    foodType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner'], // Restrict to these values
        required: true
    },
    noOfPeople: Number,
});

// Define the schema for NGOs
const ngoSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    address: String, 
    location: String, 
    phone: String,
    usersInfo: [userInfoSchema] // Array of user information
});

const Ngo = mongoose.model('NGO', ngoSchema);

export default Ngo;

import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express'; // Use express's own body parser
import ngoRouter from './routes/ngroute.js';
import userRouter from './routes/userroute.js';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://aneeshkulkarni007:583683@cluster2.joycdck.mongodb.net/loveladle';

mongoose.connect(mongoUri, {
  tls: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // Adjust to allow specific domains if needed
  credentials: true,
}));

app.use(express.json()); // Use express's built-in body parser

app.use('/ngo', ngoRouter);
app.use('/user', userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));





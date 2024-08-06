
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import ngoRouter from './routes/ngroute.js';
import userRouter from './routes/userroute.js';
import express from 'express'


const mongoUri = 'mongodb+srv://aneeshkulkarni007:583683@cluster2.joycdck.mongodb.net/loveladle';

mongoose.connect(mongoUri, {
  tls: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/ngo', ngoRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));

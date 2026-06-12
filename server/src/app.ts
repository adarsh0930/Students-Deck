import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import studentRoutes from './routes/Routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', studentRoutes);

mongoose.connect('mongodb://localhost:27017/school_db')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

export default app;
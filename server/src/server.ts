import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoutes from './routes/Routes.js'; // Note the .js for modern ESM

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount the API routes
app.use('/api', apiRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/secure_student_db')
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    })
    .catch((error) => console.error('❌ MongoDB Connection Error:', error));
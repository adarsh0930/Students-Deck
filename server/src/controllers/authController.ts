import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student';
import { processPayloadL2, encryptL2 } from '../utils/cryptoServer';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwt';

export const register = async (req: Request, res: Response) => {
    try {
        // req.body contains L1 encrypted data
        const l2EncryptedData = processPayloadL2(req.body, 'encrypt');
        const newStudent = new Student(l2EncryptedData);
        await newStudent.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // 'email' is now plain text, 'password' is still L1 encrypted
        const { email, password } = req.body; 

        // 1. Look up the user by plain text email!
        const student = await Student.findOne({ email });
        if (!student) return res.status(404).json({ error: 'User not found' });

        // 2. Decrypt the DB password (removes L2) to expose the L1 password underneath
        const dbPasswordL1 = processPayloadL2({ password: student.password }, 'decrypt').password;
        
        // 3. Compare incoming L1 password with DB's L1 password
        if (dbPasswordL1 !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // 4. Success! Generate token and send user profile
        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        
        const userProfile = processPayloadL2(student.toObject(), 'decrypt');
        
        res.status(200).json({ token, user: userProfile });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
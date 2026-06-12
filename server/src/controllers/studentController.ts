import { Request, Response } from 'express';
import Student from '../models/Student';
import { processPayloadL2 } from '../utils/cryptoServer';

export const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await Student.find().lean();
        // Remove L2, send back L1
        const l1Students = students.map(s => processPayloadL2(s, 'decrypt'));
        res.status(200).json(l1Students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const l2EncryptedData = processPayloadL2(req.body, 'encrypt');
        await Student.findByIdAndUpdate(req.params.id, l2EncryptedData);
        res.status(200).json({ message: 'Updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Update failed' });
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Deletion failed' });
    }
};
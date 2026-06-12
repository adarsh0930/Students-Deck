import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { getStudents, updateStudent, deleteStudent } from '../controllers/studentController';

const router = Router();

// Auth Routes
router.post('/register', register);
router.post('/login', login);

// Student Routes
router.get('/students', getStudents);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

export default router;
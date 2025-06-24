import express from 'express';
const router = express.Router();
import {createLession, getLessions, getLession, updateLession, deleteLession} from '../controllers/lesson.controller.js'
import { auth } from '../middlewares/auth.middleware.js';

router.post('/create/:courseId', auth, createLession);
router.get('/getAll/:courseId', auth, getLessions);
router.get('/get/:lessonId', auth, getLession);
router.put('/update/:lessonId', auth, updateLession);
router.delete('/delete/:lessonId', auth, deleteLession);

export default router;
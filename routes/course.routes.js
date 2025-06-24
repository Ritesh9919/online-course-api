import express from 'express';
const router = express.Router();
import {createCourse, getAllCourses, getCourse, updateCourse, deleteCourse} from '../controllers/course.controller.js'
import { auth } from '../middlewares/auth.middleware.js';


router.post('/create', auth, createCourse);
router.get('/getAll', auth, getAllCourses);
router.get('/get/:courseId', auth, getCourse);
router.put('/update/:courseId', auth, updateCourse);
router.delete('/delete/:courseId', auth, deleteCourse);

export default router;
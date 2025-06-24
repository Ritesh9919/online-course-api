import express from 'express';
const router = express.Router();
import {enrollInCourse, getEnrolledCourses} from '../controllers/enrollment.controller.js'
import { auth } from '../middlewares/auth.middleware.js';


router.post('/:courseId', auth, enrollInCourse);
router.get('/', auth, getEnrolledCourses);

export default router;
import express from 'express';
const router = express.Router();
import {addQuizToLesson, getAllQuizsOfLesson} from '../controllers/quiz.controller.js'
import { auth } from '../middlewares/auth.middleware.js';

router.post('/:lessonId', auth, addQuizToLesson);
router.get('/:lessonId', auth, getAllQuizsOfLesson);


export default router
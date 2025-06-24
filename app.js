import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {errorHandlerMiddleware} from './middlewares/errorHandler.middleware.js'

// routers
import userRouter from './routes/user.routes.js'
import courseRouter from './routes/course.routes.js'
import lessonRouter from './routes/lesson.routes.js'
import quizRouter from './routes/quiz.routes.js'
import enrollmentRouter from './routes/enrollment.routes.js'



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());



app.use('/api/auth', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/lessons', lessonRouter);
app.use('/api/quizs', quizRouter);
app.use('/api/enrollments', enrollmentRouter);

app.use(errorHandlerMiddleware);

export {app}
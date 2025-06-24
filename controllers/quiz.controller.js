
import { Lesson } from '../models/lesson.mode.js'
import {Quiz} from '../models/quiz.model.js'
import {ApiError} from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'



export const addQuizToLesson = async(req, res, next) => {
    try {
        const {questions} = req.body;
        const {lessonId} = req.params;
        if(!questions || questions.length == 0) {
            return next(new ApiError(400, "At least one question is required"));
        }

        const lesson = await Lesson.findById(lessonId);
        if(!lesson) {
            return next(new ApiError(404, "Lesson not found"));
        }

        if(req.user.role !== 'admin') {
             return next(new ApiError(400, "Only admin can add quiz"));
        }

        questions.forEach((question, index)=> {
           if(!question.questionText || question.questionText.trim == '') {
            return next(new ApiError(400, `Question ${i + 1} text is required`));
           }

           if (!question.options || question.options.length < 2) {
           return next(new ApiError(400, `Question ${i + 1} must have at least 2 options`))
           }

        const correctOptions = question.options.filter(option => option.isCorrect);
        if (correctOptions.length !== 1) {
           return next(new ApiError(400, `Question ${i + 1} must have exactly one correct option`))
        }
        })

        // Create quiz
        const quiz = await Quiz.create({lesson:lessonId, questions});
        return res.status(201).json(new ApiResponse(true, {quiz}, "Quiz added"));
        
    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const getAllQuizsOfLesson = async(req, res, next) => {
    try {
        const {lessonId} = req.params;
        const lesson = await Lesson.findById(lessonId);
        if(!lesson) {
            return next(new ApiError(404, "Lesson not found"));
        }

        const quizs = await Quiz.find({lesson:lessonId});
        return res.status(200).json(new ApiResponse(true, {quizs}, "Quizs fetched"));
    } catch (error) {
        console.error(error);
        next(error);
    }
}




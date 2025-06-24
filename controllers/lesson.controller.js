import {Course} from '../models/course.model.js'
import { Lesson } from '../models/lesson.mode.js'
import {ApiError} from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'



export const createLession = async(req, res, next)=> {
    try {
        const {title, content, resources} = req.body;
        const {courseId} = req.params;
        if(!title || !content) {
            return next(new ApiError(400, "All fields are required"));
        }

        const course = await Course.findById(courseId);
        if(!course) {
             return next(new ApiError(404, "Course not found"));
        }

        if(req.user.role !== 'admin') {
             return next(new ApiError(400, "Only admin can create lesson"));
        }

        const lesson = await Lesson.create({title, content, course:courseId, resources});
        return res.status(201).json(new ApiResponse(true, {lesson}, "Lesson created"));
    } catch (error) {
        console.error(error);
        next(error);
    }
}


export const getLessions = async(req, res, next)=> {
    try {
        const {courseId} = req.params;
        const lessons = await Lesson.find({course:courseId});
        return res.status(200).json(new ApiResponse(true, {lessons}, "Lessons fetched"));

    } catch (error) {
        console.error(error);
        next(error);
    }
}


export const getLession = async(req, res, next)=> {
    try {
        const {lessonId} = req.params;
        const lesson = await Lesson.findById(lessonId);
        if(!lesson) {
            return next(new ApiError(404, "Lesson not found"));
        }

        return res.status(200).json(new ApiResponse(true, {lesson}, "Lesson fetched"));
    } catch (error) {
        console.error(error);
        next(error);
    }
}


export const updateLession = async(req, res, next)=> {
    try {
        const {title, content} = req.body;
        const {lessonId} = req.params;
        const lesson = await Lesson.findById(lessonId);
        if(!lesson) {
            return next(new ApiError(404, "Lesson not found"));
        }
         
        if(req.user.role !== 'admin') {
             return next(new ApiError(400, "Only admin can update lesson"));
        }

        const updatedLesson = await Lesson.findByIdAndUpdate(
            lessonId,
            {$set:{title, content}},
            {new:true}
        )

        return res.status(200).json(new ApiResponse(true, {lesson:updatedLesson}, "Lesson updated"));
    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const deleteLession = async(req, res, next)=> {
    try {
        const {lessonId} = req.params;
        const lesson = await Lesson.findById(lessonId);
        if(!lesson) {
            return next(new ApiError(404, "Lesson not found"));
        }
         
        if(req.user.role !== 'admin') {
             return next(new ApiError(400, "Only admin can delete lesson"));
        }

        await Lesson.findByIdAndDelete(lessonId);
        return res.status(200).json(new ApiResponse(true, {}, "Lesson deleted"));


    } catch (error) {
        console.error(error);
        next(error);
    }
}
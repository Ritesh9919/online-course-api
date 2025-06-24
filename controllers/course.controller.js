import {Course} from '../models/course.model.js'
import {ApiError} from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'




export const createCourse = async(req, res, next)=> {
    try {
        const {title, description, instructor, assignments} = req.body;
        if(!title || !description || !instructor || !assignments) {
            return next(new ApiError(400, "All fields are required"));
        }

        if(req.user.role !== 'admin') {
            return next(new ApiError(400, "Only admin can create courses"));
        }

        const course = await Course.create({title, description, instructor, assignments});
        return res.status(201).json(new ApiResponse(true, {course}, "Course created"));

    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const getAllCourses = async(req, res, next)=> {
    try {
        const courses = await Course.find();
        return res.status(200).json(new ApiResponse(true, {courses}, "Courses fetched"))
    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const getCourse = async(req, res, next)=> {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
            if(!course) {
            return next(new ApiError(404, "Course not found"));
        }
        return res.status(200).json(new ApiResponse(true, {course}, "Course fetched"))
        
    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const updateCourse = async(req, res, next)=> {
    try {
        const {title, description, instructor} = req.body; 
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
        if(!course) {
            return next(new ApiError(404, "Course not found"));
        }
        
        if(req.user.role !== 'admin') {
             return next(new ApiError(400, "Only admin can update courses"));
        }
        
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {$set:{title, description, instructor}},
            {new:true}
        )

        return res.status(200).json(new ApiResponse(true, {course:updatedCourse}, "Course updated"));
    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const deleteCourse = async(req, res, next)=> {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
        if(!course) {
            return next(new ApiError(404, "Course not found"));
        }
        
        if(req.user.role !== 'admin') {
             return next(new ApiError(400, "Only admin can delete courses"));
        }

        await Course.findByIdAndDelete(courseId);
        return res.status(200).json(new ApiResponse(true, {}, "Course deleted"));
    } catch (error) {
        console.error(error);
        next(error);
    }
}
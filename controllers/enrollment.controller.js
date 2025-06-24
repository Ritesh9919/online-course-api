
import {Course} from '../models/course.model.js'
import { Enrollment } from '../models/enrollment.model.js'
import {ApiError} from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'


export const enrollInCourse = async(req, res, next)=> {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
        if(!course) {
            return next(new ApiError(404, "Course not found"));
        }
        // check if already enrolled
        const existingEnrollment = await Enrollment.findOne({student:req.user._id, course:courseId});
        if(existingEnrollment) {
            return next(new ApiError(400, "Already enrolled in this course"));
        }

        // new course enrollment
        const enrollment = await Enrollment.create({student:req.user._id, course:courseId});
        return res.status(201).json(new ApiResponse(true, {enrollment}, "Enrollment successfull"));
    } catch (error) {
        console.error(error);
        next(error);
    }
}


export const getEnrolledCourses = async(req, res, next)=> {
    try {
        const enrollments = await Enrollment.find({student:req.user._id}).populate({
            path:"course",
            select:"title description instructor",
            populate:{
                path:"instructor",
                select:"name"
            }
        })
        return res.status(200).json(new ApiResponse(true, {enrollments}, "Enrolled courses fetched"));

    } catch (error) {
        console.error(error);
        next(error);
    }
}
import {User} from '../models/user.model.js'
import {ApiError} from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'



export const register = async(req, res, next)=> {
    try {
        const {name, email, password, role} = req.body;
        if(!name || !email || !password) {
            return next(new ApiError(400, "All fields are required"));
        }

        const user = await User.findOne({email});
        if(user) {
            return next(new ApiError(400, "User already exists"));
        }

        const newUser = await User.create({name, email, password, role});
        const registeredUser = await User.findById(newUser._id).select('-password');
        return res.status(201).json(new ApiResponse(true, {user:registeredUser}, "User registered"));
    } catch (error) {
        console.error(error);
        next(error);
    }
}


export const login = async(req, res, next)=> {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return next(new ApiError(400, "Both fields are required"));
        }

        const user = await User.findOne({email});
        if(!user) {
            return next(new ApiError(404, "User not found"));
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return next(new ApiError(401, "Invalid credential"));
        }

        const token = user.generateAccessToken();
        res.cookie("token", token, {
            httpOnly:true,
            secure:true
        })

        const loginUser = await User.findById(user._id).select('-password');

        return res.status(200).json(new ApiResponse(true, {user:loginUser}, "User logged in"))
    } catch (error) {
        console.error(error);
        next(error);
    }
}
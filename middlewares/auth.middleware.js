import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'
import { ApiError } from '../utils/apiError.js'


export const auth = async(req, res, next)=> {
  try {
    const {token} = req.cookies;
    
    if(!token) {
        return next(new ApiError(401, "Unauthorized request"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}
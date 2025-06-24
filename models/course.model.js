import mongoose from "mongoose";



const courseSchema = new mongoose.Schema({
   title:{
    type:String,
    required:true,
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
    unique: true
   },
   description:{
    type:String,
    required:true,
    trim: true,
    minlength: [20, 'Description must be at least 20 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
   },
   instructor:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
   },
   assignments: [{
    title: {
      type: String,
      required: [true, 'Assignment title is required'],
      trim: true,
      maxlength: [100, 'Assignment title too long']
    },
    description: {
      type: String,
      required: [true, 'Assignment description is required'],
      trim: true,
      maxlength: [500, 'Description too long']
    }
}
]
   
},{timestamps:true});


export const Course = mongoose.model("Course", courseSchema);
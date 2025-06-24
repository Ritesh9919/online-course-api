import mongoose from "mongoose";



const lessionSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,

},
content:{
    type:String,
    required:true
},
course:{
    type:mongoose.Types.ObjectId,
    ref:"Course",
    required:true
    
},
resources:[{type:String}],


},{timestamps:true});


export const Lesson = mongoose.model('Lesson', lessionSchema);
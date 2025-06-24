import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



const userSchema = new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 password:{
    type:String,
    required:true
 },
 role:{
    type:String,
    enum:["student","instructor", "admin"],
    
 }
},{timestamps:true});


userSchema.pre('save', async function(next) {
   if(!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
})


userSchema.methods.generateAccessToken = function() {
   return jwt.sign({id:this._id, role:this.role}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRY});
}

userSchema.methods.comparePassword = async function(password) {
   return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);
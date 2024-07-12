import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username : {
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email : {
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password : {
        type:String,
        required:true
    }
})

export const User = mongoose.model("User",userSchema)
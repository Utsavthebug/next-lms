import mongoose, {Schema} from "mongoose";
import { required } from "zod/v4/core/util.cjs";


const userSchema = new Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    email :{
        type:String,
        required:true
    },
    phone:{
        type : String,
        required : false
    },
    password : {
        type : String,
        required: true
    },
    bio : {
        type : String,
        required: false
    },
    socialMedia : {
        required:false,
        type : Object
    },
    profilePicture : {
        required:false,
        type: String
    },
    designation : {
        required:false,
        type: String
    },
})

export const User = mongoose.models.User ?? mongoose.model('User',userSchema)

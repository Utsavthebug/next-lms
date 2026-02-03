import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required: true
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

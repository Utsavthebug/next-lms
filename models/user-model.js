import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";


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
    role:{
        type : String,
        required:true
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

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }   
    try {
        const salt = await bcrypt.genSalt(5);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }   
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.models.User ?? mongoose.model('User',userSchema)

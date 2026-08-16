import mongoose, {Schema} from "mongoose";


const lessonSchema = new Schema({
    title : {
        type : String,
        required: true
    },
     description : {
        type : String,
        required: false
    },
     duration : {
        type : Number,
        required: true,
        default : 0
    },
     video_url : {
        type : String,
        required: false
    },
    active : {
        type: Boolean,
        required:true,
        default: false
    },
    access : {
       required : true,
       type : String,
       default:'private'
    },
    slug : {
        type : String,
        required:true
    },
    order: {
        type : Number,
        required : true
    }
})

export const Lesson = mongoose.models?.Lesson ?? mongoose.model('Lesson',lessonSchema)

import mongoose, {Schema} from "mongoose";


const moduleSchema = new Schema({
    title : {
        type : String,
        required: true
    },
     description : {
        type : String,
        required: false
    },
     active : {
        type : Boolean,
        required: true,
        default : false
    },
   
     slug : {
        type : String,
        required: true
    },
    course : {
        type: Schema.ObjectId,
        ref : 'Course'
    },
    lessonIds : {
       type : [Schema.ObjectId],
       ref : 'Lesson'
    },
    duration : {
        type : Number,
        required:false
    },
    order : {
        type : Number,
        required : true
    }
})

export const Module = mongoose.models?.Module ?? mongoose.model('Module',moduleSchema)

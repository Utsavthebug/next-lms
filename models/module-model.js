import mongoose, {Schema} from "mongoose";


const moduleSchema = new Schema({
    title : {
        type : String,
        required: true
    },
     description : {
        type : String,
        required: true
    },
     status : {
        type : String,
        required: true
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
       required : true,
       type : [String]
    },
    duration : {
        type : Number,
        required:true
    }
})

export const Module = mongoose.models.Module ?? mongoose.model('Module',moduleSchema)

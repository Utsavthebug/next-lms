import mongoose, {Schema} from "mongoose";


const reportSchema = new Schema({
    course : {
        type: Schema.ObjectId,
        ref : 'Course'
    },
    student : {
        type: Schema.ObjectId,
        ref : 'User'
    },  
     quizAssessment : {
        type: Schema.ObjectId,
        ref : 'Assessment'
    },          
    totalCompletedLessons : {
        type : Array,
        required:true
    },
    totalCompletedModules : {
        type : Array,
        required:true
    }
})

export const Report = mongoose.models.Report ?? mongoose.model('Report',reportSchema)
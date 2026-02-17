import mongoose, {Schema} from "mongoose";


const enrollmentSchema = new Schema({
    enrollment_date : {
        type : Date,
        required: true
    },
    completion_date : {
        type : Date,
        required: true
    },
    method:{
        type: String,
        required:true
    },
    status:{
        type: String,
        required:true
    },
    course : {
        type: Schema.ObjectId,
        ref : 'Course'
    },
    student : {
        type: Schema.ObjectId,
        ref : 'User'
    },
})

export const Enrollment = mongoose.models.Enrollment ?? mongoose.model('Enrollment',enrollmentSchema)

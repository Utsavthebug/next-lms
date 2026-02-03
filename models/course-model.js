import mongoose, {Schema} from "mongoose";


const courseSchema = new Schema({
    title : {
        type : String,
        required: true
    },
    subtitle : {
        type : String,
        required: true
    },
    descriptiom : {
        type : String,
        required: true
    },
    thumbnail : {
        type : String,
        required: true
    },
    moduesl : {
        required:true,
        type : Schema.ObjectId
    },
    price : {
        required:true,
        type: Number
    },
    active : {
        required:true,
        type: Boolean
    },
    category : {
        type: Schema.ObjectId,
        ref : 'Category'
    },
    instructor : {
        type: Schema.ObjectId,
        ref : 'User'
    },
    testimonial : {
        required:true,
        type: [Schema.ObjectId]
    },
    learning : {
        type : [String],
        required:true
    },
    createdOn :{
        required:true,
        type : Date
    },
    modifiedOn : {
        required: true,
        type: Date
    }
})

export const Course = mongoose.models.Course ?? mongoose.model('Course',courseSchema)

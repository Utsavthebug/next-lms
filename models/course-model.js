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
    modules : [{
        ref : 'Module',
        type : Schema.ObjectId
    }],
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
},
{
    toJSON : {virtuals:true},
    toObject : {virtuals:true}
})

if (!courseSchema.virtuals?.testimonials) {
  courseSchema.virtual('testimonials', {
    ref: 'Testimonial',
    localField: '_id',
    foreignField: 'courseId',
  });
}

export const Course = mongoose.models.Course ?? mongoose.model('Course',courseSchema)

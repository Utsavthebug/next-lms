import mongoose, {Schema} from "mongoose";

const mediaSchema = new Schema({
    public_id : {
        type : String,
        required: true
    },
    url : {
        type : String,
        required: true
    },
    resource_type : {
        type : String,
        enum : ['image','video'],
        required: true,
        default: 'image'
    }
},
{
    _id : false,
})



const courseSchema = new Schema({
    title : {
        type : String,
        required: true
    },
    subtitle : {
        type : String,
        default: ''
    },
    description : {
        type : String,
        required: true
    },
    thumbnail : {
        type : mediaSchema,
        required: false
    },
    price : {
        required:true,
        default: 0,
        type: Number
    },
    active : {
        required:true,
        default: false,
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
    },
    quizSet: {
        type : Schema.ObjectId,
    },
    createdOn :{
        required:true,
        type : Date,
        default: Date.now()
    },
    modifiedOn : {
        required: true,
        type: Date,
        default: Date.now()
    }
},
{
    toJSON : {virtuals:true},
    toObject : {virtuals:true}
})

if(!courseSchema.virtuals?.modules){
    courseSchema.virtual('modules',{
        ref: 'Module',
        localField:'_id',
        foreignField:'course'
    })
}

if (!courseSchema.virtuals?.testimonials) {
  courseSchema.virtual('testimonials', {
    ref: 'Testimonial',
    localField: '_id',
    foreignField: 'courseId',
  });
}

export const Course = mongoose.models.Course ?? mongoose.model('Course',courseSchema)

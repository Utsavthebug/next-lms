import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module-model";
import { User } from "@/models/user-model";
import { Testimonial } from "@/models/testimonial-model";
import { replaceMongoIdInArray,replaceMongoIdInObject } from "@/lib/convertData";
import { Enrollment } from "@/models/enrollment-model";
import { getEnrollmentForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourses() {
    const courses = await Course.find({}).select(['title','subtitle','thumbnail','modules','price','category','instructor']).populate({
        path : "category",
        model : Category

    }).populate({
        path : "instructor",
        model : User
    }).populate({
        path : "modules",
        model : Module
    }).populate('testimonials')

     return courses
}

export async function getCourseDetails(id) {
    const course = await Course.findById(id).populate({
        path : "category",
        model : Category
    }).populate({
        path : "instructor",
        model : User
    }).populate({
        path : "modules",
        model : Module
    }).populate({
        path:'testimonials',
        populate : {
            path : 'user',
            model : User
        }
    }).lean()

     return course
}

export async function getCourseDetailsByInstructor(instructorId){
 const courses = await Course.find({
    instructor : instructorId
 }).lean()

 const enrollments = await Promise.all(
    courses.map(async(course)=>{
        const enrollment = await getEnrollmentForCourse(course._id.toString())
        return enrollment
    })
 );

 const totalEnrollments = enrollments.reduce((item,currentValue)=> {
  return item.length + currentValue  
 },0)


 const testimonials = await Promise.all(
     courses.map(async(course)=>{
        const testimonial = await getTestimonialsForCourse(course._id.toString())
        return testimonial;
    })
 )

  const totalTestimonials = testimonials.flat()

  const avgRating = (totalTestimonials.reduce(function(acc,obj){
    return acc + obj.rating;
  },0))/ totalTestimonials.length;

  return {
    'courses': courses.length,
    'enrollments':totalEnrollments,
    'reviews' : totalTestimonials.length,
    'ratings':avgRating.toPrecision(2)
  }
}
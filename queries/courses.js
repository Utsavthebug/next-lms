import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module-model";
import { User } from "@/models/user-model";
import { Testimonial } from "@/models/testimonial-model";
import { replaceMongoIdInArray,replaceMongoIdInObject } from "@/lib/convertData";

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
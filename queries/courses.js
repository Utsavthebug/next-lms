import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { User } from "@/models/user-model";

export async function getCourses() {
    const courses = await Course.find({}).populate({
        path : "category",
        model : Category

    }).populate({
        path : "instructor",
        model : User
    })
    return courses
}
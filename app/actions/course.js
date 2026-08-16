'use server'

import { getLoggedInUser } from "@/lib/loggedin-user"
import { Course } from "@/models/course-model"
import { create } from "@/queries/courses"


export async function createCourse(courseData) {
    try{
        const loggedinUser = await getLoggedInUser()
        courseData['instructor'] = loggedinUser._id
        const course = await create(courseData)
        return course
    }
    catch(error){
        throw new Error(error)
    }
}


export async function updateCourse(courseId, courseData) {
    try {
         await Course.findByIdAndUpdate(courseId, courseData, { new: true });
    }
    catch (error) {
        throw new Error(error)
    }
}


export async function changeCoursePublishState(courseId) {
    const course = await Course.findById(courseId);
    try {
        const res = await Course.findByIdAndUpdate(courseId, {active: !course.active},{lean:true});
        return res.active

    } catch (error) {
        throw new Error(error);
    }
}


export async function deleteCourse(courseId){
    try {
        await Course.findByIdAndDelete(courseId);  
    } catch (err) {
        throw new Error(err);
    }
}
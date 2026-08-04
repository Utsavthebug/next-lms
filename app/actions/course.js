'use server'

import { getLoggedInUser } from "@/lib/loggedin-user"
import { create } from "@/queries/courses"


export async function createCourse(courseData) {
    try{
        const loggedinUser = await getLoggedInUser()
        data['instructor'] = loggedinUser._id
        const course = await create(courseData)
        return course
    }
    catch(error){
        throw new Error(error)
    }
}
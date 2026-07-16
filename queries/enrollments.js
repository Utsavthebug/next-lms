import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Enrollment } from "@/models/enrollment-model";
import{Course} from "@/models/course-model";

export async function getEnrollmentForCourse(courseId) {
    const enrollments = await Enrollment.find({
        course:courseId
    }).lean()
    return replaceMongoIdInArray(enrollments);
}


export async function enrollForCourse(courseId,userId,paymentMethod) {
    //check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
        course:courseId,
        student:userId
    }).lean()

    if(existingEnrollment){
        throw new Error("User already enrolled for this course");
    }
    
    const newEnrollment = {
        course:courseId,
        student:userId,
        method:paymentMethod,
        enrollment_date : Date.now(),
        status:'not-started'
    }

    try {
    const response = await Enrollment.create({
        ...newEnrollment
    })

    return response;
        
    } catch (error) {
       throw new Error(error) 
    }
}

export async function getEnrollmentsForUser(userId) {
    
    try {
    const enrollments = await Enrollment.find({
        student:userId
    }).populate({
        path:'course',
        model:Course,
    }).lean()

    return replaceMongoIdInArray(enrollments);
}
 catch (error) {
    throw new Error(error) 
 }
}


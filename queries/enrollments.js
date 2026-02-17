import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Enrollment } from "@/models/enrollment-model";

export async function getEnrollmentForCourse(courseId) {
    const enrollments = await Enrollment.find({
        course:courseId
    }).lean()
    return replaceMongoIdInArray(enrollments);
}
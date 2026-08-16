import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Testimonial } from "@/models/testimonial-model";

export async function getTestimonialsForCourse(courseId) {
    console.log(courseId)
    const testimonials = await Testimonial.find({
        courseId
    }).populate('user').lean()
    return replaceMongoIdInArray(testimonials);
}
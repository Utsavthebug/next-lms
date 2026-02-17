import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Testimonial } from "@/models/testimonial-model";

export async function getTestimonialsForCourse(courseId) {
    const testimonials = await Testimonial.find({
        courseId
    }).lean()
    return replaceMongoIdInArray(testimonials);
}
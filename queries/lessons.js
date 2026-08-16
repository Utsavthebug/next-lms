import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/models/lessons.model";

export async function getLesson(lessonId) {
    const lesson = await Lesson.findById(lessonId).lean()
    return replaceMongoIdInObject(lesson);
}

export async function create(data) {
    try {
        const lesson = await Lesson.create(data)
        return JSON.parse(JSON.stringify(lesson))
    } catch (error) {
        throw new Error(error)
    }
}


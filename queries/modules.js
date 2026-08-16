import { Module } from "@/models/module-model"
import { Lesson } from "@/models/lessons.model"
import { replaceMongoIdInObject } from "@/lib/convertData"

export async function create(data) {
    try {
    const module = await Module.create(data)
    return module
} catch (error) {
    throw new Error(error)
}
}

export async function getModule(moduleId) {
    try {
        const module = await Module.findById(moduleId).populate({
            path:"lessonIds",
            model : Lesson
        }).lean()

        return replaceMongoIdInObject(module)

    } catch (error) {
        throw new Error(error)
    }
}
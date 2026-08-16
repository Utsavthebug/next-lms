'use server'
import { Lesson } from "@/models/lessons.model";
import { Module } from "@/models/module-model";
import { create } from "@/queries/lessons";
import mongoose from "mongoose";


export async function deleteLesson(lessonId, moduleId) {
  try {
    await Promise.all([
      Lesson.findByIdAndDelete(lessonId),

      Module.findByIdAndUpdate(moduleId, {
        $pull: {
          lessonIds: new mongoose.Types.ObjectId(lessonId),
        },
      }),
    ]);
  } catch (error) {
    console.error("Error deleting lesson:", error);
    throw new Error(error);
  }
}



export async function createLesson(data) {
    try {
        const title = data.get('title')
        const slug = data.get('slug')
        const moduleId = data.get('moduleId')
        const order = data.get('order')

        const createdLesson = await create({title,slug,order})

        const module = await Module.findById(moduleId)
        module.lessonIds.push(createdLesson._id)
        await module.save()

        return JSON.parse(JSON.stringify(createdLesson))
    }

    catch (error) {
        throw new Error(error)
    }
}


export async function reOrderLessons(data) {
    try {
        await Promise.all(
            data.map(async (lessonData) => {
                await Lesson.findByIdAndUpdate(lessonData.id, { order: lessonData.position })
            }))
            
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateLesson(lessonId, updatedData) {
    try {
        await Lesson.findByIdAndUpdate(lessonId, updatedData);
    } catch (error) {
        throw new Error(error);
    }
    }


export async function changeLessonPublishState(lessonId){
    try {
    const lesson = await Lesson.findById(lessonId)
    const res = await Lesson.findByIdAndUpdate(lessonId, {
        active : !lesson.active
        },
        {
            lean : true
        }
    );

    return res.active
        
    } catch (error) {
        throw new Error(error)
    }
}
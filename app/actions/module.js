'use server'
import { create } from "@/queries/modules";
import { Module } from "@/models/module-model";


export async function changeModulePublishState(moduleId){
 const module = await Module.findById(moduleId)
 
 try {
    const res = await Module.findByIdAndUpdate(moduleId,{
      active : !module.active
    }, {
      lean:true,
      new:true
    })

    return res.active

 } catch (error) {
  throw new Error(error)  
 }
}


export async function deleteModule(moduleId,courseId) {
  try {
    await Module.findByIdAndDelete(moduleId)

  } catch (error) {
    throw new Error(error)
  } 
}


export async function createModule(data) {
    try {
        const title = data.get('title');
        const slug = data.get('slug');
        const course = data.get('courseId');
        const order = data.get('order');

        const createdModule = await create({
            title,
            slug,
            course,
            order,
        });

        return    JSON.parse(JSON.stringify(createdModule));
    } catch (error) {
        throw new Error(error);
    }
}


export async function reOrderModules(data) {
  try {
    await Module.bulkWrite(
      data.map((element) => ({
        updateOne: {
          filter: { _id: element.id },
          update: { $set: { order: element.position } },
        },
      }))
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

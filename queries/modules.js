import { Module } from "@/models/module-model"

export async function create(data) {
    try {
    const module = new Module(data)
    await module.save()
    return module
} catch (error) {
    throw new Error(error)
}
}
import mongoose from "mongoose";

export async function dbConnect() {
    try {
        console.log(process.env.MONGODB_CONNECTION_STRING)
        const conn = await mongoose.connect(String(process.env.MONGODB_CONNECTION_STRING));
        return conn;
    } catch (error) {
        console.log(error)
    }
}
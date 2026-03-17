import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/models/user-model";

export async function getUserByEmail(email) {
    const user = User.findOne({
        email:email
    }).lean()

    return replaceMongoIdInObject(user)
}
import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/models/user-model";

export async function getUserByEmail(email) {
    const user =await User.findOne({
        email:email
    }).lean()

    return replaceMongoIdInObject(user)
}

export async function validatePassword(email, password) {
    const user = await getUserByEmail(email);
    const isMatch = await user.comparePassword(password,user.password);
    return isMatch; 
}

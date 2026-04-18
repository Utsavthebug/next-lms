'use server'

import { User } from "@/models/user-model";
import { getUserByEmail, validatePassword } from "@/queries/users";
import { revalidatePath } from "next/cache";

export async function updateUserInfo(userEmail,updatedData) {
    try {
        const filter = { email: userEmail };
        const update = { $set: updatedData };
        await User.findOneAndUpdate(filter, update);
        revalidatePath('/account');

    } catch (error) {
        throw new Error(error);
    }
}


export async function changePassword(userEmail,oldPassword,newPassword) {   
    try {   
       
            const isMatch = await validatePassword(userEmail, oldPassword);
            if (!isMatch) { 
                throw new Error('Old password is incorrect');
            }  
            const user = await getUserByEmail(userEmail); 
            user.password = newPassword;
            await user.save();
            revalidatePath('/account');
     } catch (error) {
         throw new Error(error);
     }
}

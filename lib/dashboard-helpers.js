'use server'
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { getCourseDetailsByInstructor } from "@/queries/courses";

export async function getInstructorDashboardData(){
    try {
        const session = await auth();
        const instructor = await getUserByEmail(session?.user?.email);

        const data = await getCourseDetailsByInstructor(instructor._id,true);

        return data;
    }
     catch (error) {
        console.error("Error fetching instructor dashboard data:", error);
        throw new Error("Failed to fetch instructor dashboard data");
    }

}
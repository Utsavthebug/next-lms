'use server'
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { getCourseDetailsByInstructor } from "@/queries/courses";

const COURSE_DATA = "courses";
const ENROLLMENT_DATA = "enrollments"
const REVIEW_DATA = "review"


export async function getInstructorDashboardData(dataType){
    try {
        const session = await auth();
        const instructor = await getUserByEmail(session?.user?.email);

        const data = await getCourseDetailsByInstructor(instructor.id,true);
        return data?.[dataType];
    }
     catch (error) {
        console.error("Error fetching instructor dashboard data:", error);
        throw new Error("Failed to fetch instructor dashboard data");
    }

}
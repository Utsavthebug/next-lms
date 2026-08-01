'use server'
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { getCourseDetails, getCourseDetailsByInstructor } from "@/queries/courses";
import { getEnrollmentForCourse } from "@/queries/enrollments";
import { getReport } from "@/queries/report";

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
        throw new Error("Failed to fetch instructor dashboard data");
    }

}


export async function getEnrollmentDashboardData(){
    try {
        const session = await auth();
        const instructor = await getUserByEmail(session?.user?.email);
        
        const data = await getCourseDetailsByInstructor(instructor.id,true)

        const enrollments = data?.['enrollments']



        const populatedEnrollments =  await Promise.all(enrollments.map(async(enrollment)=>{
            const userData = enrollment?.user
            enrollment['studentName'] = `${userData?.first_name} ${userData?.last_name}`
            enrollment['studentEmail'] = userData?.email


            //update quiz and progress Info

            const filter = {
                course: enrollment?.course,
                student : enrollment?.student?._id
            }

            const report = await getReport(filter)

            enrollment['progress'] = 0;
            enrollment['quizMark'] = 0;

            if(report) {
                const course = await getCourseDetails(enrollment?.course?._id)


                const totalModules = course?.modules?.length;
                const totalCompletedModules = course?.totalCompletedModules?.length

                const progress = (totalCompletedModules/totalModules) * 100;

                enrollment['progress'] = progress;

                //calculate quiz marks quizAssessment
                const quizzes = report?.quizAssessment?.assessments;

                const quizzesTaken = quizzes?.filter(quiz => quiz?.attempted);

                const totalCorrect = quizzesTaken?.map(quiz => {
                    const item  = quiz?.options
                    
                    return item?.filter(o => {
                        return o?.isCorrect && o?.isSelected
                    })
                }).filter(item => item?.length > 0).flat();


                const marksFromQuizzes = totalCorrect?.length * 5;
                enrollment['quizMark'] = marksFromQuizzes;

            }

            return enrollment;
            
        }))

        console.log("Populated Enrollments", populatedEnrollments)


        return populatedEnrollments;
    } catch (error) {

        console.error(error);
        // throw new Error("Failed to fetch enrollment dashboard data");
    }  
}
import { auth } from "@/auth";
import EnrolledCourseCard from "@/components/enrolled-coursecard";
import {getEnrollmentsForUser} from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";

async function EnrolledCourses() {
	const session = await auth();

	if (!session?.user) {
		redirect("/login");
	}

	const loggedInUser = await getUserByEmail(session.user.email);

	const enrollments = await getEnrollmentsForUser(loggedInUser._id);


	return (
		<div className="grid sm:grid-cols-2 gap-6">
			{enrollments && enrollments.length > 0 ? (
				enrollments.map((enrollment) => (
					<EnrolledCourseCard 
					key={enrollment._id} 
					enrollment={enrollment} />
				))
			) : (
				<p className="font-bold text-red-700">No enrollments found!</p>
			)}
		</div>
	);
}

export default EnrolledCourses;

import { getCourseDetails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getEnrollmentDashboardData } from "@/lib/dashboard-helpers";
import { serializeData } from "@/lib/serialize";

const EnrollmentsPage = async ({params}) => {
  const {courseId} = await params;
  const course = await getCourseDetails(courseId)
  const enrollments =  serializeData(await getEnrollmentDashboardData(courseId));

  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={enrollments} />
    </div>
  );
};

export default EnrollmentsPage;

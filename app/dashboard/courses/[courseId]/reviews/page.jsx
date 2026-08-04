import { getTestimonialsForCourse } from "@/queries/testimonials";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getCourseDetails } from "@/queries/courses";
import { serializeData } from "@/lib/serialize";

const ReviewsPage = async ({params}) => {
  const {courseId} = await params

  const course = await getCourseDetails(courseId)
  const reviews  =  serializeData(await getTestimonialsForCourse(courseId))


  return (
    <div className="p-6">
      <h2 className="text-3xl text-gray-700 font-bold">{course?.title}</h2>
      <DataTable columns={columns} data={reviews} />
    </div>
  );
};

export default ReviewsPage;

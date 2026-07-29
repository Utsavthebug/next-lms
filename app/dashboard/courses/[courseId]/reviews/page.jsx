import { getTestimonialsForCourse } from "@/queries/testimonials";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getCourseDetails } from "@/queries/courses";
import { serializeData } from "@/lib/serialize";

const ReviewsPage = async ({params}) => {
  const {courseId} = await params

  const course = await getCourseDetails(courseId)
  const reviews  =  serializeData(await getTestimonialsForCourse(courseId))


  console.log('reviews',reviews)
  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={reviews} />
    </div>
  );
};

export default ReviewsPage;

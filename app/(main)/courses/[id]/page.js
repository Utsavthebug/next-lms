
import { getCourseDetails } from "@/queries/courses";
import CourseDetailIntro from "./_components/CourseDetailIntro";
import CourseDetails from "./_components/CourseDetails";
import RelatedCourses from "./_components/RelatedCourses";
import Testimonials from "./_components/Testimonials";

const SingleCoursePage = async({
  params 
}) => {
  const {id} = await params;
  const course = await getCourseDetails(id)

  return (
    <>
    <CourseDetailIntro
     title={course?.title}
     subtitle={course?.subtitle} 
     thumbnail={course?.thumbnail}
    />

    <CourseDetails/>

    {
      course?.testimonials && <Testimonials testimonials={course?.testimonials}/>
    }
     
    {/* Releated Course */}
      <RelatedCourses/>
     
    </>
  );
};
export default SingleCoursePage;

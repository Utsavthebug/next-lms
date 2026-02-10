
import CourseDetailIntro from "./_components/CourseDetailIntro";
import CourseDetails from "./_components/CourseDetails";
import RelatedCourses from "./_components/RelatedCourses";
import Testimonials from "./_components/Testimonials";

const SingleCoursePage = () => {
  return (
    <>
    <CourseDetailIntro/>

    <CourseDetails/>
     
     <Testimonials/>
      {/* Releated Course */}

      <RelatedCourses/>
     
    </>
  );
};
export default SingleCoursePage;

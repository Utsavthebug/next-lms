import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
import auth from "@/auth"
import { redirect } from "next/navigation";
import {getUserByEmail} from "@/queries/users";
import { getCourseDetailsByInstructor } from "@/queries/courses";
import DashboardCard from "./_components/dashboard-card";

const DashboardPage = async () => {
  const session = await auth()

  if(!session?.user)  redirect("/login");

  const instructor = await getUserByEmail(session?.user?.email)

  if(instructor?.role!== "instructor") redirect("/login")

  const courseStatus = await getCourseDetailsByInstructor(instructor?._id)
  


  return (
    <div className="p-6">
      
      <p className="pb-4 text-grey-800">
        Login as: <strong>{courseStatus?.instructorName}</strong>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* total courses */}

      <DashboardCard
       header="Total Courses"
        value={courseStatus?.courses} 
      />

       
        {/* total enrollments */}
      <DashboardCard
       header="Total Enrollments"
        value={courseStatus?.enrollments}
      />
        {/* total revenue */}
      <DashboardCard
       header="Total Revenue"
        value={formatPrice(courseStatus?.revenue)}
        />
      </div>
      {/*  */}
    </div>
  );
};

export default DashboardPage;

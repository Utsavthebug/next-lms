import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { enrollForCourse } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";


const Success =async ({
  searchParams
}) => {

  const {session_id,courseId} = await searchParams

  if(!session_id) {
    throw new Error("Please provide a valid session id that start with cs_")
  }

  const userSession = await auth()

  console.log(userSession,'user Session');

  if(!userSession?.user?.email) {
   redirect('/login')
  }

  const course = await getCourseDetails(courseId)
  const loggedInUser = await getUserByEmail(userSession?.user?.email)



  const checkoutSession = await stripe.checkout.sessions.retrieve(
    session_id,{
      expand:['line_items','payment_intent']
    }
  );

  const paymentIntent = checkoutSession?.payment_intent
  const paymentStatus = paymentIntent?.status

  //check if payment is success or not 
  const isPaymentSuccess = paymentStatus === "succeeded"

  const customerName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  const customerEmail  = loggedInUser.email;
  const productName = course?.title;

  if(isPaymentSuccess){
    //update data to enrollment
    const enrolled = await enrollForCourse(
      course?._id,
      loggedInUser?.id,
      "stripe"
    )

    //send emails to instrutor and students 

  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
     
     
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {
          isPaymentSuccess && (
            <>
             <CircleCheck className="w-32 h-32 bg-green-500 rounded-full p-0 text-white" />
        <h1 className="text-xl md:text-2xl lg:text-3xl">
          Congratulations! <strong>{customerName}</strong> You Enrollment was Successfulfor <strong>
            {productName}
          </strong>
        </h1>
            </>
          )
        }
          <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="#">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Success;

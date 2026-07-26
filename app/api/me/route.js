import { auth } from "@/auth";
import { dbConnect } from "@/service/mongo";

export const GET  = async (req, res) => {
  try {

    const session = await auth()

    if(!session?.user) {
        return new Response(JSON.stringify({ error: "User not authenticated" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } 

    await dbConnect();
    
    const user = await getUserByEmail(session.user.email);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }); 


  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch user data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";


import { toast } from "sonner";
 
import { useRouter } from "next/navigation";
import {  changeCoursePublishState, deleteCourse } from "@/app/actions/course";
import { useState } from "react";


export const CourseActions = ({courseId, isActive}) => {

      const [action, setAction] = useState(null);
    const [published, setPublished] = useState(isActive);
    const router = useRouter();

       async function handleSubmit(event) {
        event.preventDefault();
        //console.log(action);
    try { 
        switch (action) {
            case "change-active": {
          const activeState = await changeCoursePublishState(courseId);
                setPublished(!activeState);
                toast.success("The Course has been updated");
                router.refresh();
                break;
            }

            case "delete": {
                if (published) {
                    toast.error("A published Course can not be deleted. First unpublish it, then delete");
                } else {
                    await deleteCourse(courseId);
                    toast.success("The Course has been deleted successfully");
                    router.push(`/dashboard/courses`)
                }
                break;
            } 
            default:
                throw new Error("Invalid Lesson Action");
        }
    } catch (e) {
        toast.error(e.message);
    } 
    }


  return (
    <form onSubmit={handleSubmit}>
    <div className="flex items-center gap-x-2">
      <Button onClick={()=>setAction("change-active")} variant="outline" size="sm">
        {published ? "Unpublish" : "Publish"}
      </Button>

      <Button onClick={()=> setAction("delete")} size="sm">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
    </form>
  );
};

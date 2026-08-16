"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { changeLessonPublishState,deleteLesson } from "@/app/actions/lesson";
import { toast } from "sonner";

export const LessonActions = ({ isPublished = false,lesson,moduleId,onDelete }) => {
  const [action,setAction] = useState(null)

  const [published,setPublished] = useState(lesson?.active)

  const handleSubmit = async(e)=> {
    e.preventDefault()

    try {
      switch(action) {
        case "changed-active" : {
          const activeState = await changeLessonPublishState(lesson.id)
          setPublished(!activeState)
          toast.success("The lesson has been updated")
          break;
        }

        case "delete" : {
          if(published) {
                 toast.error("A published lesson can not be deleted. First unpublish it, then delete");
                 return;
          }
          else{
            await deleteLesson(lesson.id,moduleId)
            onDelete()
          }
          break;
        }

        default:
          throw new Error("Invalid Lesson Action");
      }
    } catch (error) {
     toast.error(error.message) 
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="flex items-center gap-x-2">
      <Button 
      onClick={()=>setAction("change-active")}
      variant="outline" 
      size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Button onClick={()=> setAction("delete")} size="sm">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
    </form>
  );
};

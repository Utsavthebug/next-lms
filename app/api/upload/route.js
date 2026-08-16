import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { updateCourse } from '@/app/actions/course'

export async function POST(request) {
  try {
    const formData = await request.formData()

    const file = formData.get('files')

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'next-lms',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
      )

      uploadStream.end(buffer)
    })

    const data = {
      public_id: result.public_id,
      url: result.secure_url,
      resource_type: result.resource_type,
    }

    const courseId = formData.get("courseId");
    await updateCourse(courseId, {thumbnail:data});


    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: 'Upload failed',
      },
      { status: 500 }
    )
  }
}

// import { NextResponse } from "next/server";
// import fs from 'fs';
// import { pipeline } from "stream"; 
// import { promisify } from "util";
// import { updateCourse } from "@/app/actions/course";

// const pump = promisify(pipeline);

// export async function POST(request, response) {
//     try {
//         const formData = await request.formData();
//         const file = formData.get("files");
//         const destination = formData.get("destination");

//         if (!destination) {
//             return new NextResponse("Destination not provided",{
//                 status: 500,
//             });
//         }

//          const filePath = `${destination}/${file.name}`;
//         await pump(file.stream(), fs.createWriteStream(filePath));

//          const courseId = formData.get("courseId");
//         await updateCourse(courseId, {thumbnail: file.name});

//         return new NextResponse(`File ${file.name} uploaded successfully  `, {
//             status:200,
//         })
//     } catch (error) {
//         return new NextResponse(`Error uploading file: ${error.message}`, {
//             status: 500,
//         });
//     }
// }
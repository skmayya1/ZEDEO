import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

interface uploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: unknown;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  
  try {
    const formdata = await req.formData();
    const file = formdata.get("file") as File | null;
    const title = formdata.get("title") as string;
    const deadline = (formdata.get("deadline") as string) || "";
    const editorValue = formdata.get("email") as string | null;

    if (!file || !file.type.startsWith('video/')) return NextResponse.json({ error: "Invalid file type. Please upload a video." }, { status: 401 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('uploading....');
    
    const result = await new Promise<uploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "zedeo",
          transformation: [{
            quality: "auto",
            fetch_format: "mp4"
          }]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as uploadResult);
        }
      );
      uploadStream.end(buffer);
    });
    console.log("Uploading Success,Storing in database")
    console.log(editorValue);
    console.log(session.user?.email);
    
    
    const editorData = await prisma.user.findUnique({
      where: { email: editorValue as string }
    });

    if (!editorData) return NextResponse.json({ error: "Editor not found" }, { status: 410 });

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });


     
    console.log("Editor data: ", editorData.id);
    console.log("User data: ", user.id);
    console.log(result.public_id);
    
    const video = await prisma.video.create({
      data: {
        title,
        deadline,
        editorName:editorData.name,
        videoUrl: result.public_id,
        editorId: editorData.id, 
        creatorId: user.id ,
        creatorName:user.name 
      },
    });
    

    return NextResponse.json({ video });
  } catch (error) {
    console.log("Uploading video failed: ", error);
    return NextResponse.json({ error: "Video upload failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get the URL and extract query parameters
  const { searchParams } = new URL(req.url);
  const videouri = searchParams.get('videouri');

  if (!videouri) {
    return NextResponse.json({ error: "Video URL not found" }, { status: 404 });
  }

  try {
    const videoUrl = cloudinary.url(videouri, { resource_type: "video" });
    console.log("Video URL: ", videoUrl);
    return NextResponse.json({ videoUrl }); 
  } catch (error) {
    console.error("Fetching video failed: ", error);
    return NextResponse.json({ error: "Video fetch failed" }, { status: 500 });
  }
}
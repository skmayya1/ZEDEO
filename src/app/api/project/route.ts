import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await auth();
    const userEmail = session?.user?.email;
 try {
    const userId = await prisma.user.findUnique({
        where:{
            email:userEmail as string
        }
    })
    console.log(userId);
    const data = await prisma.video.findMany({
        where:{
            creatorId:userId?.id 
        }
    })
    return NextResponse.json({data},{status:200})
    
    
 } catch (error) {
    console.log(error);
    return NextResponse.json({error},{status:500})
    
 }
    
}
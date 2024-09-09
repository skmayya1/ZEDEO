import { auth } from "@/auth";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"),{ssr:false});

const page = async () => {  
  const session = await auth()
  return (
    <div>
     <Navbar session={session}/>
    </div>
  )
}

export default page
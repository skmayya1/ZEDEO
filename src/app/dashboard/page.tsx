import { auth } from "@/auth"
import dynamic from "next/dynamic";
import { redirect } from "next/navigation"

const Navbar = dynamic(() => import("@/components/Navbar"),{ssr:false});


const page =async () => {
  const session = await auth()
  if(!session) {
    redirect('/auth/signin')
  }
  return (
    <div className="text-white  ">
      <Navbar session={session}/>
    </div>
  )
}

export default page
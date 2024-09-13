import { auth } from "@/auth"
import dynamic from "next/dynamic";
import { redirect } from "next/navigation"
const Navbar = dynamic(() => import("@/components/Navbar"),{ssr:false});
const Dashboard = dynamic(()=> import("@/components/Dashboard"),{ssr:false})

const page =async () => {
  const session = await auth()
  console.log(session?.user?.role);
  
  if(!session) {
    redirect('/auth/signin')
  }
  
  return (
    <div className="text-white h-screen w-full flex flex-col justify-between ">
      <Navbar session={session}/>
      <Dashboard/>
    </div>  )
}

export default page
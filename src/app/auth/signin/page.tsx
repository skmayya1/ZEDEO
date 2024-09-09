import { auth, signIn } from '@/auth'
import { redirect } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import imgurl from "@/assets/logo.png"
import Image from 'next/image';

const page = async () => {
    const session = await auth()
    if(session) return redirect('/ ')
  return (
    <div className='h-screen w-full flex items-center justify-center p-5 flex-col relative text-zinc-300 font-sans '>
        <Image className='absolute top-52' src={imgurl} alt="ZEDEO" width={100} height={100} />
        <form className='h-[40%] w-full  rounded-xl flex flex-col justify-center items-center  gap-14
        sm:border-zinc-900 sm:border sm:w-[30%]
        '
            action={async () => {
            "use server"
            await signIn("google")
            }}
        >   
            <div className='flex flex-col justify-between items-center gap-3 '>
                <h1 className='text-2xl font-semibold'>Sign In</h1>
                <p className='font-light text-zinc-400 text-sm'>New here , Lets get started with your 30 days free trial</p>
            </div>
            <button className='flex gap-3 text-base px-20 sm:px-28 py-2.5 items-center justify-center font-sans rounded-xl border border-zinc-900 font-medium transition-all ease-in-out   hover:bg-[#070707] '
             type="submit"><FcGoogle size={24}/> Sign in with Google</button>
             <div className='text-center text-zinc-500 text-xs'>By signing in,I accept companys <div className='underline cursor-pointer'>term & conditions</div></div>
        </form>
        <p className='absolute bottom-10 text-sm font-light text-zinc-500 text-center'>*Make sure your Given email & youtube registered email are same!</p>
   </div>
  )
}

export default page
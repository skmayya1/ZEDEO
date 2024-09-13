import { auth, signOut } from '@/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page =  async () => {
    const session = await auth()
    if(!session){
        redirect('/auth/signin')
    }
  return (
    <div className='h-screen w-full flex items-center justify-center '>
     <div className="h-[24%] w-[26%] rounded-xl bg-[#18181B] border justify-evenly items-center flex flex-col border-zinc-800">
       <div className='text-center flex flex-col gap-2 px-3'>
       <h1 className='text-white text-2xl font-semibold'>Log Out</h1>
       <p className='text-[#858383] text-sm font-light'> Are you sure you want to log out? Logging out will end your current session and you will need to log in again to access your account.</p>
       </div>
    <form className='h-fit w-fit flex text-black gap-5 '
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Link className='bg-white px-8 py-2 rounded-xl' href='/dashboard'>Cancel</Link>
      <button className='border border-red-500 text-red-600  px-8 py-2 rounded-xl' type="submit">Confirm</button>
    </form>
    </div>
    </div>
  )
}

export default page
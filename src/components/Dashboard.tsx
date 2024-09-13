import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import Projects from './Projects';
import NewProject from './NewProject';


const Dashboard = () => {  

  return (
    <div className='h-[89%] w-full  text-zinc-200 px-16 font-sans relative'>
       <div className="h-16 flex w-full justify-between items-center">
          <h1 className='text-2xl font-bold'>PROJECTS</h1>
           <NewProject/>
       </div>
      
       <div className="flex w-[20%] items-center border border-zinc-600 px-3 py-2 gap-3 rounded ">
        <IoSearchSharp size={24}/>
        <input maxLength={40} name='search' placeholder='Search by name' className='w-full bg-transparent outline-none placeholder:text-zinc-600 text-base'/>
       </div>
       <Projects/>
    </div>
  )
}

export default Dashboard  
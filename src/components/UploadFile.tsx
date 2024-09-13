"use client"
import React from 'react'
import { GoUpload } from "react-icons/go";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

const UploadFile = () => {
  return (
<Dialog>
  <DialogTrigger>
    <div className="tooltip" data-tip="Upload Final project">
      <button className="hover:bg-neutral-800 p-1 rounded-full">
        <GoUpload size={22} />
      </button>
    </div>
  </DialogTrigger>
  <DialogContent className="flex flex-col items-center gap-10"> {/* Add items-center to center horizontally */}
    <DialogHeader className=''>
      <DialogTitle className="">Upload Project</DialogTitle>
    </DialogHeader>
    <input type="file" className="file-input w-full max-w-xs text-center" />
    <DialogFooter className='self-end'>
      <button className="btn btn-primary bg-white hover:bg-slate-100 hover:scale-105 transition-all ease-in-out duration-100">
        Upload
      </button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default UploadFile





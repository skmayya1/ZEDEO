"use client"
import React, { FormEvent, useState } from 'react'
import { PiPlusBold } from 'react-icons/pi';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerDemo } from './DatePicker';
import { FileUpload } from './ui/file-upload';
import {  redirect } from 'next/navigation';

const NewProject = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [message, setmessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleFileUpload = (files: File | null) => {
    setFile(files);
    console.log(files);
  };
  const handleSubmit = async () => {
    // Validate the form
    if (!title || !email || !file || !deadline) {
      setmessage("Please fill all the fields before submitting.");
      
      return;
    }

    setLoading(true);
    setmessage(null); // Clear any previous errors

    // Create FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("email", email);
    formData.append("deadline", deadline.toISOString());

    try {
      // Send the data via POST request
      const response = await fetch("/api/file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the file");
      }

      const result = await response.json();

      setmessage("success")
      console.log("File uploaded successfully:", result);
      setFile(null)
      setTitle('')
      setEmail('')
      setDeadline(undefined)
      document.getElementById('close')?.click();
      redirect('/')
      
        
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-fit'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='flex gap-2 items-center bg-white text-black hover:bg-[#ffffff]'>
            <PiPlusBold size={15} /> NEW PROJECT
          </Button>
        </DialogTrigger>
        <DialogContent className="w-fit text-center text-white">
          <DialogHeader>
            <DialogTitle>NEW PROJECT</DialogTitle>
            <DialogDescription>
              Upload your video and choose your editor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Pro Name
              </Label>
              <Input
                onChange={(e: FormEvent) => setTitle((e.target as HTMLInputElement).value)}
                value={title}
                id="name"
                className="col-span-3 outline-none"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Editor email
              </Label>
              <Input
                onChange={(e: FormEvent) => setEmail((e.target as HTMLInputElement).value)}
                value={email}
                type='email'
                id="email"
                className="col-span-3 outline-none"
              />
            </div>
          </div>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-zinc-800 dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={(files: File[]) => handleFileUpload(files[0])} />
          </div>

          <DialogFooter className='flex items-center gap-3'>
            Deadline: <DatePickerDemo deadline={deadline} setDeadline={setDeadline} />
            <Button disabled={loading} onClick={handleSubmit} className='bg-white hover:bg-white text-black' type="submit">
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
          <DialogClose asChild>
            <Button id='close' className='bg-transparent h-0 w-0' type="button" variant="secondary">
              
            </Button>
          </DialogClose>
          {message && <p className="text-blue-500 ">{message}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewProject;

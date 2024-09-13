'use client'
import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { LiaCloudDownloadAltSolid } from "react-icons/lia";

import UploadFile from './UploadFile';

// Define the interface for Event
interface Event {
  videoId: string   
  title: string
  deadline: string
  videoUrl: string
  editorName: string
  editorId: string
  creatorId: string
  created: string
  status: string
  creatorName: string
}

// Define the structure of the response from the API
interface ApiResponse {
  data: Event[]
}

const Projects = () => {
  const [data, setData] = useState<Event[]>([])
  const [loading, setLoading] = useState<boolean>(true) 
  const [currentPage, setCurrentPage] = useState<number>(1) 
  const itemsPerPage = 10

  // Helper function to calculate time ago
  function timeAgo(timestamp: string): string {
    const now = new Date()
    const past = new Date(timestamp)
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

    const seconds = 60
    const minutes = 60
    const hours = 24
    const days = 7

    if (diffInSeconds < seconds) {
      return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < seconds * minutes) {
      const mins = Math.floor(diffInSeconds / seconds)
      return `${mins} minute${mins > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < seconds * minutes * hours) {
      const hrs = Math.floor(diffInSeconds / (seconds * minutes))
      return `${hrs} hour${hrs > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < seconds * minutes * hours * days) {
      const daysAgo = Math.floor(diffInSeconds / (seconds * minutes * hours))
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < seconds * minutes * hours * days * 4) {
      const weeksAgo = Math.floor(diffInSeconds / (seconds * minutes * hours * days))
      return `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`
    } else {
      const monthsAgo = Math.floor(diffInSeconds / (seconds * minutes * hours * days * 4))
      return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/project", { method: 'GET' })
        if (res.ok) {
          const fetchedData: ApiResponse = await res.json() // Cast response to ApiResponse type
          setData(fetchedData.data || []) // Set empty array if data is undefined
        } else {
          console.error("Failed to fetch data")
        }
      } catch (error) {
        console.error("Error fetching data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const DownloadFile = async (url: string) => {
    try {
      const res = await fetch(`/api/file?videouri=${encodeURIComponent(url)}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch file: ${res.statusText}`);
      }
      const data = await res.json();
      const a = document.createElement('a');
      a.href = data.videoUrl;
      a.download = "video.mp4"; // You can customize the file name
      a.click();
    } catch (error) {
      console.error("Error downloading file", error);
    }
  };
  

  // Pagination Logic
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage) // Ensure data is defined and check its length
  const currentData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || []

  // Handle next and previous page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table mt-4">
          {/* head */}
          <thead>
            <tr className='text-base'>
              <th></th>
              <th>Name</th>
              <th>Editor</th>
              <th>Creator</th>
              <th>Created</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-base font-light'>
            {loading ? (
              <tr>
                <td colSpan={81}>
                  <div className="flex justify-center items-center h-40">
                    <span className="loading loading-bars loading-md"></span>
                  </div>
                </td>
              </tr>
            ) : (
              currentData.map((e: Event, index: number) => (
                <tr key={e.videoId}>
                  <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                  <td>{e.title}</td>
                  <td>{e.editorName}</td>
                  <td>{e.creatorName}</td>
                  <td>{timeAgo(e.created)}</td>
                  <td>{format(parseISO(e.deadline), 'MMMM dd, yyyy')}</td>
                  <td className={`flex items-center gap-2  `}>
                    <div className={`h-1 w-1  rounded-full ${e.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}></div><div>{e.status}</div>
                  </td>
                  <td className=''>
                    <div className="tooltip mr-1" data-tip="Download base project">
                        <button onClick={async () => await DownloadFile(e.videoUrl)} className="hover:bg-neutral-800 p-1  rounded-full"><LiaCloudDownloadAltSolid size={22}/>
                        </button>
                    </div>
                    <UploadFile/>
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {!loading && data?.length>10 && (
          <div className="flex justify-center items-center mt-4">
            <button
              className="btn btn-sm mr-2"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2 font-light text-neutral-400">Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-sm ml-2"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects

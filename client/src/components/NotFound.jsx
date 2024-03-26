import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundPng from "../images/notfound.png";

export default function () {
  return (
    <div className='flex item-center justify-around min-h-screen w-full bg-[#8AA6A3] items-center '>
        <div className='flex flex-col items-center justify-around p-4 min-h-[500px] w-1/2'>
          <h1 className='font-bold text-black text-6xl'>404 Page Not Found</h1>
          <Link className='text-white text-2xl hover:bg-black rounded-md  p-4 font-bold mt-20' to="/">Return Home</Link>
        </div>
        <figure className='p-2 max-w-full max-h-full'>
          <img  src={NotFoundPng}/>
        </figure>
    </div>
  )
}

import React from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { TbError404 } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div className='w-full h-screen bg-black text-white'>
        <div className='flex items-center justify-center py-[200px] flex-col' >
            <span className='text-8xl text-red-500'><TbError404 /></span>
            <span className='flex gap-5 items-center text-xl font-bold text-red-500'><MdErrorOutline className='text-6xl' />Page not found.</span>
            <Link to={'/'} className='text-blue-500 py-10 font-semibold text-xl underline hover:underline-offset-4'>Click to back Home</Link>
        </div>
    </div>
  )
}

export default Error404
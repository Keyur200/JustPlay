import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { RiVideoAddLine } from 'react-icons/ri'
import { FaRegCircleUser } from 'react-icons/fa6'
import { GrLogout } from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useDispatch } from 'react-redux'
import { setSearch } from '../Redux/SearchSlice'
import { HiMiniBars2, HiMiniBars3 } from 'react-icons/hi2'
const Navbar = ({bar,setBar}) => {
    const [user, setUser] = useAuth()
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        fetch('https://just-play-api-eight.vercel.app/auth/logout', {
            method: "POST",
            credentials: "include"
        }).then(res => {
            navigate('/login')
            toast.success("Logout successfully.")
            setUser(null)
        })
    }

    return (
        <div className='w-full  px-1 md:px-6 flex items-center justify-between bg-[#0f0f0f] text-white'>
            <Link className=' flex gap-1 md:gap-5 items-center'>
                <HiMiniBars3 onClick={()=>setBar(!bar)} className='text-white hover:bg-[#505050]  p-3 rounded-full text-5xl focus:bg-[#707070]' />
                <Link to={`/`} className='text-red-500 text-md md:text-2xl'><img src="../logo.png" className='w-[80px] h-[80px]' alt="" /></Link>
            </Link>
            <div className='flex items-center'>
                <input type="text" onChange={(e) => dispatch(setSearch(e.target.value))} placeholder='Search' className='h-10 px-4 w-[100px] sm:w-[150px] md:w-[300px] lg:w-[400px] bg-transparent border border-[#303030] rounded-s-full outline-none focus:border-blue-500' />
                <FiSearch className='bg-[#222222] w-[40px] md:w-[80px] flex items-center justify-center rounded-e-full  py-2 h-[40px] ' />
            </div>
            {
                !user && (
                    <Link to={'/login'} className='border border-[#303030] hover:border-sky-900 text-blue-400 cursor-pointer hover:bg-sky-900 rounded-full flex items-center gap-2 py-2 px-4'>
                        <FaRegCircleUser className='text-2xl' />
                        <span className='text-sm font-semibold'>Sign in</span>
                    </Link>
                )
            }
            <Tooltip id='my-tooltip' />
            {
                user && (
                    <div className='flex gap-2 md:gap-6 items-center relative'>
                        <Link to='/uploadvideo'><RiVideoAddLine data-tooltip-id="my-tooltip"  data-tooltip-content="Upload a video" data-tooltip-place="left" className='text-5xl  rounded-full p-3 hover:bg-[#505050]  focus:outline-none focus:bg-[#808080] cursor-pointer' /></Link>
                        <div data-tooltip-id="my-tooltip"   data-tooltip-content="Profile" data-tooltip-place="left"  onClick={() => setToggle(!toggle)}>
                            <img src={user?.pic} className='w-[40px] h-[40px] rounded-full object-contain cursor-pointer border focus:border-blue-500' alt="pic" />
                        </div>
                        {

                            toggle && (
                                <div className='absolute bg-[#282828] text-white  w-[300px] top-1 right-12 z-40 rounded-xl'>
                                    <div className='flex gap-5 pt-5 px-5'>
                                        <img src={user?.pic} className='w-[50px] h-[50px] rounded-full object-contain cursor-pointer border focus:border-blue-500' alt="pic" />
                                        <div className='flex flex-col items-start'>
                                            <span className='uppercase'>{user?.name}</span>
                                            <span className='lowercase text-[#989898]'>@{user?.name}</span>
                                            <Link to={`/channel/${user?._id}`} reloadDocument className='text-blue-500 hover:underline'>View your channel</Link>
                                        </div>
                                    </div>
                                    <hr className='border border-[#606060] my-5' />
                                    <div className='flex flex-col pb-3'>
                                        <Link onClick={handleLogout} className='flex gap-4 py-2 items-center hover:bg-[#404040] px-5'><GrLogout className='text-xl' /> Sign out</Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }

        </div>
    )
}

export default Navbar
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import Sidebar from '../Components/Sidebar'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link, useNavigate } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import toast from 'react-hot-toast'
import Navbar from '../Components/Navbar'
const Subscription = () => {
  const [user, setUser] = useAuth()
  const [userdata, setUserdata] = useState()
  const [loading, setLoading] = useState()
  const [bar, setBar] = useState(false)
  const navigate = useNavigate()
  const getChannels = async () => {
    setLoading(true)
    await axios.get('https://just-play-api-eight.vercel.app/auth/subscribedchannel', { withCredentials: true })
      .then(({ data }) => {
        setUserdata(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getChannels()
  }, [])
  return (
    <div>
      <Navbar bar={bar} setBar={setBar} />
      <div className='w-full flex gap-4 bg-[#0f0f0f] text-white relative  py-5 h-screen lg:h-screen'>
        {
          bar && (
            <div className='lg:w-[18%] w-[300px] lg:static absolute left-0 z-50 bg-[#0f0f0f] px-5 overflow-y-auto max-h-[600px]'>
              <Sidebar />
            </div>
          )
        }
        <div className={`${!bar ? 'w-full px-2 md:px-10' : 'w-[80%]'} w-full px-0 md:px-10  `}>
           { !user && (<h2 className='text-red-500 text-[50px] font-bold flex items-center justify-center flex-col gap-4'>Please login first <Link to={'/login'} className='text-blue-500 text-[30px] hover:underline'>Login here</Link></h2>)}
           { !userdata?.subscribedUser?.length > 0 && (<h2 className='text-red-500 text-[50px] font-bold flex items-center justify-center flex-col gap-4'>You don't have any subscribed user now.</h2>)}
          <div className='flex flex-col gap-5'>
            {
              loading ? (
                <div className='flex items-center justify-center text-center  w-full'><img src="../loader.gif" alt="Loading..." className='w-[150px] h-[150px]' /></div>
              ) :
              userdata?.subscribedUser?.map((v) => (
                <div className='grid grid-cols-2'>
                  <div className='flex items-center justify-center'>
                    <img src={v?.pic} className=' w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain rounded-full overflow-hidden border-4 border-white p-1' alt="pic" />
                  </div>
                  <div className='grid grid-cols-2 pl-2'>
                    <div className=' flex flex-col items-start justify-start py-5'>
                      <span className='text-xl font-semibold text-nowrap '>{v.name}</span>
                      <span className='text-sm text-[#808080] mt-3 text-nowrap'>@{v.name}</span>
                      <span className='text-sm text-[#808080] mt-1 text-nowrap'>{v.email}</span>
                      <span className=' text-[#909090] font-semibold mt-2 text-nowrap'>{v.subscribers} subscribers</span>
                      <Link to={`/channel/${v?._id}`} className='text-blue-500 hover:underline text-nowrap mt-4 flex items-center gap-3 bg-[#303030] py-2 px-4 rounded-full hover:bg-[#404040]'>View a channel <BsArrowRight /></Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div >
    </div >
  )
}

export default Subscription
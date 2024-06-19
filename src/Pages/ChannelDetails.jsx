import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../Context/AuthContext'
import toast from 'react-hot-toast'
import { format } from 'timeago.js'
import Navbar from '../Components/Navbar'
const ChannelDetails = () => {
    const { id } = useParams()
    const [userdata, setUserdata] = useState('')
    const [user, setUser] = useAuth()
    const [videos,setVideos] = useState([])
    const [bar, setBar] = useState(false)
    const navigate = useNavigate()
    const getData = async () => {
        await axios.get(`https://just-play-api-eight.vercel.app/auth/channeldetails/${id}`, { withCredentials: true })
            .then(({ data }) => {
                setUserdata(data)
            })
    }

    const subscribe = async (id) => {
        await axios.put(`https://just-play-api-eight.vercel.app/auth/subscribe/${id}`, {}, { withCredentials: true })
            .then(({ data }) => {
                if (data.error) {
                    toast.error(data.error)
                    navigate('/login')
                } else {
                    setUserdata(data)
                    window.location.reload()
                }
            })
    }

    const unsubscribe = async (id) => {
        await axios.put(`https://just-play-api-eight.vercel.app/auth/unsubscribe/${id}`, {}, { withCredentials: true })
            .then(({ data }) => {
                if (data.error) {
                    toast.error(data.error)
                    navigate('/login')
                }
                setUserdata(data)
                window.location.reload()

            })
    }

    const getVideos = async() => {
        await axios.get(`https://just-play-api-eight.vercel.app/auth/channelvideo/${id}`, {withCredentials:true})
        .then(({data})=>{
            setVideos(data)
        })
    }

    const handleView = async (id) => {
        await axios.put(`https://just-play-api-eight.vercel.app/view/${id}`, { id }, { withCredentials: true })
          .then(({ data }) => {
            setVideos(data)
            getVideos()
          })
      }
    useEffect(() => {
        getData()
        getVideos()
    }, [])
    return (
        <div>
        <Navbar bar={bar} setBar={setBar} />
        <div className='w-full flex gap-4 bg-[#0f0f0f] text-white relative  py-5  h-auto md:h-screen'>
          {
            bar && (
              <div className='lg:w-[18%] w-[300px] lg:static absolute left-0 z-50 bg-[#0f0f0f] px-5 overflow-y-auto max-h-[600px]'>
                <Sidebar />
              </div>
            )
          }
          <div className={`${!bar ? 'w-full xp-2 md:px-10' : 'w-[80%]'} w-full px-0 md:px-10  `}>
                <div className='w-full flex-col'>
                    <div className='flex gap-6 md:gap-8 px-4 md:px-20'>
                        <div className=''>
                            <img src={userdata?.pic} className='w-[130px] h-[130px] md:w-[200px] md:h-[200px]  rounded-full object-contain overflow-hidden border-4 p-2 border-white' alt="" />
                        </div>
                        <div className='flex flex-col gap-2 items-start'>
                            <span className='text-4xl font-bold'>{userdata?.name}</span>
                            <span className='text-[#959595]'>@{userdata?.name}</span>
                            <span className='text-[#959595]'>{userdata?.subscribers} subscribers ꞏ {videos?.length} videos</span>
                            <span className='text-[#959595] flex gap-1 text-nowrap'>Welcome to <p className='font-bold text-[#999999]'>{userdata?.name}</p> channel.</span>
                            {
                                user?._id === userdata?._id ? '' :
                                    (
                                        user?.subscribedUser?.includes(userdata?._id) ?
                                            <button onClick={() => unsubscribe(userdata?._id)} className='py-2 mt-4 px-5 font-semibold ml-3 hover:bg-[#707070] text-white bg-[#505050]  rounded-full '>Unsubscribe</button>
                                            : <button onClick={() => subscribe(userdata?._id)} className='py-2 mt-4 px-5 font-semibold ml-3 hover:bg-gray-200 bg-white rounded-full text-black'>Subscribe</button>
                                    )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-5  px-10'>
                        <div className='text-xl font-semibold pb-2  mt-8 border-b-2 border-white text-start'>Videos</div>
                        <div className='w-full flex justify-center'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                                {
                                    videos?.map((v)=>(
                                        <Link to={`/video/${v.slug}`} onClick={() => handleView(v._id)} className='flex flex-col cursor-pointer justify-start mt-3'>
                                            <img src={v?.thumb} className='w-[270px]  object-contain overflow-hidden rounded-xl'  alt="" />
                                            <p className='text-start mt-1'> {v.title?.length > 28 ? v.title.substring(0,28)+"..." : v.title}</p>
                                            <div className='text-start text-sm font-semibold text-[#808080]'>{v.views} views ꞏ {format(v.createdAt)}</div> 
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ChannelDetails
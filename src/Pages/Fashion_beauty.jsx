import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import Sidebar from '../Components/Sidebar'
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux'
const Fashion_beauty = () => {
    const [user,setUser] = useAuth()
    const [videos,setVideos] = useState([])
    const [loading,setLoading] = useState(false)
    const [bar, setBar] = useState(false)
    const search = useSelector(state => state.search.search)

    const getVideos = async() => {
      setLoading(true)
      await axios.get('http://localhost:5000/getvideos')
      .then(({data})=>{
        setVideos(data.filter((i) => (i?.category?.name === "Fashion_beauty")))
        setLoading(false)
        console.log(data)
      })
    }

    const handleView =async (id) => {
      await axios.put(`http://localhost:5000/view/${id}`, {id} , {withCredentials:true})
      .then(({data})=>{
        setVideos(data)
        getVideos()
      })
    }
    useEffect(()=>{
      getVideos()
    },[])

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
      <div className={`${!bar ? 'w-full px-0 md:px-10' : 'w-[80%]'} w-full px-0 md:px-10  `}>
        {
          loading ? (
            <div className='flex items-center justify-center text-center  w-full'><img src="../loader.gif" alt="Loading..." className='w-[150px] h-[150px]' /></div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-2 ${!bar ? 'lg:grid-cols-4 ' : 'xl:grid-cols-3'} w-full gap-4`}>
              {

                videos?.filter((i) => {
                  return (i.title.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()) || i.createdBy?.name.toLowerCase().includes(search.toLowerCase()))
                })

                .map((v) => (
              <Link to={`/video/${v.slug}`} onClick={() => handleView(v._id)} className=' overflow-hidden cursor-pointer'>
                <div className='flex overflow-hidden items-center justify-center bg-gray-800 rounded-none md:rounded-xl cursor-pointer'>
                  <img src={v.thumb} alt="Thumbnail" className='h-auto overflow-hidden object-contain' />
                </div>
                <div className='flex gap-3 md:px-0 px-2 mt-3'>
                  <div>
                    <img src={v?.createdBy.pic} alt="pic" className='w-[40px] h-[40px] rounded-full object-contain' />
                  </div>
                  <div className='flex flex-col items-start'>
                    <span className='text-lg font-semibold'>{v.title?.length > 28 ? v.title.substring(0, 28) + ' ...' : v.title}</span>
                    <span className='text-[#939393]'>{v?.createdBy.name}</span>
                    <div className='text-[#939393]'>
                      <span>{v.views} views</span> ꞏ <span>{format(v.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
              ))
            }
            </div>
          )
        }
      </div>
    </div>
  </div>
  )
}

export default Fashion_beauty
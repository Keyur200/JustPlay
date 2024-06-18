import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi'
import { TbSend } from 'react-icons/tb'
import axios from 'axios';
import { format } from 'timeago.js'
import { useAuth } from '../Context/AuthContext.js'
import { toast } from 'react-hot-toast'
import InputEmoji from 'react-input-emoji'
import Navbar from '../Components/Navbar.jsx';
const VideoDetail = () => {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false)
    const [more, setMore] = useState(false)
    const [video, setvideo] = useState([])
    const [user, setUser] = useAuth()
    const [text, setText] = useState()
    const [comment, setComment] = useState([])
    const [show, setShow] = useState(false)
    const [videos, setVideos] = useState([])
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [likeLoad, setlikeLoad] = useState(false)
    const [dislikeLoad, setdislikeLoad] = useState(false)
    const [bar, setBar] = useState(false)
    const navigate = useNavigate()

    const getVideo = async () => {
        setLoading(true)
        await axios.get(`http://localhost:5000/videodetail/${slug}`)
            .then(({ data }) => {
                setvideo(data)
                setLoading(false)
            })
    }

    const getcomments = async () => {
        await axios.get(`http://localhost:5000/getcomment/${slug}`, { withCredentials: true })
            .then(({ data }) => {
                setComment(data)
                setShow(true)
            })
    }

    const handleSubmit = async (e) => {
        e?.preventDefault()
        const { data } = await axios.post('http://localhost:5000/addcomment', {
            text, vid: slug
        }, { withCredentials: true })
        if (data) {
            setComment(data)
            setText('')
            getcomments()
            getVideo()
        }
    }

    const getVideos = async () => {
        setLoading2(true)
        await axios.get('http://localhost:5000/getvideos')
            .then(({ data }) => {
                setVideos(data.filter((i) => (i?.slug !== slug)))
                setLoading2(false)
            })
    }

    const handleView = async (id) => {
        await axios.put(`http://localhost:5000/view/${id}`, { id }, { withCredentials: true })
            .then(({ data }) => {
                setVideos(data)
                getVideos()
            })
    }

    const likes = async (id) => {
        setlikeLoad(true)
        await axios.put(`http://localhost:5000/likes/${id}`, {}, { withCredentials: true })
            .then(({ data }) => {
                if (data.error) {
                    toast.error(data.error)
                    navigate('/login')
                } else {
                    setvideo(data)
                    getVideo()
                    setlikeLoad(false)
                }
            })
    }

    const dislikes = async (id) => {
        setdislikeLoad(true)
        await axios.put(`http://localhost:5000/dislikes/${id}`, {}, { withCredentials: true })
            .then(({ data }) => {
                if (data.error) {
                    toast.error(data.error)
                    navigate('/login')
                } else {
                    setvideo(data)
                    getVideo()
                    setdislikeLoad(false)
                }
            })
    }

    const subscribe = async (id) => {
        setLoading(true)
        await axios.put(`http://localhost:5000/auth/subscribe/${id}`, {}, { withCredentials: true })
            .then(({ data }) => {
                if (data.error) {
                    toast.error(data.error)
                    navigate('/login')
                } else {
                    setvideo(data)
                    getVideo()
                    window.location.reload()
                    setLoading3(false)
                }
            })
    }

    const unsubscribe = async (id) => {
        setLoading(true)
        await axios.put(`http://localhost:5000/auth/unsubscribe/${id}`, {}, { withCredentials: true })
            .then(({ data }) => {
                if (data.error) {
                    toast.error(data.error)
                    navigate('/login')
                }
                setvideo(data)
                getVideo()
                window.location.reload()
                setLoading3(false)
            })
    }

    useEffect(() => {
        getcomments()
    }, [])

    useEffect(() => {
        getVideo()
        getVideos()
    }, [])

    return (
        <div>
            <Link to={`/video/${slug}`}><Navbar bar={bar} setBar={setBar} /></Link>
            <div className='w-full flex gap-4 bg-[#0f0f0f] text-white relative  py-5 '>
                {
                    bar && (
                        <div className='lg:w-[18%] w-[300px] lg:static absolute left-0 z-50 bg-[#0f0f0f] px-5 overflow-y-auto max-h-[600px]'>
                            <Sidebar />
                        </div>
                    )
                }
                <div className={`${!bar ? 'w-full px-0 md:px-10' : 'w-[80%]'} w-full flex flex-col lg:flex-row px-0 md:px-10  `}>
                    <div className='w-full lg:w-8/12 '>
                        {
                            loading ? (
                                <div className='flex items-center justify-center text-center  w-full'><img src="../loader.gif" alt="Loading..." className='w-[150px] h-[150px]' /></div>
                            ) :
                                video?.map((v) => (
                                    <div className='px-4 w-full'>
                                        <div className='w-full'>
                                            <video src={v.video} autoPlay controls className='w-full rounded-xl overflow-hidden object-cover h-[220px] md:h-[400px] lg:h-[500px]' />
                                        </div>
                                        <div className='flex flex-col w-full items-start mt-3'>
                                            <span className='text-xl font-semibold uppercase'>{v.title}</span>
                                            <div className='flex w-full md:flex-row flex-col md:gap-0 gap-4 justify-between items-center'>
                                                <div className='flex gap-3 items-center mt-3'>
                                                    <div><img src={v?.createdBy?.pic} alt="pic" className=' object-contain rounded-full w-[40px] h-[40px]' /></div>
                                                    <Link to={`/channel/${v.createdBy?._id}`} className='flex flex-col items-start'>
                                                        <span className='font-semibold'>{v.createdBy?.name}</span>
                                                        <span className='text-xs text-[#939393]'>{v?.createdBy?.subscribers} subscribers</span>
                                                    </Link>
                                                    {
                                                        user?._id === v?.createdBy?._id ? '' :
                                                            (
                                                                user?.subscribedUser?.includes(v?.createdBy?._id) ?
                                                                    <button onClick={() => unsubscribe(v?.createdBy?._id)} className='py-2 px-5 font-semibold ml-3 hover:bg-[#707070] text-white bg-[#505050]  rounded-full '>Unsubscribe</button>
                                                                    : <button onClick={() => subscribe(v?.createdBy?._id)} className='py-2 px-5 font-semibold ml-3 hover:bg-gray-200 bg-white rounded-full text-black'>Subscribe</button>
                                                            )}
                                                </div>
                                                <div>
                                                    <div className='flex bg-[#272727]  rounded-full '>
                                                        <Link onClick={() => likes(v?._id)} className='flex items-center pl-3 py-2 gap-2 border-r-2 border-r-[#505050] rounded-s-full transition-all duration-300 hover:bg-[#404040] pr-2 cursor-pointer'>{likeLoad ? (<h2>Loading</h2>) : v?.likes?.includes(user?._id) ? <BiSolidLike className='text-xl' /> : <BiLike className='text-xl' />} <span>{likeLoad ? '' : `${v?.likes?.length} Like`}</span></Link>
                                                        <Link onClick={() => dislikes(v?._id)} className='flex items-center pr-3 py-2 gap-2 rounded-e-full transition-all duration-300 hover:bg-[#404040] pl-2 cursor-pointer'>{dislikeLoad ? (<h2>Loading</h2>) : v?.dislikes?.includes(user?._id) ? <BiSolidDislike className='text-xl' /> : <BiDislike className='text-xl' />}  <span>{dislikeLoad ? '' : `${v?.dislikes?.length} Dislike`}</span></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='bg-[#272727] py-4 px-3 my-5 rounded-xl'>
                                            <div className='flex gap-3'>
                                                <span>{v.views} views</span>
                                                <span>{format(v.createdAt)}</span>
                                            </div>
                                            <div className=' text-start text-sm mt-2'>{more ? v.desc : v.desc.substring(0, 200)} <button onClick={() => setMore(!more)} className='text-blue-500 font-semibold '>{more ? 'Less' : 'More'}</button></div>
                                        </div>
                                        <div className='w-full flex flex-col items-start'>
                                            <div className='text-xl font-bold'>{comment?.length} Comments</div>
                                            <div className='w-full flex gap-5 items-center px-6 py-5'>
                                                <img src={user?.pic} alt="pic" className=' rounded-full w-[40px] h-[40px] object-contain' />
                                                <form onSubmit={(e) => handleSubmit(e)} className=' flex justify-between w-full border-b-2 border-[#505050] focus:border-white '>
                                                    <input type="text" value={text} onChange={(e => setText(e.target.value))} placeholder='Add a comment...' className='w-full outline-none bg-transparent' />
                                                    <button type='submit' className='bg-[#505050] hover:bg-[#707070] pt-2 pb-1 px-4 text-lg rounded-t-xl'><TbSend /></button>
                                                </form>
                                            </div>
                                        </div>
                                        <div>
                                            {comment?.map((v) => (
                                                <div className='flex px-6 gap-5 mt-5'>
                                                    <div>
                                                        <img src={v?.userId?.pic} alt="pic" className=' rounded-full w-[40px] h-[40px] object-contain' />
                                                    </div>
                                                    <div className='flex items-start flex-col '>
                                                        <div className='flex gap-3 text-sm items-center'>
                                                            <span>@{v?.userId?.name}</span>
                                                            <span className='text-[#808080] text-xs'>{format(v.createdAt)} </span>
                                                        </div>
                                                        <span>{v?.text}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                    <div className='w-full lg:w-4/12'>
                        <div className='flex flex-col gap-3'>
                            {
                                loading2 ? (
                                    <div className='flex items-center justify-center text-center  w-full'><img src="../loader.gif" alt="Loading..." className='w-[150px] h-[150px]' /></div>
                                ) :
                                    videos?.map((v) => (
                                        <Link to={`/video/${v.slug}`} onClick={() => handleView(v._id)} reloadDocument className='flex gap-2 mt-3 lg:m-0 hover:bg-[#303030] rounded-xl p-2'>
                                            <div className='w-[40%]'>
                                                <img src={v.thumb} alt="" className='w-[300px] object-contain rounded-xl  ' />
                                            </div>
                                            <div className='w-[50%] flex flex-col  text-start'>
                                                <span className='font-semibold'>{v.title?.length > 39 ? v.title.substring(0, 40)+' ...' : v.title}</span>
                                                <span className='text-[#858585] text-sm'>{v.createdBy?.name}</span>
                                                <div className='text-[#858585] gap-1 text-sm'>
                                                    <span>{v.views} views ꞏ {format(v.createdAt)} </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoDetail
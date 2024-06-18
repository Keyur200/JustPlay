import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import axios from 'axios'
import { IoImage } from 'react-icons/io5'
import { RiVideoUploadLine } from 'react-icons/ri'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
const CreateVideo = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [thumb,setThumb] = useState()
    const [video,setVideo] = useState()
    const [title,setTitle] = useState()
    const [desc,setDesc] = useState()
    const [bar, setBar] = useState(false)
    const [category,setCategory] = useState()

    const getCategories = async () => {
        axios.get('http://localhost:5000/allcategory', { withCredentials: true })
            .then(({ data }) => {
                setCategories(data)
            })
    }

    const uploadThumb = async () => {
        const data = new FormData()
        data.append('file',thumb)
        data.append('upload_preset','play-images')

        try {
            let cloudName = "dxqcanezw";
            let resourceType = "image"
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

            const res = await axios.post(api, data)
            const {secure_url} = res.data
            return secure_url;
        } catch (error) {
            console.log(error)
        }
    }

    const uploadVideo = async () => {
        const data = new FormData()
        data.append('file',video)
        data.append('upload_preset','play-videos')

        try {
            let cloudName = "dxqcanezw";
            let resourceType = "video"
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

            const res = await axios.post(api, data)
            const {secure_url} = res.data
            return secure_url;
        } catch (error) {
            console.log(error)
        }
    }

    const handleVideo = async (e) => {
        e.preventDefault()
        try {

            const thumb = await uploadThumb()
            const video = await uploadVideo()
            const {data} = await axios.post('http://localhost:5000/uploadvideo', {title,desc,category,thumb,video}, { headers: {"Content-Type" :"application/json"}, withCredentials:true})
            if(data){
                toast.success(`${data?.videos?.title} created.`)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
        setThumb(null)
        setVideo(null)
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <div>
        <Navbar bar={bar} setBar={setBar} />
        <div className='w-full flex gap-4 bg-[#0f0f0f] text-white relative  py-5  h-auto'>
          {
            bar && (
              <div className='lg:w-[18%] w-[300px] lg:static absolute left-0 z-50 bg-[#0f0f0f] px-5 overflow-y-auto max-h-[600px]'>
                <Sidebar />
              </div>
            )
          }
          <div className={`${!bar ? 'w-full px-2 md:px-10' : 'w-[80%]'} w-full px-0 md:px-10  `}>
                <div className='w-full flex items-center justify-center'>
                    <form onSubmit={handleVideo} className='w-full px-5 md:px-20 pt-10 flex gap-5 flex-col'>
                        <textarea type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title *' className='border border-gray-900 focus:border-gray-700 outline-none bg-gray-800 rounded-sm py-2 px-4 w-full' />
                        <textarea type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} rows={"4"} placeholder='Description *' className='border border-gray-900 focus:border-gray-700 outline-none bg-gray-800 rounded-sm py-2 px-4 w-full' />
                        <select  onChange={(e)=>setCategory(e.target.value)} className='border border-gray-900 focus:border-gray-700 outline-none bg-gray-800 rounded-sm py-4 px-4 w-full'>
                            <option value="">Select category</option>
                            {categories?.map((v) => (
                                <option key={v._id} value={v._id}>{v.name}</option>
                            ))}
                        </select>
                        <div className='bg-gray-800 rounded-lg py-3 px-6 cursor-pointer flex flex-col items-center justify-center'>
                            <label className='w-full flex items-center justify-center  cursor-pointer'>
                                <div className='flex gap-6 items-center '>
                                    <IoImage className='text-[50px]' />
                                    <span className='text-lg font-semibold'> Upload Thumbnail Image</span>
                                </div>
                                <input type="file" onChange={(e)=>setThumb(e.target.files[0])} name='thumb' hidden accept='image/*' />
                            </label>
                            {
                                thumb && (
                                    <div className='mt-3 flex justify-center flex-col items-center'>
                                        <img src={URL.createObjectURL(thumb)} alt="" className='w-[200px] h-[150px] object-contain' />
                                        <span>{thumb.name}</span>
                                    </div>
                                )
                            }
                            <div>

                            </div>
                        </div>
                        <div className='bg-gray-800 rounded-lg py-3 px-6 cursor-pointer flex flex-col items-center justify-center'>
                            <label className='w-full flex items-center justify-center  cursor-pointer'>
                                <div className='flex gap-6 items-center '>
                                    <RiVideoUploadLine className='text-[50px]' />
                                    <span className='text-lg font-semibold'> Upload a Video</span>
                                </div>
                                <input type="file" onChange={(e)=>setVideo(e.target.files[0])} name='thumb' hidden accept='video/*' />
                            </label>
                            {
                                video && (
                                    <div className='mt-3 flex justify-center flex-col items-center'>
                                        <video controls src={URL.createObjectURL(video)} alt="" className='w-[200px] h-[150px] object-contain' />
                                        <span>{video.name}</span>
                                    </div>
                                )
                            }
                            <div>

                            </div>
                        </div>
                        <button type='submit' className='bg-red-500 rounded-lg py-5 text-2xl font-bold'>Upload</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default CreateVideo
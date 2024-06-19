import React, { useEffect, useState } from 'react'
import { RiUser6Line } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthContext'
const Register = () => {
    const [user,setUser] = useAuth()
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [pass, setpass] = useState()
    const [pic, setpic] = useState()
    const [loading,setLoading] = useState(false)
    const navigate =useNavigate()

    const uploadFile = async () => {
        const data = new FormData()
        data.append('file', pic)
        data.append("upload_preset", "play-user")

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
    const handleRegister = async (e) => {
        
        e.preventDefault()
        try {
            setLoading(true)
            const pic = await uploadFile()
            const { data } = await axios.post('https://just-play-api-eight.vercel.app/auth/register', {name,email,pass, pic}, { headers: {"Content-Type" :"application/json"}, withCredentials:true})
            if (data.error) {
                toast.error(data.error)
            }else{
                setLoading(false)
                navigate('/login')
                toast.success("Registration successfully.")
            }
            setpic(null)
        } catch (error) {
            console.log(error)
        }
    }

    const redirdecting = () => {
        if(user){
            return navigate('/')
        }
    }

    useEffect(()=>{
        redirdecting()
    },[user])
    return (
        <div className='w-full text-white bg-[#0f0f0f] h-screen'>
            <div className='w-full flex pt-20 items-center justify-center'>
                <form onSubmit={handleRegister} className=' flex flex-col gap-3 items-center justify-center py-8 px-10 rounded-md border border-gray-500 shadow-md shadow-slate-700'>
                    <h1 className='pb-5 text-3xl font-bold  w-full flex items-start '>Create a account</h1>
                    <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder='Enter Name' className='border border-gray-900 focus:border-gray-700 outline-none bg-gray-800 rounded-sm py-2 px-4 w-[300px] ' required />
                    <input type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' className='border border-gray-900 focus:border-gray-700 outline-none bg-gray-800 rounded-sm py-2 px-4 w-[300px] ' required />
                    <input type="password" value={pass} onChange={(e) => setpass(e.target.value)} placeholder='Password' className='border border-gray-900 focus:border-gray-700 outline-none bg-gray-800 rounded-sm py-2 px-4 w-[300px] ' required />
                    <label>
                        <div className='w-[300px] bg-gray-800 flex gap-3 items-center justify-center  border border-gray-700 rounded-sm cursor-pointer focus:border-gray-700 py-6'>
                            <RiUser6Line className='text-xl' />
                            <span className='text-lg font-semibold'>Upload a profile pic</span>
                        </div>
                        <input type="file" name='pic' accept='image/*' onChange={(e) => setpic(e.target.files[0])} hidden required />
                    </label>
                    {
                        pic && (
                            <div>
                                <div className='flex items-center justify-center flex-col gap-2'>
                                    <img src={URL.createObjectURL(pic)} alt=" picture" className='w-[100px] h-[100px] rounded-full object-contain bg-gary-600' />
                                    <span className='text-gray-500 '>{pic.name}</span>
                                </div>
                            </div>
                        )
                    }

                    {
                        !loading && (
                            <button type='submit' className='bg-red-600 w-[300px] py-4 mt-2 rounded-sm text-xl font-semibold hover:bg-red-700 transition-all duration-300 '>Register</button>
                        )
                    }
                    {
                        loading && (
                            <button disabled className='bg-red-300 w-[300px] py-4 mt-2 rounded-sm text-xl font-semibold hover:bg-red-700 transition-all duration-300 '>Loading...</button>
                        )
                    }
                    <div className='flex w-full items-center'>
                        <hr className='bg-gray-600 border border-gray-600 w-full' />
                        <span className='mx-3 text-sm'>OR</span>
                        <hr className='bg-gray-600 border border-gray-600 w-full' />
                    </div>
                    <div>
                        Already have an account? <Link to={'/login'} className='text-blue-500 underline'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
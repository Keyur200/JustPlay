import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'

const Login = () => {
    const [email, setemail] = useState()
    const [pass, setpass] = useState()
    const [user, setUser] = useAuth()
    const navigate = useNavigate()
    const [bar, setBar] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault()
        const { data } = await axios.post('https://just-play-api-eight.vercel.app/auth/login', { email, pass }, { withCredentials: true })
        if (data.error) {
            toast.error(data.error)
        } else {
            navigate('/')
            setUser(data.user)
            toast.success("Login successfully.")
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
        <div>
            <Navbar bar={bar} setBar={setBar} />
            <div className='w-full flex gap-4 bg-[#0f0f0f] text-white relative  py-5 h-auto lg:h-screen'>
                {
                    bar && (
                        <div className='lg:w-[18%] w-[300px] lg:static absolute left-0 z-50 bg-[#0f0f0f] px-5 overflow-y-auto max-h-[600px]'>
                            <Sidebar />
                        </div>
                    )
                }
                <div className={`${!bar ? 'w-full px-10' : 'w-[80%]'} w-full px-0 md:px-10  `}>
                    <div className='w-full text-white bg-[#0f0f0f] h-screen'>
                        <div className='w-full flex pt-20 justify-center '>
                            <form onSubmit={handleLogin} className=' flex flex-col gap-3   py-8 px-10 rounded-md border border-gray-500 shadow-md shadow-slate-700'>
                                <h1 className='pb-5 text-3xl font-bold w-full flex items-start '>Login </h1>
                                <input type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' className='border border-gray-900 focus:border-gray-700 outline-none bg-gray-800 rounded-sm py-2 px-4 w-[300px] ' />
                                <input type="password" value={pass} onChange={(e) => setpass(e.target.value)} placeholder='Password' className='border border-gray-900 focus:border-gray-700 outline-none bg-gray-800 rounded-sm py-2 px-4 w-[300px] ' />

                                <button type='submit' className='bg-red-600 w-[300px] py-4 mt-2 rounded-sm text-xl font-semibold hover:bg-red-700 transition-all duration-300 '>Login</button>
                                <div className='flex w-full items-center'>
                                    <hr className='bg-gray-600 border border-gray-600 w-full' />
                                    <span className='mx-3 text-sm'>OR</span>
                                    <hr className='bg-gray-600 border border-gray-600 w-full' />
                                </div>
                                <div>
                                    Don't have an account? <Link to={'/register'} className='text-blue-500 underline'>Create account</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    )
}

                    export default Login
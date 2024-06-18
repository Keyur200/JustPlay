import React from 'react'
import { Link } from 'react-router-dom'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { MdPodcasts, MdSubscriptions } from 'react-icons/md'
import { PiFilmSlateDuotone, PiTriangle } from 'react-icons/pi'
import { SiYoutubegaming } from 'react-icons/si'
import { IoTrophyOutline } from 'react-icons/io5'
import { BsBag, BsFilm, BsFire, BsMusicNote, BsNewspaper } from 'react-icons/bs'
const Sidebar = () => {
  return (
    <div className='w-full pb-6 transition-all duration-500'>
      <div className='flex flex-col gap-2'>
        <Link to={'/'} className={`${window.location.pathname === '/' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><GoHomeFill className='text-2xl' /> <span className='text-sm'>Home</span></Link>
        <Link to={'/subscriptions'} className={`${window.location.pathname === '/subscriptions' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><MdSubscriptions className='text-2xl' /><span className='text-sm'>Subscriptions</span></Link>
      </div>
      <hr className='h-[2px] border-gray-500 my-3' />
      <div className='flex flex-col gap-2'>
        <h2 className='flex items-start mb-1 ml-1 font-semibold'> Explore</h2>
        <Link to={'/trending'} className={`${window.location.pathname === '/trending' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><BsFire className='text-2xl' /> <span className='text-sm'>Trending</span></Link>
        <Link to={'/shopping'} className={`${window.location.pathname === '/shopping' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><BsBag className='text-2xl' /><span className='text-sm'>Shopping</span></Link>
        <Link to={'/music'} className={`${window.location.pathname === '/music' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><BsMusicNote className='text-2xl' /><span className='text-sm'>Music</span></Link>
        <Link to={'/films'} className={`${window.location.pathname === '/films' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><PiFilmSlateDuotone className='text-2xl' /><span className='text-sm'>Films</span></Link>
        <Link to={'/gaming'} className={`${window.location.pathname === '/gaming' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><SiYoutubegaming className='text-2xl' /><span className='text-sm'>Gaming</span></Link>
        <Link to={'/news'} className={`${window.location.pathname === '/news' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><BsNewspaper className='text-2xl' /><span className='text-sm'>News</span></Link>
        <Link to={'/sport'} className={`${window.location.pathname === '/sport' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><IoTrophyOutline className='text-2xl' /><span className='text-sm'>Sport</span></Link>
        <Link to={'/fashion_beauty'} className={`${window.location.pathname === '/fashion_beauty' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><PiTriangle className='text-2xl' /><span className='text-sm'>Fashion & beauty</span></Link>
        <Link to={'/podcasts'} className={`${window.location.pathname === '/podcasts' ? 'bg-[#505050] hover:bg-[#505050]' : ''} flex gap-4 items-center px-3 py-2 outline-none hover:bg-[#303030] rounded-lg`}><MdPodcasts className='text-2xl' /><span className='text-sm'>Podcasts</span></Link>
      </div>
    </div>
  )
}

export default Sidebar
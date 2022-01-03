import React from 'react'
import { useRouter } from 'next/router'
import { MdExplore } from 'react-icons/md'
import { BsBookmarks, BsPersonCircle } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'

const MobileNav = () => {

    const router = useRouter()

    return (
        <footer className={`${router.pathname === '/room/[id]' ? 'hidden' : 'sm:hidden bg-gray-100 border py-[6px] mx-1 rounded-md'} `}>
            <ul className='flex justify-between items-center px-6  text-2xl'>
                <li className={`${router.pathname === '/' && 'bg-[#512d6d] text-[#eeeeee] p-1 px-2 rounded-lg shadow-md'} flex flex-col justify-center items-center`}>
                    <AiFillHome onClick={() => router.push('/')} />
                    <span className={`${router.pathname === '/' && 'text-gray-200'} text-xs`}>Home</span>
                </li>
                <li className={`${router.pathname === '/search' && 'bg-[#512d6d] text-[#eeeeee] p-1 px-2 rounded-md shadow-md'} flex flex-col justify-center items-center`}>
                    <MdExplore onClick={() => router.push('/search')} />
                    <span className={`${router.pathname === '/search' && 'text-gray-200'} text-xs`}>Explore</span>
                </li>
                <li className={`${router.pathname === '/watch-list' && 'bg-[#512d6d] text-[#eeeeee] p-1 px-2 rounded-md shadow-md'} flex flex-col justify-center items-center`}>
                    <BsBookmarks onClick={() => router.push('/watch-list')} />
                    <span className={`${router.pathname === '/watch-list' && 'text-gray-200'} text-xs`}>Bookmarks</span>
                </li>
                <li className={`${router.pathname === '/me' && 'bg-[#512d6d] text-[#eeeeee] p-1 px-2 rounded-md shadow-md'} flex flex-col justify-center items-center`}>
                    <BsPersonCircle onClick={() => router.push('/me')} />
                    <span className={`${router.pathname === '/me' && 'text-gray-200'} text-xs`}>Profile</span>
                </li>
            </ul>
        </footer>
    )
}

export default MobileNav

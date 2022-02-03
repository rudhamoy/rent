import { useEffect, useState } from 'react'
import Header from '../header/index'
import Footer from './footer'
import MobileNav from './mobile-nav'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import useWindowDimensions from './windowSize';

const Layout = ({ children }) => {
    const { height, width } = useWindowDimensions()
    const router = useRouter()

    const footerhiddenRoute = '/room/[id]' || '/search' || '/watch-list' || 'register' || '/register/[role]'

    return (
        <div className={`bg-[#eeeeee] h-full relative `}>
            {/* {width > 425 ? (
                <div className='flex justify-center items-center  py-24'>
                    <div>

                        <h1 className="uppercase text-4xl font-semibold">Rentmeroom</h1>
                        <div className="my-[20%]">

                            <p>Currently, we are optimizing for pc version</p>
                            <p>However, we are available at mobile version</p>
                            <p>We request you to use your mobile device for browsing as of now!</p>
                        </div>
                        <h2 className="text-2xl text-yellow-700">Thank you!</h2>
                    </div>
                </div>
            ) : (
                <>
                    
                </>
            )} */}
            <Header />
            <ToastContainer position="top-right" />
            <div>
                {children}
            </div>
            <div className={`${router.pathname === footerhiddenRoute ? 'hidden' : ''}`}>
                <Footer />
            </div>

            <div className={`sticky bottom-[2px]`}>
                <MobileNav />
            </div>
        </div >
    )
}

export default Layout

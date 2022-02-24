import { useEffect, useState } from 'react'
import Header from '../header/index'
import Footer from './footer'
import MobileNav from './mobile-nav'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import useWindowDimensions from './windowSize';
import Landing from '../landingPage';

const Layout = ({ children }) => {
    const [pathnameValue, setPathnameValue] = useState(false)
    const { height, width } = useWindowDimensions()
    const router = useRouter()

    // useEffect(() => {

    //     if (router.pathname = '/room/[id]' || '/search' || '/watch-list' || 'register' || '/register/[role]') {

    //         setPathnameValue(true)
    //     }
    // }, [router])


    return (
        <div className={`bg-[#eeeeee] h-full relative `}>
            {width > 425 ? (
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
                    <ToastContainer position="top-right" />
                    <Landing />
                </>
            )}


            {/* <Header />
            <ToastContainer position="top-right" />
            <div>
                {children}
            </div>
            <div className={`${router.pathname === '/room/[id]' || '/search' ? 'hidden' : 'inline-block'}`}>
                <Footer />
            </div>

            <div className={`sticky bottom-[2px]`}>
                <MobileNav />
            </div> */}
        </div >
    )
}

export default Layout

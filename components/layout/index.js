import Header from '../header/index'
import Footer from './footer'
import MobileNav from './mobile-nav'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {

    const router = useRouter()

    return (
        <div className="bg-[#eeeeee] h-full relative">
            <Header />
            <ToastContainer position="top-right" />
            <div>
                {children}
            </div>
            <div className={`${router.pathname === '/room/[id]' || router.pathname === '/watch-list' ? 'hidden' : ''}`}>
                <Footer />
            </div>
            <div className={`sticky bottom-[2px]`}>
                <MobileNav />
            </div>
        </div>
    )
}

export default Layout

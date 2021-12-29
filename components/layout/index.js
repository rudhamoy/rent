import Header from '../header/index'
import Footer from './footer'
import MobileNav from './mobile-nav'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Layout = ({ children }) => {
    return (
        <div className="bg-[#eeeeee] h-full relative">
            <Header />
            <ToastContainer position="bottom-right" />
            <div className="">
                {children}
            </div>
            <Footer />
            <div className='sticky bottom-[2px]'>
                <MobileNav />
            </div>
        </div>
    )
}

export default Layout

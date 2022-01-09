import classes from './footer.module.css';
import { useRouter } from 'next/router'
import { MdEmail } from 'react-icons/md'
import { BsTelephoneFill, BsLinkedin } from 'react-icons/bs'
import { FaInstagramSquare, FaFacebookSquare, FaWhatsappSquare, FaYoutubeSquare } from 'react-icons/fa'

const Footer = () => {

    const router = useRouter()

    return (
        <div className="px-6 sm:px-32 py-5 bg-gray-50">
            {/** Info Section ------ css- divide */}
            <div className={` flex flex-col  sm:flex-row  gap-y-10 bg-[#512d6d] text-[#eeeeee] sm:h-[210px] p-3 rounded-md shadow-lg ${classes.footer__info}`}>
                {/**Find a rent */}
                <div className={`${classes.footer__infoLeft} sm:w-[40%] flex flex-col justify-center gap-y-3`}>
                    <h1 className="text-3xl text-center font-semibold">Find Rent House</h1>
                    <p className="text-center">Now search your best rent house, without going out from your home</p>
                    <div className="flex justify-center">
                        <button
                            className={`bg-[#eeeeee] p-1 px-3  text-gray-700 ${classes.footer__btn}`}
                            onClick={() => router.push('/search')}
                        >Find Now</button>
                    </div>
                </div>
                {/** Empty div */}
                <div className={` ${classes.footer__emptyDiv}`}></div>
                {/**List a rent */}
                <div className={`${classes.footer__infoRight} flex flex-col justify-center gap-y-3`}>
                    <h1 className="text-3xl text-center font-semibold">List Your Rent House</h1>
                    <p className="text-center">List your availabel rent house with us to get your preferred tenants easily.</p>
                    <div className="flex justify-center">
                        <button onClick={() => router.push('/owner/room/create')} className={`bg-[#eeeeee] p-1 px-3  text-gray-700 ${classes.footer__btn}`}>List Now</button>
                    </div>
                </div>
            </div>
            {/** footer menu lists */}
            <div className="text-gray-600 max-w-md mx-auto mt-20">
                <ul className="grid grid-cols-2 sm:flex gap-x-4 font-semibold">
                    <li>About Us</li>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                    <li>Sitemap</li>
                </ul>
                <div className="flex justify-center gap-y-3 my-5 font-semibold">

                    <ul>
                        <li className="flex items-center gap-x-2 my-2"><BsTelephoneFill className="text-xl" /> +91, 7085650634</li>
                        <li className="flex items-center gap-x-2"><MdEmail className="text-xl" /> rentaloo@info.com</li>
                    </ul>
                </div>
                <div className="flex justify-center">

                    <ul className="flex gap-x-5 text-3xl">
                        <FaInstagramSquare />
                        <FaFacebookSquare />
                        <FaWhatsappSquare />
                        <FaYoutubeSquare />
                        <BsLinkedin />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer

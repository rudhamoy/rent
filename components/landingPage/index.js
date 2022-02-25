import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import classes from './landing.module.css'
import Typewriter from 'typewriter-effect';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import Struggle from './Struggle'
import Hardwork from './Hardwork'
import Comfortable from './Comfortable'
import Register from '../auth/Register'
import useWindowDimensions from '../layout/windowSize';
import axios from 'axios'
import { toast } from 'react-toastify';
import { getLandingList } from '../../redux/actions/landingAction'
import absoluteUrl from 'next-absolute-url';

const Landing = () => {
    const [msg, setMsg] = useState('')
    const [datas, setDatas] = useState([])
    const router = useRouter();
    const { pathname } = router
    const { height, width } = useWindowDimensions();

    const dispatch = useDispatch()
    const { landings } = useSelector(state => state.allLanding)


    const data = {
        queryName: msg
    }

    // const { origin } = absoluteUrl(req)
    // let link = `${origin}/api/landing`

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('https://www.rentmeroom.com/api/landing', data)
        toast.success(`${msg} is submitted`)
        setMsg('')
        dispatch(getLandingList())
    }


    // let arr = ['mango', 'apple', 'mango', 'orange', 'pine', 'orange']
    let realData = {}
    for (let i = 0; i < landings?.length; i++) {
        let data = landings[i].queryName

        realData[data] = realData[data] ? realData[data] + 1 : 1
    }

    let enteries = Object.entries(realData)

    useEffect(() => {
        dispatch(getLandingList())
    }, [width, dispatch])

    return (
        <div className={`${classes.landing__scroll}`}>

            {/* first landing page */}
            <div className={`${classes.landing__bg} ${classes.child} flex flex-col justify-center items-center relative`}>
                <div className="flex items-center gap-x-1 my-5 absolute left-3 top-0">
                    <FaHome />
                    <h1>Rentmeroom</h1>
                </div>
                <div>
                    <div className="absolute bg-yellow-200 mix-blend-multiply filter blur-xl rounded-full w-[30%] h-[30%] -right-3 top-0"></div>
                    <div className="absolute bg-pink-200 mix-blend-multiply filter blur-xl rounded-full w-[30%] h-[30%] -left-3 top-0"></div>
                    <div className="">
                        <div className="flex justify-center items-center pt-6 ">
                            <div>
                                <p className="underline text-sm -mb-1 font-semibold">We are</p>
                                <h1 className={`${width >= 380 ? 'text-6xl' : 'text-5xl'} ${classes.landing_heading} uppercase font-bold text-center`}>Launching <br></br> very soon</h1>
                                <p className="text-center -mt-1">Currently, we are listing rooms!</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="px-[5%] pt-10">
                    <p className="text-gray-700 font-semibold">Tell us which area/locality you would like to find a room, at what price range?</p>
                    <div className='py-2'>
                        <input type="text" value={msg} onChange={e => setMsg(e.target.value)} placeholder='enter area/locality, price range' className="bg-gray-50 py-2 px-1 rounded-md w-full" />
                        <button onClick={submitHandler} className="bg-gray-700 rounded-md text-gray-100 p-2 px-6 mt-4">Enter</button>
                    </div>
                    <p className="text-xs my-2">People are interested on :</p>
                    <div className="flex gap-1.5 flex-wrap">
                        {/* <p className="p-2 rounded-md bg-gray-300 text-xs">Abhoynagar <span className="text-yellow-900 ml-2">13</span></p>
                        <p className="p-2 rounded-md bg-gray-300 text-xs">Ram Nagar <span className="text-yellow-900 ml-2">2</span></p>
                        <p className="p-2 rounded-md bg-gray-300 text-xs">Gurkha Basti <span className="text-yellow-900 ml-2">2</span></p>
                        <p className="p-2 rounded-md bg-gray-300 text-xs">Krishna Nagar <span className="text-yellow-900 ml-2">7</span></p>
                        <p className="p-2 rounded-md bg-gray-300 text-xs">Bijoy Kumar <span className="text-yellow-900 ml-2">1</span></p>
                        <p className="p-2 rounded-md bg-gray-300 text-xs">5000-7000</p> */}
                        {enteries?.map((data, index) => (
                            <p key={index} className="p-2 rounded-md bg-gray-300 text-xs">{data[0]} <span className="text-yellow-900 ml-2">{data[1]}</span></p>
                        ))}
                    </div>
                </div>
                {/* arrow down */}
                <div className="mt-10">
                    <BsArrowDown className="p-2 rounded-full bg-[#00000038] text-[40px] text-gray-600" />
                </div>
            </div>

            {/* second landing page */}
            <div className={` flex flex-col justify-center items-center px-[3%] relative ${classes.child}`}>
                <div className="absolute bg-yellow-200 mix-blend-multiply filter blur-xl rounded-full w-[30%] h-[30%] -left-3 top-0"></div>
                <div>
                    <p className="text-gray-600 underline text-sm -mb-2 font-semibold">About us</p>

                    <p className="text-gray-600"><span className="text-[300%] uppercase font-bold">rentmeroom</span> </p>
                    <div className="py-4 flex flex-col px-[3%] gap-y-4">
                        <div className="flex ">
                            <p>We have been there too, struggling to find a rent house of choice.</p>
                            <Struggle />
                        </div>
                        <div className="flex items-center gap-x-[5%]">
                            <Hardwork />
                            <p> So we decided to go out there made all the hardworks for you.</p>
                        </div>
                        <div className="flex">
                            <p>  Now you can search rent house easily and comfortably without needing to go out.</p>
                            <Comfortable />
                        </div>
                    </div>
                </div>
                <div className="absolute bg-pink-200 mix-blend-multiply filter blur-xl rounded-full w-[25%] h-[25%] right-30 bottom-20"></div>
                {/* arrow down */}
                <div className="mt-10">
                    <BsArrowDown className="p-2 rounded-full bg-[#00000038] text-[40px] text-gray-600" />
                </div>
            </div>

            {/* Third landing page */}
            <div className={` flex flex-col justify-center items-center px-[3%] relative ${classes.child}`}>

                <div className=" text-center">
                    <p className="uppercase font-semibold">Sign up now </p>
                    <p>To get <span className="font-semibold text-yellow-700">personal recommendation</span> from us on searching rent house</p>
                </div>
                <div>
                    {pathname === '/login' && (
                        <div className="p-2 bg-gray-300 rounded-md text-center mt-2">
                            <p>You have successfully sign up with us</p>
                        </div>
                    )}
                    <Register />
                </div>
                {/* arrow down */}
                <div className="mt-10">
                    <BsArrowUp className="p-2 rounded-full bg-[#00000038] text-[40px] text-gray-600" />
                </div>
            </div>

        </div>
    )
};

export default Landing;


{/* <a href="https://iconscout.com/illustrations/concept" target="_blank">Concept of Research And Development in business startup Illustration</a> by < a href = "https://iconscout.com/contributors/iconscout" > Iconscout Store</a > on < a href = "https://iconscout.com" > Iconscout</a > */ }

{/* struggle str <a href="https://iconscout.com/illustrations/concept" target="_blank">Concept about business Failure Illustration</a> by < a href = "https://iconscout.com/contributors/iconscout" target = "_blank" > Iconscout Store</a > */ }

{/* hardworrk <a href="https://iconscout.com/illustrations/concept" target="_blank">Concept of importance of Team Work in business startup Illustration</a> by < a href = "https://iconscout.com/contributors/iconscout" target = "_blank" > Iconscout Store</a > */ }

{/* comfortably <a href="https://iconscout.com/illustrations/business" target="_blank">Business lady do Multi Tasking Illustration</a> by < a href = "https://iconscout.com/contributors/iconscout" target = "_blank" > Iconscout Store</a > */ }
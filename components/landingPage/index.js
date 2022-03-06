import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'
import classes from './landing.module.css'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import Struggle from './Struggle'
import Hardwork from './Hardwork'
import Comfortable from './Comfortable'
import Register from '../auth/Register'
import Login from '../auth/Login'
import useWindowDimensions from '../layout/windowSize';
import axios from 'axios'
import { toast } from 'react-toastify';
import { getLandingList, createLanding } from '../../redux/actions/landingAction'
import absoluteUrl from 'next-absolute-url';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer'
import Loader from './Loader'

const Landing = () => {
    const [msg, setMsg] = useState('')
    const [datas, setDatas] = useState([])
    const [userView, setUserView] = useState(true)
    const [ownerView, setOwnerView] = useState(false)

    //router
    const router = useRouter();
    const { pathname } = router

    let role
    if (pathname === '/register/[role]') {
        role = 'owner'
    }

    //gettting the current height and width of the device
    const { height, width } = useWindowDimensions();

    const dispatch = useDispatch()
    const { landings, loading } = useSelector(state => state.allLanding)

    const data = {
        queryName: msg
    }


    //Submit handler for input
    const submitHandler = (e, req) => {
        e.preventDefault()
        const { origin } = absoluteUrl(req)
        let link = `${origin}/api/landing`
        axios.post(link, data)
        // dispatch(createLanding(data))
        toast.success(`${msg} is submitted`)
        setMsg('')
        dispatch(getLandingList())
    }

    //for counting data
    // let arr = ['mango', 'apple', 'mango', 'orange', 'pine', 'orange']
    let realData = {}
    for (let i = 0; i < landings?.length; i++) {
        let data = landings[i].queryName

        realData[data] = realData[data] ? realData[data] + 1 : 1
    }

    let enteries = Object.entries(realData)

    //Animation
    const { ref, inView } = useInView()
    const animation = useAnimation()

    //sign up toggle 0wner - User
    const showUserView = () => {
        setUserView(true)
        setOwnerView(false)
    }

    const showOwnerView = () => {
        setUserView(false)
        setOwnerView(true)
    }

    useEffect(() => {
        dispatch(getLandingList())
        if (inView) {
            animation.start({
                y: 0,
                opacity: 1,
                transition: {
                    type: 'spring',
                    duration: 1,
                    bounce: 0.1,
                    ease: 'easeIn'
                }
            })
        }
        if (!inView) {
            animation.start({
                y: '5vh',
                opacity: 0
            })
        }
    }, [width, dispatch, inView])

    return (
        <div className={`${classes.landing__scroll}`}>

            {/* first landing page */}
            <div className={`${classes.landing__bg} ${classes.child} flex flex-col justify-center items-center relative`}>
                {/* <div className="absolute top-0 left-2 flex items-center">
                    <h1 className="font-sans text-xl text-[#512d6d] font-bold  m-1">rentmeroom.com</h1>
                </div> */}
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
                <div className="px-[5%] pt-10 h-[50%] ">
                    <p className="text-gray-600 text-sm font-semibold">Tell us at which area/locality you would like to find a room, at what price range?</p>
                    <div className='py-2'>
                        <input type="text" value={msg} onChange={e => setMsg(e.target.value)} placeholder='enter area/locality, price range' className="bg-gray-50 border  py-2 px-1 rounded-md w-full" />
                        <button onClick={submitHandler} className="bg-gray-600 shadow-lg border rounded-md text-gray-100 p-2 px-6 mt-4">Enter</button>
                    </div>
                    <p className="text-xs my-2">People are interested on :</p>
                    <div className=" py-1  h-[55%] overflow-y-scroll">
                        {loading === true ? (
                            <div className="h-[100%] flex justify-center items-center">
                                <Loader />
                            </div>
                        ) : (

                            <div className="flex gap-1.5 flex-wrap">
                                {enteries?.map((data, index) => (
                                    <p key={index} className="p-2 rounded-md border bg-white text-xs">{data[0]} <span className="text-yellow-900 ml-2">{data[1]}</span></p>
                                ))}
                            </div>
                        )}
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
                <div ref={ref}>
                    <p className="text-gray-600 underline text-sm -mb-2 font-semibold">About us</p>

                    <motion.p animate={animation} className="text-gray-600"><span className="text-[280%] uppercase font-bold">rentmeroom</span> </motion.p>
                    <div className="py-4 flex flex-col px-[3%] gap-y-4">
                        <div className="flex ">
                            <motion.p
                                animate={animation}
                            >We have been there too, struggling to find a rent house of choice.</motion.p>
                            <motion.div
                                animate={animation}
                            >
                                <Struggle />
                            </motion.div>
                        </div>
                        <motion.div className="flex items-center gap-x-[5%]"
                            animate={animation}
                        >
                            <div>
                                <Hardwork />
                            </div>
                            <p> So we decided to go out there, made all the hardworks for you.</p>
                        </motion.div>
                        <motion.div className="flex"
                            animate={animation}
                        >
                            <p>  Now you can search rent house easily and comfortably without needing to go out.</p>
                            <Comfortable />
                        </motion.div>
                    </div>
                </div>
                <div className="absolute bg-pink-200 mix-blend-multiply filter blur-xl rounded-full w-[25%] h-[25%] right-30 bottom-20"></div>
                {/* arrow down */}
                <div className="mt-10">
                    <BsArrowDown className="p-2 rounded-full bg-[#00000038] text-[40px] text-gray-600" />
                </div>
            </div>

            {/* Third landing page */}
            <div className={`px-[3%] flex flex-col justify-center bg-gray-50 pt-4 relative ${classes.child}`}>
                <div className="text-sm text-center">
                    <p className="uppercase text-3xl font-semibold">Sign up now </p>
                </div>

                {/* switch/toggle button for mobile */}
                <div className="flex gap-x-1 my-6 p-1 bg-[lightgrey] rounded-lg shadow-sm w-[100%]">
                    <button onClick={showUserView} className={`p-2 px-3  w-[100%] rounded-lg font-semibold outline-none ${userView === true ? 'bg-gray-50' : 'text-gray-500'}`}>as User (tenants)</button>
                    <button onClick={showOwnerView} className={`p-2 px-3  w-[100%] rounded-lg font-semibold outline-none ${ownerView === true ? 'bg-gray-50' : 'text-gray-500'}`}>as Owner</button>
                </div>
                <div className="flex justify-center items-center">
                    {userView === true && (
                        <div>
                            <p>And get <span className="text-yellow-700 font-semibold">free recommendatoin & help</span> from our team on searching your rent house anywhere in <span className="text-lg font-semibold">Agartala</span></p>
                            <div className="my-5 flex gap-x-2 items-center">
                                <button onClick={() => router.push('/register')} className="text-gray-100 bg-[#512d6d] rounded-md p-2 px-4 outline-none">Sign Up Now</button>
                                <p>or</p>
                                <button onClick={() => router.push('/login')} className="text-gray-100 bg-[#512d6d] rounded-md p-2 px-4 outline-none">Sign In</button>
                            </div>
                        </div>
                    )}
                    {ownerView === true && (
                        <div>
                            <p>And start listing your room absolutly free with us</p>
                            <div className="my-5 flex gap-x-2 items-center">
                                <button onClick={() => router.push('/register/owner')} className="text-gray-100 bg-[#512d6d] rounded-md p-2 px-3 outline-none">Sign Up Now</button>
                                <p>or</p>
                                <button onClick={() => router.push('/login')} className="text-gray-100 bg-[#512d6d] rounded-md p-2 px-4 outline-none">Sign In</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* arrow down */}
                <div className="mt-10 flex justify-center">
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
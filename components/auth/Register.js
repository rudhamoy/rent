import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link'
import axios from 'axios'
import { TiTick } from 'react-icons/ti'

import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../redux/actions/userActions'

import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadString } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { v4 as uuidv4 } from 'uuid'
import absoluteUrl from 'next-absolute-url'


const Register = ({ role }) => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        broker: ""
    })
    const [loading, setLoading] = useState(false);
    const [verify, setVerify] = useState('');
    const [userId, setUserId] = useState('')
    const [otp, setOtp] = useState(false);
    const [confirm, setConfirm] = useState(false)

    const { name, email, password, mobile, broker } = user

    const [avatar, setAvatar] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    const dispatch = useDispatch();
    const router = useRouter();
    const { pathname } = router

    const { success, loading: createLoading, error } = useSelector(state => state.auth);

    // const { origin } = absoluteUrl()
    // const apiURL = `${origin}/api/auth/register`

    //submit form onClick
    const submitHandler = async (e, req) => {
        e.preventDefault();
        window.scrollTo(0, 0)
        // setLoading(true)
        let imageUrls = ''
        if (avatar) {
            //firebase
            const storage = getStorage()
            const fileName = avatar.name + `-${user.name}` + `-${uuidv4()}`

            const imageRef = ref(storage, 'images/' + fileName);


            await uploadString(imageRef, avatar, "data_url").then(async snapshot => {
                const downloadURL = await getDownloadURL(imageRef)
                imageUrls = downloadURL
                const data = {
                    imageUrls
                }
                await addDoc(collection(db, "images"), data)
            })
        }


        const userData = {
            broker, name, email, mobile, password, avatar: imageUrls, role
        }

        const { origin } = absoluteUrl(req)
        const apiURL = `${origin}/api/auth/register`

        // dispatch(registerUser(userData))
        const data = await axios.post(apiURL, userData).then(res => {
            console.log(res)
            const { data } = res
            setUserId(data.data.userId)
            console.log(data.data.userId)
            setOtp(true)
        }).catch(error => {
            console.log(error);
            // setLoading(false)
        })
        // setLoading(false)
    }

    const verfiyHandler = async (e, req) => {
        e.preventDefault()

        const userData = {
            otp: verify,
            userId: userId
        }

        const { origin } = absoluteUrl(req)
        const apiURL = `${origin}/api/auth/verify`
        const data = await axios.post(apiURL, userData).then(res => {
            const data = res
            console.log(data)
            setConfirm(true)
        }).catch(error => {
            console.log(error)
        })
        console.log(data)

    }

    const onChange = (e) => {

        if (e.target.name === 'avatar') {
            const reader = new FileReader()
            if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0])
            }

            reader.onload = (readerEvent) => {
                setAvatar(readerEvent.target.result)
                setAvatarPreview(readerEvent.target.result)
            }

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }

    }

    let userType

    if (pathname === '/register/[role]') {
        userType = 'Owner'
    } else {
        userType = 'User'
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            setLoading(false)
            dispatch(clearErrors())
        }

        // if (success) {
        //     router.push('/login')
        // }
    }, [dispatch, success, error, router])

    console.log(mobile, email, name, broker)

    return (
        // <div className="flex justify-center items-center overflow-hidden ">
        <div className="h-[100vh] flex justify-center items-center overflow-hidden py-[15%]">
            {createLoading === true || loading === true ? (
                <div className="w-[340px] bg-gray-50 p-2 rounded-md py-20">
                    <h1>Please Wait!</h1>
                    <p>Creating your account...</p>
                </div>
            ) : (


                // <div className="">
                <div className="mt-14">


                    <div className={`mb-6 `}>
                        <p className="text-gray-700 text-2xl text-center">{userType} Registration</p>
                    </div>
                    {otp === true ? (
                        <>
                            {confirm === true ? (
                                <div>
                                    <div className="flex justify-center">

                                        <TiTick className="text-6xl text-center font-bold text-green-300" />
                                    </div>
                                    <p>You have successfully registered</p>
                                    <button onClick={() => router.push('/login')} className="p-2 px-3 w-[100%] rounded-md outline-none bg-gray-600 text-gray-100">Login Now</button>
                                </div>
                            ) : (
                                <form className=" w-[90%]" onSubmit={verfiyHandler}>

                                    <div className="flex flex-col py-2">
                                        <label htmlFor="otp">Enter OTP</label>
                                        <input type="number" placeholder="Enter OTP" value={verify} onChange={e => setVerify(e.target.value)} className="p-2 rounded-md outline-none " />
                                    </div>
                                    <button onClick={verfiyHandler} className="p-2 px-3 w-[100%] rounded-md outline-none bg-gray-600 text-gray-100">Verify</button>
                                </form >
                            )}
                        </>
                    ) : (
                        <form onSubmit={submitHandler} className="w-[90vw] p-4 overflow-hidden">
                            {/* name */}
                            <div className="flex flex-col my-3">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Your Name'
                                    id="name_field"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    className="bg-gray-50 h-10 px-2 rounded-md outline-none"
                                />
                            </div>
                            {/* email */}
                            <div className={`flex flex-col my-3 ${pathname === '/register/[role]' && 'hidden'}`}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    placeholder='Enter Your Email Address'
                                    id="email_field"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    className="bg-gray-50 h-10 px-2 rounded-md outline-none"
                                />
                            </div>
                            {/* Phone */}
                            <div className="flex flex-col my-3">
                                <label htmlFor="mobile">Mobile</label>
                                <input
                                    type="number"
                                    placeholder='Enter Your Mobile Number'
                                    id="mobile_field"
                                    name="mobile"
                                    value={mobile}
                                    onChange={onChange}
                                    className="bg-gray-50 h-10 px-2 rounded-md outline-none"
                                />
                            </div>
                            {/* Password */}
                            <div className="flex flex-col my-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    placeholder='Enter Your Password'
                                    id="password_field"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    className="bg-gray-50 h-10 px-2 rounded-md outline-none"
                                />
                            </div>
                            {/* Broker Name*/}
                            {pathname === '/register/[role]' ? (
                                <div className="flex flex-col my-3">
                                    <label htmlFor="name">Affiliated With <span className="text-yellow-600">(optional)</span></label>
                                    <input
                                        type="text"
                                        placeholder='Affiliator Name'
                                        id="broker_field"
                                        name="broker"
                                        value={broker}
                                        onChange={onChange}
                                        className="bg-gray-50 h-10 px-2 rounded-md outline-none"
                                    />
                                </div>
                            ) : null}
                            {/* avatar */}
                            <div className='flex gap-x-2 items-center'>
                                <div>
                                    <figure className='w-[60px] rounded-full'>
                                        <img
                                            src={avatarPreview}
                                            className='h-[60px]'
                                            alt='image'
                                        // className="rounded-full"
                                        />
                                    </figure>
                                </div>
                                <div className=''>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='images/*'
                                        onChange={onChange}
                                    />
                                    <label className='' htmlFor='customFile'>
                                        Choose Avatar <span className="text-yellow-600">(optional)</span>
                                    </label>
                                </div>
                            </div>


                            {/* button */}
                            <button onClick={submitHandler} className="bg-gray-600 text-md p-2 rounded-md my-3 w-full text-gray-100">
                                {loading ? ' Registering..' : 'REGISTER'}
                            </button>

                        </form>
                    )}

                    <div className={`mb-6 px-[3%] ${pathname === `/register/[role]` ? 'hidden' : ''}`}>
                        <Link href="/register/owner" ><a className={` underline text-[#7a0acf]`}>Click here to register as a House Owner</a></Link>
                    </div>
                </div>

            )}
        </div >
    )
}

export default Register

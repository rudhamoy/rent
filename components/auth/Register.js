import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../redux/actions/userActions'

import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadString } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { v4 as uuidv4 } from 'uuid'

const Register = ({ role }) => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)

    const { name, email, password, mobile } = user

    const [avatar, setAvatar] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    const dispatch = useDispatch();
    const router = useRouter();

    const { success, loading: createLoading, error } = useSelector(state => state.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        window.scrollTo(0, 0)
        setLoading(true)

        //firebase
        const storage = getStorage()
        const fileName = avatar.name + `-${user.name}` + `-${uuidv4()}`

        const imageRef = ref(storage, 'images/' + fileName);
        let imageUrls = ''

        await uploadString(imageRef, avatar, "data_url").then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef)
            imageUrls = downloadURL
            const data = {
                imageUrls
            }
            await addDoc(collection(db, "images"), data)
        })

        const userData = {
            name, email, mobile, password, avatar: imageUrls, role
        }

        dispatch(registerUser(userData))
        setLoading(false)
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

    useEffect(() => {
        if (error) {
            toast.error(error)
            setLoading(false)
            dispatch(clearErrors())
        }

        if (success) {
            router.push('/login')
        }
    }, [dispatch, success, error, loading, router])

    // if (loading) {
    //     return (
    //         <div className="bg-gray-50 p-2 rounded-md py-20">
    //             <h1>Please Wait!</h1>
    //             <p>Creating your account...</p>
    //         </div>
    //     )
    // }

    return (
        <div className="h-[90vh] flex justify-center items-center overflow-hidden">
            {loading === true ? (
                <div className="w-[340px] bg-gray-50 p-2 rounded-md py-20">
                    <h1>Please Wait!</h1>
                    <p>Creating your account...</p>
                </div>
            ) : (
                <form className="w-[90vw] bg-gray-100 rounded-md shadow-md p-4 mt-14" onSubmit={submitHandler}>
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
                            className="bg-gray-300 h-10 px-2 rounded-md outline-none"
                        />
                    </div>
                    {/* email */}
                    <div className="flex flex-col my-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            placeholder='Enter Your Email Address'
                            id="email_field"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="bg-gray-300 h-10 px-2 rounded-md outline-none"
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
                            className="bg-gray-300 h-10 px-2 rounded-md outline-none"
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
                            className="bg-gray-300 h-10 px-2 rounded-md outline-none"
                        />
                    </div>
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
                                required
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                accept='images/*'
                                onChange={onChange}
                            />
                            <label className='' htmlFor='customFile'>
                                Choose Avatar
                            </label>
                        </div>
                    </div>
                    {/* button */}
                    <button className="bg-[#512d6d] text-md p-2 rounded-md my-3 w-full text-gray-100">
                        {loading ? ' Registering..' : 'REGISTER'}
                    </button>
                </form>
            )}
        </div>
    )
}

export default Register

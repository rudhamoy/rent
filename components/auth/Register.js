import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../redux/actions/userActions'

const Register = ({ role }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    })
    // const [loading, setLoading] = useState(false)

    const { name, email, password, mobile } = user

    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    const { success, loading, error } = useSelector(state => state.auth);

    const submitHandler = (e) => {
        e.preventDefault();
        // setLoading(true)
        window.scrollTo(0, 0)

        const userData = {
            name, email, mobile, password, avatar, role
        }

        dispatch(registerUser(userData))
        // setLoading(false)
    }

    const onChange = (e) => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }

    }

    useEffect(() => {
        if (success) {
            router.push('/login')
        }

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
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
        <div className="h-[90vh] flex justify-center items-center">
            {loading === true ? (
                <div className="w-[340px] bg-gray-50 p-2 rounded-md py-20">
                    <h1>Please Wait!</h1>
                    <p>Creating your account...</p>
                </div>
            ) : (
                <form className="w-[340px] bg-gray-100 rounded-md shadow-md p-4" onSubmit={submitHandler}>
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
                    <button disabled={loading ? true : false} className="bg-[#512d6d] text-md p-2 rounded-md my-3 w-full text-gray-100">
                        {loading ? ' Registering..' : 'REGISTER'}
                    </button>
                </form>
            )}
        </div>
    )
}

export default Register

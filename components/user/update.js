import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearErrors } from '../../redux/actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants'

const Update = ({ role }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [userProfile, setUserProfile] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    })
    // const [loading, setLoading] = useState(false)

    const { name, email, password, mobile } = userProfile

    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    const { user, loading } = useSelector(state => state.loadedUser);
    const { error, isUpdated, loading: updateLoading } = useSelector(state => state.updateUser);

    useEffect(() => {
        if (user) {
            setUserProfile({
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            })
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            router.push('/me');
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, isUpdated, error, router, user])

    const submitHandler = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0)
        // setLoading(true)

        const userData = {
            name, email, mobile, password
        }

        dispatch(updateProfile(userData))
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
            setUserProfile({ ...user, [e.target.name]: e.target.value })
        }

    }

    if (updateLoading) {
        return (
            <div className="bg-gray-50 p-2 rounded-md py-20">
                <h1>Please Wait!</h1>
                <p>Updating your account...</p>
            </div>
        )
    }

    return (
        <div className="h-[90vh] flex justify-center items-center">
            <form className="w-[340px] bg-gray-100 rounded-md shadow-md p-4" onSubmit={submitHandler}>
                {/* name */}
                <div className="flex flex-col my-2">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder='Enter Your Name'
                        id="name_field"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className="bg-gray-300 h-10 px-2"
                    />
                </div>
                {/* email */}
                <div className="flex flex-col my-2">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        placeholder='Enter Your Email Address'
                        id="email_field"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className="bg-gray-300 h-10 px-2"
                    />
                </div>
                {/* Phone */}
                <div className="flex flex-col my-2">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="number"
                        placeholder='Enter Your Mobile Number'
                        id="mobile_field"
                        name="mobile"
                        value={mobile}
                        onChange={onChange}
                        className="bg-gray-300 h-10 px-2"
                    />
                </div>
                {/* Password */}
                <div className="flex flex-col my-2">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder='Enter Your Password'
                        id="password_field"
                        name="password"
                        value={password}
                        onChange={onChange}
                        className="bg-gray-300 h-10 px-2"
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
                <button className="bg-[#512d6d] text-sm p-2 rounded-sm my-2 w-full text-gray-100">UPDATE</button>
            </form>
        </div>
    )
}

export default Update

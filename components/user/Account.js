import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import MyBookings from '../booking/my-bookings'
import Profile from './Profile'
import classes from './account.module.css'
import MyRoom from '../owner/my-room'

const Account = () => {
    const [showProfile, setShowProfile] = useState(true)
    const [showBooking, setShowBooking] = useState(false)

    const router = useRouter()

    const { user } = useSelector(state => state.loadedUser)

    const ProfileClickHandler = () => {
        setShowProfile(true)
        setShowBooking(false)
    }

    const BookingClickHandler = () => {
        setShowBooking(true)
        setShowProfile(false)
    }

    return (
        <div className="py-20 ">
            <h1 className="px-[3%] font-semibold">My Account</h1>
            <div className={`${classes.account__btn} flex gap-x-4 my-4 px-[3%]`}>
                <button onClick={ProfileClickHandler} className={`${showProfile === true ? "bg-gray-800 text-gray-50 shadow-xl" : "bg-gray-50 text-gray-500"}  rounded-xl p-2 font-semibold px-5 outline-none`}>
                    Profile
                </button>
                {user?.role === "user" ? (
                    <button onClick={BookingClickHandler} className={`${showBooking === true ? "bg-gray-800 text-gray-50 shadow-xl" : "bg-gray-50 text-gray-500"}  rounded-xl p-2 font-semibold px-5 flex gap-x-2 outline-none`}>
                        <span>My</span> <span>Bookings</span>
                    </button>
                ) : (
                    <button onClick={BookingClickHandler} className={`${showBooking === true ? "bg-gray-800 text-gray-50 shadow-xl" : "bg-gray-50 text-gray-500"}  rounded-xl p-2 font-semibold px-5 flex gap-x-2 outline-none`}>
                        <span>Room</span> <span>List</span>
                    </button>
                )}
                <button onClick={() => router.push('/owner/room/create')} className={`${user?.role === 'user' && 'hidden'} bg-gray-50 text-gray-500 rounded-xl p-2 font-semibold px-5 flex gap-x-2 outline-none`}>
                    <span>Create</span> <span>Room</span>
                </button>
            </div>

            {user?.role === 'user' ? (
                <div className="px-[3%]">
                    {showBooking === true ? (
                        <MyBookings />
                    ) : (
                        <Profile />
                    )}
                </div>
            ) : (
                <div className="px-[3%]">
                    {showBooking === true ? (
                        <MyRoom />
                    ) : (
                        <Profile />
                    )}
                </div>
            )}
        </div>
    )
}



export default Account

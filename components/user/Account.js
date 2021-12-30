import React, { useState } from 'react'
import MyBookings from '../booking/my-bookings'
import Profile from './Profile'

const Account = () => {
    const [showProfile, setShowProfile] = useState(true)
    const [showBooking, setShowBooking] = useState(false)


    const ProfileClickHandler = () => {
        setShowProfile(true)
        setShowBooking(false)
    }

    const BookingClickHandler = () => {
        setShowBooking(true)
        setShowProfile(false)
    }

    return (
        <div className="px-[3%] py-20">
            <h1 className="font-semibold">My Account</h1>
            <div className="flex gap-x-4 my-4">
                <button onClick={ProfileClickHandler} className={`${showProfile === true ? "bg-gray-800 text-gray-50 shadow-xl" : "bg-gray-50 text-gray-500"}  rounded-xl p-2 font-semibold px-5`}>
                    Profile
                </button>
                <button onClick={BookingClickHandler} className={`${showBooking === true ? "bg-gray-800 text-gray-50 shadow-xl" : "bg-gray-50 text-gray-500"}  rounded-xl p-2 font-semibold px-5`}>
                    My Bookings
                </button>
            </div>

            <div>
                {showBooking === true ? (

                    <MyBookings />
                ) : (
                    <Profile />
                )}
            </div>
        </div>
    )
}



export default Account

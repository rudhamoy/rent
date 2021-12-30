import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';


const MyBookings = () => {

    const dispatch = useDispatch();

    const { bookings, error } = useSelector(state => state.bookings);

    useEffect(() => {

    }, [dispatch])

    return (
        // <div className="px-[3%] sm:px-32 py-20">
        <div className="py-6">
            <h1 className="font-semibold">My Bookings List</h1>
            <div className="my-6">
                {bookings.map(booking => (
                    <div key={booking._id} className="flex gap-x-4 bg-gray-50 shadow-sm p-2 rounded-sm mb-4 h-[148px] w-full sm:w-[380px]">
                        <div>
                            <img src={booking.room.images[0].url} alt="" className="h-[130px] rounded-sm" />
                        </div>
                        <div>
                            <Link href={`/room/${booking.room._id}`}>
                                <p className="font-semibold text-sm">{booking.room.name}</p>
                            </Link>
                            <p className="text-sm text-gray-600">Price/Month: {booking.room.pricePerMonth}</p>
                            <div className="mt-1 sm:mt-6">
                                <p className="text-sm text-gray-600 py-1">Ready to Move: <span className="p-1 px-2 bg-blue-200 rounded-sm">Inreview</span></p>
                                <button className="text-sm ">View details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBookings

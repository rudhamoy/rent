import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import BookingForm from '../booking/booking-form';


const Modal = ({ setShowModal, setShowRoom }) => {
    const [tenants, setTenants] = useState(1)

    const router = useRouter()

    const { isAuthenticated } = useSelector(state => state.loadedUser)

    const close = () => {
        setShowModal(false);
        setShowRoom(true)
    }

    let data = {}
    let bookingData = {
        room: '',
        numTenants: tenants
    }

    if (typeof window !== "undefined") {
        if (localStorage.getItem("addBooking")) {
            data = JSON.parse(localStorage.getItem("addBooking"))
            bookingData.room = data.room
        } else {
            bookingData = {}
        }
    }


    const newBooking = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post("/api/bookings", bookingData, config).then(res => {
                router.push('/bookings/me')
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [router])

    return (

        <div className="w-[85%]  sm:w-[60%] bg-gray-50 p-3 sm:p-8 my-6 rounded-md fixed">
            <button onClick={close} className="bg-[#512d6d] h-6 w-6 rounded-full text-white flex justify-center items-center">X</button>

            <div className="pt-3">
                <div className=" text-gray-500 p-1 border rounded-md">
                    <p>Room Details</p>
                    <p className="my-2 p-2 bg-gray-200 rounded-md">Title: <span className=" text-gray-800 font-semibold">{data.name}</span></p>
                    <p className="my-2 p-2 bg-gray-200 rounded-md">Address: <span className=" text-gray-800 font-semibold">{data.address}</span></p>
                    <p className="my-2 p-2 bg-gray-200 rounded-md">Price: <span className=" text-gray-800 font-semibold">{data.price} / Month</span></p>
                </div>
                <form onSubmit={newBooking}>
                    <div className="my-4 rounded-md border p-1">
                        <p>Enter number of stay</p>
                        <input type="number" value={tenants} onChange={(e) => setTenants(e.target.value)} className="my-2 p-2 bg-gray-200 rounded-md" />
                    </div>
                    <div className="flex justify-between ">

                        <button className="p-2 px-3 text-[#eee] bg-[#e05219] rounded-md" onClick={close}>Cancel</button>
                        {isAuthenticated === false ? (
                            <button onClick={() => router.push('/login')} className="p-1 px-2 text-[#eee] bg-[#512d6d] rounded-md">Login to Continue</button>
                        ) : (

                            <button className="p-2 px-3 text-[#eee] bg-[#512d6d] rounded-md" onClick={newBooking}>Confirm Booking</button>
                        )}
                    </div>
                </form>
            </div>

            {/* // <BookingForm booking={newBooking} room={data} /> */}
        </div>
    )
}

export default Modal

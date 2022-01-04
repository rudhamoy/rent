import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';


const Modal = ({ setShowModal, setShowRoom }) => {

    const router = useRouter()

    const { isAuthenticated } = useSelector(state => state.loadedUser)

    const close = () => {
        setShowModal(false);
        setShowRoom(true)
    }

    const newBooking = async () => {
        let bookingData = {}
        if (typeof window !== "undefined") {
            if (localStorage.getItem("addBooking")) {
                bookingData = JSON.parse(localStorage.getItem("addBooking"))
            } else {
                bookingData = {}
            }
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post("/api/bookings", bookingData, config).then(res => {
                router.push('/bookings/me')
            })

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (

        <div className="w-[80%] h-[400px] sm:w-[60%] bg-gray-50 p-2 sm:p-8 my-6 rounded-md fixed">
            <button onClick={close} className="bg-[#512d6d] h-6 w-6 rounded-full text-white flex justify-center items-center">X</button>
            <div className="my-6 bg-gray-100 rounded-md p-2">
                <h1>Click on Confirm to Complete Your Bookings</h1>
            </div>
            {isAuthenticated === false ? (
                <button className="p-1 px-2 text-[#eee] bg-[#512d6d] rounded-md">Please Login to Continue</button>
            ) : (

                <button className="p-1 px-3 text-[#eee] bg-[#512d6d] rounded-md" onClick={newBooking}>Confirm</button>
            )}
        </div>
    )
}

export default Modal

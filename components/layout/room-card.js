import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { ImLocation } from 'react-icons/im'
import { FaRupeeSign } from 'react-icons/fa'
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs'
import _ from 'lodash'
import { WATCHLIST_ADD_ROOM } from "../../redux/constants/watchListConstants"
import { addToWatchlist } from '../../redux/actions/watchListActions'
import { toast } from 'react-toastify'
import axios from 'axios'

const RoomCard = ({ room, clicked, setShowModal, setShowRoom }) => {
    const dispatch = useDispatch();

    const router = useRouter()
    const { pathname } = router


    const { name, address, pricePerMonth, images } = room;

    let watchList = []

    const handleAddToWatchlist = () => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("watchList")) {
                watchList = JSON.parse(localStorage.getItem("watchList"))
            }

            watchList.push({
                ...room,
            })

            let unique = _.uniqWith(watchList, _.isEqual)

            localStorage.setItem("watchList", JSON.stringify(unique));

            dispatch(addToWatchlist(unique))
            // dispatch({
            //     type: WATCHLIST_ADD_ROOM,
            //     payload: unique
            // })
            toast.success("Added to Bookmarks")
        }
    }

    const showModalHandler = () => {
        setShowModal(true);
        setShowRoom(false)
        const addBooking = {
            room: room._id,
            name: room.name,
            price: room.pricePerMonth,
            address: room.address
        }
        localStorage.setItem("addBooking", JSON.stringify(addBooking))
    }

    // const newBooking = async () => {
    //     const bookingData = {
    //         room: room._id
    //     }

    //     try {
    //         const config = {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }

    //         const { data } = await axios.post("/api/bookings", bookingData, config)

    //         console.log(data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <div className="flex flex-col gap-y-2 sm:gap-x-2 sm:flex-row bg-white w-[100%] sm:w-[520px] h-[320px] sm:h-[174px] p-2 shadow-md rounded-md">
            {/**left */}
            <div className="w-[100%] sm:w-[260px] relative">
                <img src={images[0]} alt="" className="rounded-md h-[200px] sm:h-[165px] w-[100%]" />
                <div className={`${pathname === "/me" || pathname === '/owner/room' ? 'hidden' : ""} absolute top-1 left-1 bg-[#00000066] p-2 rounded-full`}>
                    {clicked === true ? <BsFillBookmarkFill className=" text-gray-50  text-lg cursor-pointer" /> : (
                        <BsBookmark className={` text-gray-50  text-lg cursor-pointer`} onClick={handleAddToWatchlist} />
                    )}
                </div>
            </div>
            {/**Right */}
            <div className=" w-[100%] sm:w-[260px] h-full relative">
                {/** right__title & location */}
                <div>
                    <p className="flex items-center gap-x-2 text-xs text-gray-500"> <span><ImLocation /></span> {address}</p>
                    <h1 className="uppercase font-semibold">
                        <Link href={`/room/${room._id}`}>
                            <a>{name}</a>
                        </Link>
                    </h1>
                </div>
                {/** price and action button */}
                <div className="flex justify-between items-center absolute bottom-1 w-full">
                    <p className="flex items-center"><FaRupeeSign className="font-thin" />{pricePerMonth}/mo</p>
                    {pathname === '/' || pathname === '/search' || pathname === '/me' ? (
                        <button className="p-1 px-2 w-[40%] text-[#eee] bg-[#512d6d] rounded-lg" onClick={() => router.push(`/room/${room._id}`)}>View Details</button>
                    ) : (
                        <button className="p-1 px-2 w-[40%] text-[#eee] bg-[#512d6d] rounded-lg " onClick={showModalHandler}>Book now</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RoomCard

// Edited
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

import Modal from './modal'

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
            toast.success("Added to watchlist")
        }
    }

    const showModalHandler = () => {
        setShowModal(true);
        setShowRoom(false)
        const addBooking = {
            room: room._id
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
        <div className="flex flex-col gap-y-2 sm:gap-x-2 sm:flex-row bg-white w-[100%] sm:w-[520px] h-[240px] sm:h-[174px] p-1 shadow-md rounded-md">
            {/**left */}
            <div className="w-[100%] sm:w-[260px] relative">
                <img src={images[0].url} alt="" className="rounded-sm h-[130px] sm:h-[165px] w-[100%]" />
                {clicked === true && <BsFillBookmarkFill className="absolute top-1 left-1 text-lg cursor-pointer" />}
                <BsBookmark className={`${pathname === "/owner/room" && 'hidden'} absolute top-1 left-1 text-lg cursor-pointer`} onClick={handleAddToWatchlist} />
            </div>
            {/**Right */}
            <div className=" w-[340px] sm:w-[260px] h-full relative">
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
                <div className="flex justify-between absolute bottom-1 w-full">
                    <p className="flex items-center"><FaRupeeSign className="font-thin" />{pricePerMonth}/mo</p>
                    {pathname === '/' ? (
                        <button className="p-1 px-2 w-[45%] text-[#eee] bg-[#512d6d] rounded-lg mr-3" onClick={() => router.push(`/room/${room._id}`)}>View Details</button>
                    ) : (

                        <button className="p-1 px-2 w-[45%] text-[#eee] bg-[#512d6d] rounded-lg mr-3" onClick={showModalHandler}>Book now</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RoomCard

// Edited
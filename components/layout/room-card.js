import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { ImLocation } from 'react-icons/im'
import { FaRupeeSign } from 'react-icons/fa'
import { BsFillBookmarkFill, BsBookmark, BsArrowRight } from 'react-icons/bs'
import _ from 'lodash'
import { WATCHLIST_ADD_ROOM } from "../../redux/constants/watchListConstants"
import { DELETE_ROOM_RESET } from "../../redux/constants/roomConstants"
import { addToWatchlist } from '../../redux/actions/watchListActions'
import { toast } from 'react-toastify'
import axios from 'axios'
import { deleteRoom } from '../../redux/actions/roomActions'

import { MdDelete, MdModeEdit } from 'react-icons/md'

const RoomCard = ({ room, clicked, setShowModal, setShowRoom }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteRoom)


    const router = useRouter()
    const { pathname } = router


    const { name, address, pricePerMonth, images, } = room;

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

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure ?")) {
            dispatch(deleteRoom(id))
        }
    }

    useEffect(() => {
        if (deleteError) {
            toast.error(deleteError);
        }

        if (isDeleted) {
            router.push('/me')
            dispatch({ type: DELETE_ROOM_RESET })
        }
    }, [dispatch, deleteError, isDeleted])

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
        <div className={`flex flex-col gap-y-2 sm:gap-x-2 sm:flex-row bg-white ${pathname === '/' ? 'w-[75vw]' : 'w-[98%]'}  sm:w-[520px] h-[320px] sm:h-[174px] p-2 shadow-md rounded-md`}>
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
                    <h1 className="capitalize font-semibold truncate overflow-hidden ">
                        <Link href={`/room/${room._id}`}>
                            <a className="">{name}</a>
                        </Link>
                    </h1>
                </div>
                {/** price and action button */}
                <div className="flex justify-between items-center absolute bottom-0 w-full">
                    {/* <div className={`${pathname === '/watch-list' ? '' : 'p-2 px-3  text-[#eee] bg-[#512d6d] rounded-lg'}`}> */}
                    <p className="flex items-center"><FaRupeeSign className="font-thin" />{pricePerMonth}/month</p>
                    {/* </div> */}
                    <div className="flex gap-x-3">
                        {pathname === '/me' && (
                            <>
                                <button onClick={() => deleteHandler(room._id)} className="rounded-lg p-2 bg-gray-100 outline-none"><MdDelete className="text-red-400 text-2xl " /></button>
                                <button onClick={() => router.push(`/owner/room/${room._id}`)} className="rounded-lg p-2 bg-gray-100 outline-none"><MdModeEdit className="text-2xl" /></button>
                            </>
                        )}
                        {pathname === '/' || pathname === '/search' || pathname === '/me' ? (
                            <button className="p-2 text-[#eee] border bg-gray-200 rounded-lg outline-none" onClick={() => router.push(`/room/${room._id}`)}><BsArrowRight className='text-2xl text-[#512d6d]' /></button>
                        ) : (
                            <button className="p-2 px-3 w-[100%] text-[#eee] bg-[#512d6d] rounded-lg outline-none" onClick={showModalHandler}>Book now</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomCard

// Edited
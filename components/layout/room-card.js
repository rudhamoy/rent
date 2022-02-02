import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { ImLocation } from 'react-icons/im'
import { FaRupeeSign } from 'react-icons/fa'
import { BsFillBookmarkFill, BsBookmark, BsArrowRight } from 'react-icons/bs'
import _ from 'lodash'
import { DELETE_ROOM_RESET } from "../../redux/constants/roomConstants"
import { addToWatchlist, getWatchList } from '../../redux/actions/watchListActions'
import { toast } from 'react-toastify'
import { deleteRoom } from '../../redux/actions/roomActions'
import useWindowDimensions from './windowSize';
import { MdDelete, MdModeEdit } from 'react-icons/md'

const RoomCard = ({ room, clicked, setShowModal, setShowRoom, bookmarkList }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteRoom)

    const { height, width } = useWindowDimensions()

    const router = useRouter()
    const { pathname } = router


    const { name, address, pricePerMonth, images, roomCategory, tenants } = room;

    let watchList = []

    // click handler for adding to watchlist/bookmark
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

            toast.success("Added to Bookmarks")
        }
    }

    //click handler for removing from wathclist
    const removeFromWatchlist = (id) => {
        if (typeof window !== "undefined") {

            for (let i = 0; i < bookmarkList.length; i++) {
                // let itemsList = JSON.parse(items[i]);
                if (bookmarkList[i]._id === id) {
                    bookmarkList.splice(i, 1);
                }
            }

            localStorage.setItem("watchList", JSON.stringify(bookmarkList));

            dispatch(addToWatchlist(bookmarkList))
            dispatch(getWatchList())
        }

        console.log('clicked', id)
    }

    //show modal while user booking
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

    //delete room  for owner
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
    }, [dispatch, deleteError, isDeleted, router, width])


    return (
        <div className={`flex flex-col gap-y-2 sm:gap-x-2 sm:flex-row bg-white ${pathname === '/' ? 'w-[75vw]' : 'w-[98%]'}  sm:w-[520px] h-[320px] sm:h-[174px] p-2 shadow-md rounded-md`}>
            {/**left */}
            <div className="w-[100%] sm:w-[260px] relative">
                {/* <img src={images[0]} alt="" className="rounded-md h-[200px] sm:h-[165px] w-[100%]" /> */}
                <Image src={images[0]} height={pathname === '/' ? width < 390 ? 280 : 240 : width > 390 ? 210 : 220} width={400} blurDataURL='' className="rounded-md"></Image>
                <div className={`${pathname === "/me" || pathname === '/owner/room' ? 'hidden' : ""} absolute top-1 left-1 bg-[#00000066] p-2 rounded-full`}>
                    {clicked === true ? <BsFillBookmarkFill onClick={() => removeFromWatchlist(room._id)} className=" text-gray-50  text-lg cursor-pointer" /> : (
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
                <div className='flex text-sm text-gray-500'>
                    <p>{roomCategory}, </p>
                    <p> for {tenants} tenants</p>
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
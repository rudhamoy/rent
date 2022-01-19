import React, { useState } from 'react';
// import { useSelector } from 'react-redux'
import RoomImageContianer from './room-image'
import { ImLocation } from 'react-icons/im';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addToWatchlist } from '../../redux/actions/watchListActions'
import _ from 'lodash'
import Footer from '../layout/footer'
import { BsBookmark } from 'react-icons/bs'
import RoomOverview from './room-overview';
import FullDetails from './room-fullDetails';

const RoomDetails = ({ room }) => {

    const [overview, setOverview] = useState(true)
    const [details, setDetails] = useState(false)

    const dispatch = useDispatch()
    // const { room, error } = useSelector(state => state.roomDetails)

    // toggel between overview and details

    const showOverview = () => {
        setOverview(true)
        setDetails(false)
    }

    const showDetails = () => {
        setOverview(false)
        setDetails(true)
    }

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

    return (
        <div className=" sm:px-32 pt-20 sm:py-32 relative">
            {/* for pc */}
            <div className=" hidden">
                <h1 className="text-2xl sm:text-3xl font-semibold uppercase">{room.name} </h1>
                <p className="flex items-center gap-x-2 text-sm my-2 text-gray-500"> <span><ImLocation /></span> {room.address}</p>
            </div>
            <div className="px-[3%] flex flex-col sm:flex-row sm:gap-x-5 my-4">

                {/** Left room details */}
                <div className="w-[100%]">
                    <RoomImageContianer image={room.images} />
                </div>
                {/* for mobile  -- title and location */}
                <div className="px-[3%] my-2">
                    <p className="flex items-center gap-x-2 text-base my-2 text-gray-500"> <span><ImLocation /></span> {room.address}</p>
                    <h1 className="text-2xl sm:text-2xl font-semibold -mt-2 capitalize">{room.name} </h1>
                </div>

                {/** Right room details */}
                <div className=" w-[100%]">
                    {/* switch/toggle button for mobile */}
                    <div className="flex gap-x-1 my-6 p-1 bg-[lightgrey] rounded-lg shadow-sm ">
                        <button onClick={showOverview} className={`p-2 px-3  w-[100%] rounded-lg font-semibold outline-none ${overview === true ? 'bg-gray-50' : 'text-gray-500'}`}>Overview</button>
                        <button onClick={showDetails} className={`p-2 px-3  w-[100%] rounded-lg font-semibold outline-none ${details === true ? 'bg-gray-50' : 'text-gray-500'}`}>Details</button>
                    </div>
                    {/** room contents*/}
                    <div className="my-10">
                        {overview === true ? (
                            <RoomOverview room={room} />
                        ) : (
                            <FullDetails room={room} />
                        )}
                    </div>

                    {/** CTA */}
                    <div className="hidden sm:flex mt-8 gap-x-2 items-center ">
                        <div className="w-[50%]">
                            <p className="font-semibold">{room.pricePerMonth} / Month</p>
                        </div>
                        <div className='flex justify-between w-full'>

                            <button onClick={handleAddToWatchlist} className="bg-[#512d6d] p-2 px-3 rounded-md text-gray-100 shadow-md ">Bookmark</button>
                            <button className="bg-[#512d6d] p-2 px-3 rounded-md text-gray-100 shadow-md outline-none">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer for only mobile */}
            <div className={`sm:hidden`}>
                <Footer />
            </div>

            {/* mobile CTA and price */}
            <div className={`sticky bottom-0 border  bg-gray-100 sm:hidden`}>
                <div className="flex justify-between items-center py-1  px-[3%]">
                    <div className="w-[50%]">
                        <p className="text-gray-500 text-sm -mb-2">Price</p>
                        <p className="font-semibold text-2xl">{room.pricePerMonth} / <span className="text-gray-500 text-sm">Month</span></p>
                    </div>
                    <div className='flex justify-end gap-x-3 w-[50%]'>
                        <button onClick={handleAddToWatchlist} className="bg-[#512d6d] p-2 px-3 rounded-md text-gray-100 text-lg shadow-md"><BsBookmark /></button>
                        <button className="bg-[#512d6d] text-lg p-2 px-3 rounded-md text-gray-100 shadow-md">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails;
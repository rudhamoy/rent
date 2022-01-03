import React from 'react';
import { useSelector } from 'react-redux'
import RoomImageContianer from './room-image'
import { ImLocation } from 'react-icons/im';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addToWatchlist } from '../../redux/actions/watchListActions'
import _ from 'lodash'
import Footer from '../layout/footer'
import { BsBookmark } from 'react-icons/bs'


const FaciltyCard = ({ title, category }) => {
    return (
        <div className="bg-gray-50 p-2 rounded-md text-lg text-gray-600 shadow-md uppercase">
            {title}<br />
            <span className="text-xs ">{category}</span>
        </div>
    )
}

const RoomDetails = () => {
    const dispatch = useDispatch()
    const { room, error } = useSelector(state => state.roomDetails)

    // const image = imageData[0]

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
        <div className=" sm:px-32 pt-28 sm:py-32 reltive">

            <div className="px-[3%]">
                <h1 className="text-2xl sm:text-3xl font-semibold uppercase">{room.name} </h1>
                <p className="flex items-center gap-x-2 text-sm my-2 text-gray-500"> <span><ImLocation /></span> {room.address}</p>
            </div>
            <div className="px-[3%] flex flex-col sm:flex-row sm:gap-x-5 my-4">

                {/** Left room details */}
                <div className="w-[100%]">
                    <RoomImageContianer image={room.images} />
                </div>

                {/** Right room details */}
                <div className=" w-[100%]">
                    {/** description */}
                    <div>
                        <h2 className="text-xl font-semibold font-serif">Description</h2>
                        <div className="bg-gray-100 p-2 my-1 rounded-md">
                            <p className="text-gray-600">A newly constructed rent house which has the nice environment and neighbours surrounded with shops and roads, easily accessible to your daily needs and travel.</p>
                        </div>
                    </div>
                    {/** facility and features */}
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold font-serif">Facility & Features</h2>
                        <div className="py-3 grid grid-cols-2 gap-4">
                            <FaciltyCard title="1bhk" category="room type" />
                            <FaciltyCard title="For all" category="Preferred Tenants" />
                            <FaciltyCard title="Self Payment" category="Electricity" />
                            <FaciltyCard title="1st Floor" category="Floor" />
                        </div>
                    </div>
                    {/** CTA */}
                    <div className="hidden sm:flex mt-8 gap-x-2 items-center ">
                        <div className="w-[50%]">
                            <p className="font-semibold">{room.pricePerMonth} / Month</p>
                        </div>
                        <div className='flex justify-between w-full'>

                            <button onClick={handleAddToWatchlist} className="bg-[#512d6d] p-2 px-3 rounded-md text-gray-100 shadow-md">Bookmark</button>
                            <button className="bg-[#512d6d] p-2 px-3 rounded-md text-gray-100 shadow-md">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer for only mobile */}
            <div className={`sm:hidden`}>
                <Footer />
            </div>

            {/* mobile detail page */}
            <div className={`sticky bottom-0 border  bg-gray-100 sm:hidden`}>
                <div className="flex justify-between items-center py-2  px-[3%]">
                    <div className="w-[50%]">
                        <p className="text-gray-500 text-sm">Price</p>
                        <p className="font-semibold ">{room.pricePerMonth} / <span className="text-gray-500 text-sm">Month</span></p>
                    </div>
                    <div className='flex gap-x-3 w-[50%]'>
                        <button onClick={handleAddToWatchlist} className="bg-[#512d6d] p-2 px-3 rounded-md text-gray-100 text-lg shadow-md"><BsBookmark /></button>
                        <button className="bg-[#512d6d] text-lg p-2 px-3 rounded-md text-gray-100 shadow-md">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails;
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import RoomCard from "../layout/room-card";
import SearchBar from './SearchBar'
import SearchFilter from './search-filter'
import { HiAdjustments } from 'react-icons/hi'
import { VscLocation } from 'react-icons/vsc'
import Pagination from 'react-js-pagination'
import Footer from '../layout/footer';

const Search = () => {
    const { rooms, resPerPage, roomsCount, filteredRoomsCount } = useSelector(state => state.allRooms)
    const router = useRouter()
    let { location, roomCategory, tenants, page = 1 } = router.query
    page = Number(page)

    const [showFilter, setShowFilter] = useState(false)

    const closeFilter = () => {
        setShowFilter(false)
    }

    const handlePagination = (pageNumber) => {
        window.location.href = `/search?page=${pageNumber}`
    }

    let count = roomsCount;
    if (filteredRoomsCount) {
        count = filteredRoomsCount
    }

    return (
        <div className="relative ">
            <div className="pt-28 pb-5 px-[3%] sm:px-32 flex items-center ">
                <SearchBar />
                <div className="p-1 rounded-xl bg-gray-100">
                    <HiAdjustments onClick={() => setShowFilter(!showFilter)} className="text-3xl text-gray-600" />
                </div>
            </div>
            <div className="flex gap-x-2 my-2 pl-[3%]">
                <button className="p-2 px-4 rounded-md border bg-gray-100 ">All</button>
                <button className="p-2 px-4 rounded-md border bg-gray-100 ">New rooms</button>
                <button className="p-2 px-4 rounded-md border bg-gray-100 ">Featured rooms</button>
            </div>

            <div className="px-[3%] text-lg font-semibold my-5 lowercase flex flex-wrap gap-x-2 items-center">
                {location || roomCategory || tenants ? (
                    <p>Your search results for:</p>
                ) : null}
                {location && (

                    <p className="flex gap-x-2 p-1 px-3 bg-gray-300 rounded-xl"> <span className=" flex gap-x-1 items-center"><VscLocation className="text-xl font-semibold text-green-600" /> {location}</span></p>
                )}
                {roomCategory && (
                    <p className="flex gap-x-2 p-1 px-3 bg-gray-300 rounded-xl"><span className=" flex gap-x-1 items-center">{roomCategory}</span></p>
                )}
                {tenants && (
                    <p className="flex gap-x-2 p-1 px-3 bg-gray-300 rounded-xl"> <span className=" flex gap-x-1 items-center">{tenants}</span></p>
                )}
            </div>
            <div className="px-[3%] sm:px-32 flex flex-col sm:flex-row flex-wrap justify-between">
                {rooms && rooms.map(room => (
                    <div key={room._id} className="my-3 mb-5">
                        <RoomCard room={room} id={room._id} />
                    </div>
                ))}
                {rooms && rooms.length === 0 && (
                    <div className="flex justify-center my-8">
                        <p className="p-3 text-xl bg-gray-200 border rounded-md">No room found!</p>
                    </div>
                )}
                {resPerPage <= count && (
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={roomsCount}
                        onChange={handlePagination}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        innerClass="flex items-center gap-x-5 text-lg  my-3"
                        activeClass="bg-[#512d6d] text-gray-50 p-1 px-2 rounded-sm"
                    />
                )}
            </div>

            {/* footer for only mobile */}
            <div className={`sm:hidden`}>
                <Footer />
            </div>

            {showFilter === true && (
                <div className="sticky bottom-0 z-50 ">
                    <SearchFilter
                        close={closeFilter}
                    />
                </div>
            )}
        </div>
    )
}

export default Search

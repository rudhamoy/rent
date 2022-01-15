import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import RoomCard from "../layout/room-card";
import SearchBar from './SearchBar'
import SearchFilter from './search-filter'
import { HiAdjustments } from 'react-icons/hi'

import Footer from '../layout/footer';

const Search = () => {
    const { rooms } = useSelector(state => state.allRooms)

    const [filteredPrice, setFilteredPrice] = useState("100000")
    const [filteredTenants, setFilteredTenants] = useState("")

    const [showFilter, setShowFilter] = useState(false)

    const closeFilter = () => {
        setShowFilter(false)
    }

    useEffect(() => {
    }, [filteredPrice])

    return (
        <div className="relative ">
            <div className="pt-28 pb-5 px-[3%] sm:px-32 flex items-center ">
                <SearchBar />
                <div className="p-2 rounded-xl bg-gray-100">
                    <HiAdjustments onClick={() => setShowFilter(!showFilter)} className="text-3xl text-gray-600" />
                </div>
            </div>
            <div className="flex gap-x-2 my-2 pl-[3%]">
                <button className="p-2 px-4 rounded-md border bg-gray-100 ">All</button>
                <button className="p-2 px-4 rounded-md border bg-gray-100 ">New rooms</button>
                <button className="p-2 px-4 rounded-md border bg-gray-100 ">Featured rooms</button>
            </div>
            <div className="px-[3%] sm:px-32 flex flex-col sm:flex-row flex-wrap justify-between">
                {rooms && rooms.filter(room => room.pricePerMonth <= filteredPrice).filter(room => !filteredTenants ? room : filteredTenants === room.tenants).map(room => (
                    <div key={room._id} className="my-3">
                        <RoomCard room={room} id={room._id} />
                    </div>
                ))}
            </div>

            {/* footer for only mobile */}
            <div className={`sm:hidden`}>
                <Footer />
            </div>

            {showFilter === true && (
                <div className="sticky bottom-0 z-50 ">
                    <SearchFilter close={closeFilter} />
                </div>
            )}
        </div>
    )
}

export default Search

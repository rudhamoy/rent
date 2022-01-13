import React, { useState, useEffect } from 'react'
import { wrapper } from "../redux/store"
import { getRooms } from "../redux/actions/roomActions"
import { useSelector } from 'react-redux';
import RoomCard from "../components/layout/room-card";
import SearchBar from '../components/search/SearchBar'
import SearchFilter from '../components/search/search-filter'
import { HiAdjustments } from 'react-icons/hi'

import classes from '../components/search/search.module.css'



const SearchPage = () => {
    const { rooms } = useSelector(state => state.allRooms)

    const [filteredPrice, setFilteredPrice] = useState("100000")
    const [filteredTenants, setFilteredTenants] = useState("")

    const [showFilter, setShowFilter] = useState(false)

    useEffect(() => {
    }, [filteredPrice])

    return (
        <div className="relative">
            <div className="pt-28 pb-8 px-[3%] sm:px-32 flex items-center gap-x-1">
                <SearchBar />
                <div className="p-2 rounded-xl bg-gray-100">
                    <HiAdjustments onClick={() => setShowFilter(true)} className="text-3xl text-gray-600" />
                </div>
            </div>
            <div className="px-[3%] sm:px-32 flex flex-col sm:flex-row flex-wrap justify-between">
                {rooms && rooms.filter(room => room.pricePerMonth <= filteredPrice).filter(room => !filteredTenants ? room : filteredTenants === room.tenants).map(room => (
                    <div key={room._id} className="my-3">
                        <RoomCard room={room} id={room._id} />
                    </div>
                ))}
            </div>
            {showFilter === true && (
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000066] z-50 flex justify-center">
                    <SearchFilter />
                </div>
            )}
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
    await store.dispatch(getRooms(req, query.location))
})

export default SearchPage

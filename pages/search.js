import React, { useState, useEffect } from 'react'
import { wrapper } from "../redux/store"
import { getRooms } from "../redux/actions/roomActions"
import { useSelector } from 'react-redux';
import RoomCard from "../components/layout/room-card";
import SearchBar from '../components/search/SearchBar'
import { FaChevronDown } from 'react-icons/fa'
import { HiAdjustments } from 'react-icons/hi'

import classes from '../components/search/search.module.css'

const SearchFilterBox = ({ children }) => {
    return (
        <li className="bg-white px-2 rounded-md shadow-md cursor-pointer flex justify-center items-center gap-x-2">
            {children}
        </li>
    )
}


const SearchPage = () => {
    const { rooms } = useSelector(state => state.allRooms)

    const [filteredPrice, setFilteredPrice] = useState("100000")
    const [filteredTenants, setFilteredTenants] = useState("")

    useEffect(() => {
    }, [filteredPrice])

    return (
        <>
            <div className="py-28 sm:px-32">
                <SearchBar />
                <div className={`${classes.search__filter} flex sm:justify-center mt-3`}>
                    <ul className="flex gap-x-5 font-semibold text-sm pl-[2%]">
                        <SearchFilterBox>
                            <div className="flex items-center gap-x-2">
                                <p>Filter</p>
                                <HiAdjustments />
                            </div>
                        </SearchFilterBox>
                        <SearchFilterBox>
                            <select
                                value={filteredPrice}
                                onChange={e => setFilteredPrice(e.target.value)}
                            >
                                <option value="100000" >Price</option>
                                <option value="4000" >Below 4000</option>
                                <option value="6000" >Below 6000</option>
                                <option value="8000" >Below 8000</option>
                                <option value="10000" >Below 10000</option>
                            </select>
                        </SearchFilterBox>
                        <SearchFilterBox>
                            Room Type <FaChevronDown />
                        </SearchFilterBox>
                        <SearchFilterBox>
                            <select
                                value={filteredTenants}
                                onChange={e => setFilteredTenants(e.target.value)}
                            >
                                <option value="">Preferred Tenants</option>
                                <option value="All">All</option>
                                <option value="Students">Students</option>
                                <option value="Family">Family</option>
                                <option value="Girls">Girls</option>
                            </select>
                        </SearchFilterBox>
                        <SearchFilterBox>Bathroom Type <FaChevronDown /></SearchFilterBox>
                        <SearchFilterBox>
                            Electricity Type <FaChevronDown />
                        </SearchFilterBox>
                    </ul>
                </div>
            </div>
            <div className="px-[12px] sm:px-32 flex flex-wrap justify-between">
                {rooms && rooms.filter(room => room.pricePerMonth <= filteredPrice).filter(room => !filteredTenants ? room : filteredTenants === room.tenants).map(room => (
                    <div key={room._id} className="my-3">
                        <RoomCard room={room} id={room._id} />
                    </div>
                ))}
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
    await store.dispatch(getRooms(req, query.location))
})

export default SearchPage

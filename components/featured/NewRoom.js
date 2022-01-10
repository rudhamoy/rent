import React, { useState } from 'react'

import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import RoomCard from '../layout/room-card';
import { useSelector } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa'
import { HiAdjustments } from 'react-icons/hi'

const SearchFilterBox = ({ children }) => {
    return (
        <li className="bg-white px-2 rounded-md shadow-md cursor-pointer flex justify-center items-center gap-x-2">
            {children}
        </li>
    )
}

const NewRoom = () => {
    const [filteredPrice, setFilteredPrice] = useState("100000")
    const [filteredTenants, setFilteredTenants] = useState("")
    const { rooms, error } = useSelector(state => state.allRooms)
    return (
        <div className={`flex overflow-x-scroll`}>
            <div className="flex gap-x-5 font-semibold text-sm pl-[2%]">

                {rooms && rooms.slice(0, 4).map(room => (
                    <div className=" bg-white bordern m-2" style={{ width: '300px', height: "200px" }}>
                        <h1>{room.name}</h1>
                    </div>
                ))}
            </div>
            {/* <ul className="flex gap-x-5 font-semibold text-sm pl-[2%]">
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
            </ul> */}
        </div>
    )
}

export default NewRoom

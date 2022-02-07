import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import RoomCard from "../layout/room-card";
import SearchBar from './SearchBar'
import SearchFilter from './search-filter'
import { HiAdjustments, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { VscLocation } from 'react-icons/vsc'
import { GrFormClose } from 'react-icons/gr'
import { BiSearch } from 'react-icons/bi'

import Pagination from 'react-js-pagination'
import Footer from '../layout/footer';
import { getNewRooms } from '../../redux/actions/roomActions';

const Search = () => {
    const dispatch = useDispatch()
    const { rooms, resPerPage, roomsCount, filteredRoomsCount } = useSelector(state => state.allRooms)
    const { rooms: newRooms, loading } = useSelector(state => state.newRoomsList)
    const router = useRouter()
    let { location, roomCategory, tenants, featured, newRoom, page = 1 } = router.query
    page = Number(page)

    const [showFilter, setShowFilter] = useState(false)
    const [room, setRoom] = useState('')
    const [tenant, setTenant] = useState('')
    const [value, setValue] = useState([1000, 30000])
    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
        if (!location) {
            location = ""
        }
        if (newRoom) {
            dispatch(getNewRooms())
        }
    }, [location, dispatch, newRoom])

    //dispacth new room on click
    const newRoomHandler = () => {

        window.location.href = `/search?newRoom=true`
    }

    // close filter modal
    const closeFilter = () => {
        setShowFilter(false)
    }


    // onclick function for pagination
    const handlePagination = (pageNumber) => {
        if (roomCategory || tenants && filteredRoomsCount) {
            window.location.href = `/search?page=${pageNumber}&min=${value[0]}&max=${value[1]}&tenants=${tenant}&roomCategory=${room}`
        } else if (location) {
            window.location.href = `/search?page=${pageNumber}&location=${location}&min=${value[0]}&max=${value[1]}&roomCategory=${room}&tenants=${tenant}`
        } else {
            window.location.href = `/search?page=${pageNumber}`
        }
    }

    // room count for pagination
    let count = roomsCount;
    if (location || roomCategory || tenants || featured && filteredRoomsCount) {
        count = filteredRoomsCount
    }

    // clear room cateogry filter
    const closeRoomHandler = () => {
        setRoom('')
        if (location) {
            router.push(`/search?location=${location}&min=${value[0]}&max=${value[1]}&tenants=${tenant}`)
        } else {
            router.push(`/search?min=${value[0]}&max=${value[1]}&tenants=${tenant}`)
        }
    }

    // clear tenant filter
    const closeTenantHandler = () => {
        setTenant('')
        if (location) {
            router.push(`/search?location=${location}&min=${value[0]}&max=${value[1]}&roomCategory=${room}`)
        } else {
            router.push(`/search?min=${value[0]}&max=${value[1]}&roomCategory=${room}`)
        }
    }

    // clear location filter
    const closeAddressHandler = () => {
        router.push(`/search?min=${value[0]}&max=${value[1]}&roomCategory=${room}&tenants=${tenant}`)
    }

    // clear all search filter
    const clearAll = () => {
        router.push(`/search`)
    }

    //render featured room list
    const featuredRoomList = () => {
        router.push(`/search?min=${value[0]}&max=${value[1]}&featured=true`)
    }

    // client side pagination
    const skip = resPerPage * (page - 1);
    const end = resPerPage * (page);

    // click handler for search modal
    const showSearchHandler = (e) => {
        e.preventDefault()
        setShowSearch(true)
    }

    //close search modal
    const closeSearch = () => {
        setShowSearch(false)
    }

    //onClick handler for search
    const onclickHandler = (location) => {
        if (location.trim()) {
            router.push(`/search?location=${location}`)
            closeSearch()
        } else {
            router.push('/search')
        }
    }

    return (
        <div className="relative ">

            {/** Search bar */}
            {showSearch === true &&
                <div className={`absolute top-0 bottom-0 left-0 right-0 bg-[#000000e5] z-50 pt-[5%]`}>
                    <SearchBar closeSearch={closeSearch} />
                    <div className='mx-[3%] p-2 shadow-md border mt-[5px] bg-gray-100 rounded-md'>
                        <ul>
                            <li className='text-gray-500 text-sm'>suggested keyword</li>
                            <li onClick={() => onclickHandler('abhaynagar')} className="flex justify-between items-center mb-2"><p>Abhaynagar</p> <HiOutlineArrowNarrowRight /></li>
                            <li onClick={() => onclickHandler('krishna nagar')} className="flex justify-between items-center mb-2"><p>Krishna nagar</p> <HiOutlineArrowNarrowRight /></li>
                            <li onClick={() => onclickHandler('radhanagar')} className="flex justify-between items-center mb-2"><p>Radha nagar</p> <HiOutlineArrowNarrowRight /></li>
                            <li onClick={() => onclickHandler('buddha mandir')} className="flex justify-between items-center mb-2"><p>Buddha Mandir</p> <HiOutlineArrowNarrowRight /></li>

                        </ul>
                    </div>
                </div>
            }
            <div className="pt-28 pb-5 px-[3%] sm:px-32 flex items-center gap-x-1">
                {/* search bar placeholder */}
                <div className={`bg-white w-[100%] rounded-md  overflow-hidden flex gap-x-1 items-center py-2 p-1 shadow-md`} >
                    <BiSearch className="cursor-pointer text-2xl text-gray-600" />
                    <input type="text" disabled={showSearch === true ? true : false} onClick={showSearchHandler} placeholder="Search for location" className="h-[100%] w-full outline-none pl-3"
                    />
                </div>
                <div className="p-1 rounded-xl bg-gray-100">
                    <HiAdjustments onClick={() => setShowFilter(!showFilter)} className="text-3xl text-gray-600" />
                </div>
            </div>

            {/* categories button */}
            <div className="flex gap-x-2 my-2 pl-[3%]">
                <button onClick={() => router.push('/search')} className={`outline-none p-2 px-4 rounded-md border ${!newRoom && !featured ? 'bg-gray-800 text-gray-50' : 'bg-gray-100'} `}>All</button>
                <button onClick={newRoomHandler} className={`outline-none p-2 px-4 rounded-md border ${newRoom ? 'bg-gray-800 text-gray-50' : 'bg-gray-100'} `}>New rooms</button>
                <button onClick={featuredRoomList} className={`outline-none p-2 px-4 rounded-md border ${featured ? 'bg-gray-800 text-gray-50' : 'bg-gray-100'} `}>Featured rooms</button>
            </div>

            <div className="px-[3%] text-lg font-semibold my-5 lowercase flex flex-wrap gap-x-2 items-center">
                {featured && (
                    <p>Featured Room List</p>
                )}
                {newRoom && (
                    <p>New Room List</p>
                )}
                {location || roomCategory || tenants ? (
                    <p>Your search results for:</p>
                ) : null}

                {location && (

                    <p className="flex items-center gap-x-2 p-1 px-2 bg-gray-300 rounded-md text-base"> <span className=" flex gap-x-1 items-center"><VscLocation className="text-xl font-semibold text-green-600" /> {location}</span><GrFormClose onClick={() => closeAddressHandler()} className="text-lg" /></p>
                )}
                {roomCategory && (
                    <p className="flex items-center gap-x-2 p-1 px-2 bg-gray-300 rounded-md text-base"><span className=" flex gap-x-1 items-center">{roomCategory}</span><GrFormClose onClick={() => closeRoomHandler()} className="text-lg" /></p>
                )}
                {tenants && (
                    <p className="flex items-center gap-x-2 p-1 px-2 bg-gray-300 rounded-md text-base"> <span className=" flex gap-x-1 items-center">{tenants}</span><GrFormClose onClick={() => closeTenantHandler()} className="text-lg" /></p>
                )}
            </div>
            {location || roomCategory || tenants ? (
                <div className="flex justify-between text-sm text-gray-600 px-[3%]">
                    <p>{filteredRoomsCount} results</p>
                    <button onClick={clearAll}>clear all</button>
                </div>
            ) : (
                null
            )}
            <div className="px-[3%] sm:px-32 flex flex-col sm:flex-row flex-wrap justify-center">
                {/* fetch room list */}
                {/* {rooms && rooms.slice(skip, end).map(room => (
                    <div key={room._id} className="my-3 mb-5">
                        <RoomCard room={room} id={room._id} />
                    </div>
                ))} */}
                {loading === true && (
                    <div className="p-2 bg-gray-100 rounded-md flex justify-center">Loading Room List....</div>
                )}
                {newRoom ? newRooms?.map(room => (
                    <div key={room._id} className="my-3 mb-5">
                        <RoomCard room={room} id={room._id} />
                    </div>
                )) : rooms?.slice(skip, end).map(room => (
                    <div key={room._id} className="my-3 mb-5">
                        <RoomCard room={room} id={room._id} />
                    </div>
                ))}
                {rooms && rooms.length === 0 && (
                    <div className="flex justify-center my-8">
                        <p className="p-3 text-xl bg-gray-200 border rounded-md">No room found!</p>
                    </div>
                )}

                {/* pagination */}
                {resPerPage <= count && (
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={count}
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

            {/* filter modal */}
            {showFilter === true && (
                <div className="sticky bottom-0 z-50 ">
                    <SearchFilter
                        close={closeFilter}
                        room={room}
                        setRoom={setRoom}
                        tenant={tenant}
                        setTenant={setTenant}
                        value={value}
                        setValue={setValue}
                    />
                </div>
            )}
        </div>
    )
}

export default Search

import React, { useState } from 'react';
import classes from './search.module.css'
import { useRouter } from 'next/router'
import { BiSearch } from 'react-icons/bi'
import { GrFormClose } from 'react-icons/gr'

const SearchBar = ({ closeSearch }) => {
    const [location, setLocation] = useState("");

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();

        if (location.trim()) {
            router.push(`/search?location=${location}`)
        } else {
            router.push('/search')
        }
    }

    return (
        <div className="px-[3%] w-[100%]">
            <div className="flex justify-between pb-3 text-gray-50">
                <p>Search</p>
                <GrFormClose onClick={() => closeSearch()} className="text-2xl bg-gray-50 rounded-full" />
            </div>
            <div>
                <form className={`bg-white max-w-xl mx-auto  rounded-md  overflow-hidden flex gap-x-1 items-center py-2 p-1 shadow-md ${classes.search_container}`} onSubmit={submitHandler}>
                    <BiSearch onClick={submitHandler} className="cursor-pointer text-2xl text-gray-600" />
                    <input type="text" placeholder="Search for location" className="h-[100%] w-full outline-none pl-3"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                    {/* <div className="text-[#eeeeee] bg-[#512d6d]  rounded-md p-2 text-2xl">
                        <BiSearch onClick={submitHandler} className="cursor-pointer" />
                    </div> */}
                </form>
            </div>
        </div>
    )
}

export default SearchBar

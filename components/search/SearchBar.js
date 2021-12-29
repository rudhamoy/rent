import React, { useState } from 'react';
import classes from './search.module.css'
import { useRouter } from 'next/router'
import { BiSearch } from 'react-icons/bi'

const SearchBar = () => {
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
        <div className="p-2">
            <div>
                <form className={`bg-white max-w-xl mx-auto h-[50px]  overflow-hidden flex gap-x-1 items-center p-1 shadow-md ${classes.search_container}`} onSubmit={submitHandler}>
                    <input type="text" placeholder="Search" className="h-[100%] w-full outline-none pl-3"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                    <div className="text-[#eeeeee] bg-[#512d6d] h-9 w-9 rounded-full flex justify-center items-center text-2xl">
                        <BiSearch onClick={submitHandler} className="cursor-pointer" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchBar

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RiCloseCircleLine, RiNumbersFill } from 'react-icons/ri'
import { FiHome } from 'react-icons/fi'
import { BiChevronDown } from 'react-icons/bi'
import { BsPersonFill } from 'react-icons/bs'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import classes from './search.module.css'

const SearchFilter = ({ close }) => {
    const router = useRouter()
    let { location, roomCategory, tenants, min, max } = router.query

    // const [value, setValue] = useState([1000, 100000])
    const [minPrice, setMinPrice] = useState(1000)
    const [maxPrice, setMaxPrice] = useState(30000)
    const [value, setValue] = useState([1000, 30000])
    const [room, setRoom] = useState('')
    const [tenant, setTenant] = useState('')
    // const [bathroomCheck, setBathroomCheck] = useState('')

    useEffect(() => {
        if (roomCategory) {
            setRoom(roomCategory)
        } else if (room === undefined) {
            setRoom('')
        } else {
            setRoom(room)
        }

        if (tenants) {
            setTenant(tenants)
        } else if (tenant === undefined) {
            setTenant('')
        } else {
            setTenant(tenant)
        }

        if (min && max) {
            setValue([min, max])
        }

    }, [min, max, location])

    const handleChange = (e) => {
        setValue(e)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (location) {
            router.push(`/search?location=${location}&min=${value[0]}&max=${value[1]}&roomCategory=${room}&tenants=${tenant}`)
        } else {

            router.push(`/search?min=${value[0]}&max=${value[1]}&roomCategory=${room}&tenants=${tenant}`)
        }

        close()
    }

    return (
        <div className='bg-[#00000066] h-[100vh] relative'>

            {/* filter component */}
            <div className=" bg-gray-50 absolute bottom-0 left-0 right-0 h-[500px]" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                <div className="px-4 py-2 flex justify-between text-lg">
                    <p>Filter</p>
                    <button onClick={close} className="text-gray-400 text-2xl">
                        <RiCloseCircleLine />
                    </button>
                </div>

                {/* room type filter */}
                <div className="px-4 py-1 mt-1 mb-2">
                    <p className="font-semibold text-gray-800">Type of room</p>
                    <div className="bg-gray-200 p-2 py-3  rounded-lg my-2 flex items-center gap-x-2 overflow-hidden relative">
                        <FiHome className='text-2xl font-bold' />
                        <div className={`w-[120%] ${classes.select__container}`}>
                            <select value={room} onChange={e => setRoom(e.target.value)} className="w-[120%] bg-transparent relative outline-none">
                                <option value="">select type of room</option>
                                {["1R", "1RK", "1BHK", "2R", "2RK", "2BHK", "3BHK"].map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                </div>

                {/* tenant type filter */}
                <div className="px-4 py-1 mt-1 mb-2">
                    <p className="font-semibold text-gray-800">Type of tenant</p>
                    <div className="bg-gray-200 p-2 py-3  rounded-lg my-2 flex items-center gap-x-2 overflow-hidden relative">
                        <BsPersonFill className='text-2xl font-bold' />
                        <div className={`w-[120%] ${classes.select__container}`}>
                            <select value={tenant} onChange={e => setTenant(e.target.value)} className="w-[120%] bg-transparent relative outline-none">
                                <option value=''>select type of tenant</option>
                                {["All", "Students", "Family", "Girls", "Boys", "Bachelor",].map(tenants => (
                                    <option key={tenants} value={tenants}>{tenants}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* price filter */}
                <div className="px-4 py-1 mt-1 mb-2 ">
                    <p className="font-semibold text-gray-800">Filter my price</p>
                    <div className=" my-2">

                        {/* <input className="" type="range" min="1" max="100" value={value} onChange={({ target: { value: radius } }) => { setValue(radius) }} />
                        <div className="bubble text-center text-2xl ">{value}</div> */}
                        <Range allowCross={false} step={3000} defaultValue={value} min={minPrice} max={maxPrice} onChange={handleChange} />
                        <div className="pt-2">
                            <p>Min: <span className="font-semibold">{value[0]}</span> / month</p>
                            <p>Max: <span className="font-semibold">{value[1]}</span> / month</p>
                        </div>
                    </div>
                </div>
                {/* features */}
                {/* <div className="mt-1 py-1 mb-2">
                    <p className="px-4 font-semibold text-gray-800">Features</p>
                    <div className={`my - 2 pl - 4 flex gap - x - 2 pr - 4 ${classes.search__filter}`}>
                        <div className="p-2 border rounded-lg bg-gray-200 flex items-center gap-x-2">
                            <input type="checkbox" name="bathroom" value="Attached" onChange={e => setBathroomCheck(e.target.value)} />
                            <label className='flex gap-x-1' htmlFor="check-1">Attached <span>Bathroom</span></label>
                        </div>
                    </div>
                </div> */}
                <div className="bg-green-200 m-4">
                    <button onClick={submitHandler} className="bg-[#512d6d] p-2 w-[100%] text-lg font-semibold text-gray-50 rounded-md">Filter</button>
                </div>
            </div>
        </div>
    )
}

export default SearchFilter

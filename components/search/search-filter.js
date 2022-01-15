import React, { useState, useEffect } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { FiHome } from 'react-icons/fi'
import { BiChevronDown } from 'react-icons/bi'
import { BsPersonFill } from 'react-icons/bs'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchFilter = ({ close }) => {
    // const [value, setValue] = useState([1000, 100000])
    const [min, setMin] = useState(1000)
    const [max, setMax] = useState(30000)
    const [value, setValue] = useState([])

    const handleChange = (e) => {
        // e.preventDefault()
        console.log(e)
        setValue(e)
    }

    // useEffect(() => {
    //     const ele = document.querySelector('.bubble')

    //     if (ele) {
    //         ele.style.left = `${Number(value / 4)}px`
    //     }
    // })

    return (
        <div className='bg-[#00000066] h-[100vh] relative'>

            {/* filter component */}
            <div className=" bg-gray-50 absolute bottom-0 left-0 right-0 h-[580px]" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                <div className="px-4 py-2 flex justify-between text-lg">
                    <p>Filter</p>
                    <button onClick={close} className="text-gray-400 text-2xl">
                        <RiCloseCircleLine />
                    </button>
                </div>

                {/* room type filter */}
                <div className="px-4 py-1 mt-1 mb-2">
                    <p className="font-semibold text-gray-800">Type of room</p>
                    <div className="bg-gray-200 p-2 py-3 rounded-lg flex items-center gap-x-2 my-2">
                        <FiHome className='text-2xl font-bold' />
                        <input type="text" placeholder='select type of house' className="w-full bg-gray-200 outline-none" />
                        <button className="bg-gray-50 rounded-full p-1">
                            <BiChevronDown />
                        </button>
                    </div>
                </div>
                {/* tenant type filter */}
                <div className="px-4 py-1 mt-1 mb-2">
                    <p className="font-semibold text-gray-800">Type of tenant</p>
                    <div className="bg-gray-200 p-2 py-3 rounded-lg flex items-center gap-x-2 my-2">
                        <BsPersonFill className='text-2xl font-bold' />
                        <input type="text" placeholder='select type of tenant' className="w-full bg-gray-200 outline-none" />
                        <button className="bg-gray-50 rounded-full p-1">
                            <BiChevronDown />
                        </button>
                    </div>
                </div>
                {/* price filter */}
                <div className="px-4 py-1 mt-1 mb-2 ">
                    <p className="font-semibold text-gray-800">Filter my price</p>
                    <div className=" my-2">

                        {/* <input className="" type="range" min="1" max="100" value={value} onChange={({ target: { value: radius } }) => { setValue(radius) }} />
                        <div className="bubble text-center text-2xl ">{value}</div> */}
                        <Range allowCross={false} step={3000} defaultValue={[1000, 30000]} min={min} max={max} onChange={handleChange} />
                        <div className="pt-2">
                            <p>Min: <span className="font-semibold">{value[0]}</span> / month</p>
                            <p>Max: <span className="font-semibold">{value[1]}</span> / month</p>
                        </div>
                    </div>
                </div>
                {/* features */}
                <div className="mt-1 py-1 mb-2">
                    <p className="px-4 font-semibold text-gray-800">Features</p>
                    <div className="my-2 pl-4 flex gap-x-2 overflow-x-scroll">
                        {/* bathroom */}
                        <div className="p-2 border rounded-lg bg-gray-200 flex items-center gap-x-2">
                            <input type="checkbox" name="check-1" value="check-1" id="check-1" />
                            <label className='flex gap-x-1' htmlFor="check-1">Attached <span>Bathroom</span></label>
                        </div>
                        {/* bathroom */}
                        <div className="p-2 border rounded-lg bg-gray-200 flex items-center gap-x-2">
                            <input type="checkbox" name="check-1" value="check-1" id="check-1" />
                            <label className='flex gap-x-1' htmlFor="check-2">Attached <span>Bathroom</span></label>
                        </div>
                        {/* bathroom */}
                        <div className="p-2 border rounded-lg bg-gray-200 flex items-center gap-x-2">
                            <input type="checkbox" name="check-1" value="check-1" id="check-1" />
                            <label className='flex gap-x-1' htmlFor="check-3">Attached <span>Bathroom</span></label>
                        </div>
                        {/* bathroom */}
                        <div className="p-2 border rounded-lg bg-gray-200 flex items-center gap-x-2">
                            <input type="checkbox" name="check-1" value="check-1" id="check-1" />
                            <label className='flex gap-x-1' htmlFor="check-4">Attached <span>Bathroom</span></label>
                        </div>
                    </div>
                </div>
                <div className="bg-green-200 m-4">
                    <button className="bg-[#512d6d] p-2 w-[100%] text-lg font-semibold text-gray-50 rounded-md">Filter</button>
                </div>
            </div>
        </div>
    )
}

export default SearchFilter

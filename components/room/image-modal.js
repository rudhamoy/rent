import React, { useState } from 'react'
import classes from './room.module.css'
import OutsideClickHandler from 'react-outside-click-handler';
import { RiCloseCircleLine } from 'react-icons/ri'


const ImageModal = ({ image, closeMenu }) => {
    // const [indexNum, setIndexNum] = useState(1)
    const length = image.length
    return (
        <OutsideClickHandler onOutsideClick={closeMenu}>
            <div className="px-[3%]">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-100">Total {length} images</p>
                    <RiCloseCircleLine onClick={closeMenu} className="text-2xl text-white" />
                </div>
                <div className={`flex gap-x-1  overflow-x-scroll ${classes.container}`}>
                    {image.map((i, index) => {
                        return (
                            <img src={i} key={index} alt="image" className={`${classes.child} w-[95%]`} />
                        )
                    })}
                </div >
            </div >
        </OutsideClickHandler>

    )
}

export default ImageModal
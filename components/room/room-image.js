import { useState } from 'react'
import Image from 'next/image'
import { GoChevronRight, GoChevronLeft } from 'react-icons/go'

const RoomImageContianer = ({ image }) => {
    const featuredImage = image[0]
    const [preview, setPreview] = useState(featuredImage);
    const [starting, setStarting] = useState(0)
    const [ending, setEnding] = useState(3)

    // const { gallery } = image
    const imageLength = image.length


    const selectImageHandler = (i) => {
        setPreview(i)
        console.log('clciked', i)
    }

    const nextImageHandler = () => {
        if (ending < imageLength) {
            setEnding(ending + 1)
            setStarting(starting + 1)
        }
    }

    const prevImageHandler = () => {
        if (starting !== 0) {
            setEnding(ending - 1)
            setStarting(starting - 1)
        }
    }



    return (
        <div>
            {/** featured image */}
            <div className="w-[100%] rounded-md ">
                {/* <img src={preview} alt="" className="w-full h-[240px] object-cover rounded-lg" /> */}
                <Image src={preview} height={240} width={400} className="rounded-md"></Image>
            </div>
            {/** gallery images */}
            <div className="flex justify-between gap-x-1 my-1 relative ">
                {image?.slice(starting, ending).map((i, index) => (
                    // <img key={index} onClick={() => selectImageHandler(i)} src={i} alt="" className="w-[31.5%] h-[80px] cursor-pointer rounded-md" />
                    <Image key={index} onClick={() => selectImageHandler(i)} src={i} height={80} width={125} className="rounded-md"></Image>
                ))}

                <div className="absolute flex justify-between items-center w-full text-xl top-[45%] ">
                    <div className="bg-white w-5 h-5 flex justify-center items-center rounded-full cursor-pointer">
                        <GoChevronLeft onClick={prevImageHandler} />
                    </div>
                    <div className="bg-white w-5 h-5 flex justify-center items-center rounded-full cursor-pointer">
                        <GoChevronRight onClick={nextImageHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomImageContianer

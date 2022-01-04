import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWatchList } from '../redux/actions/watchListActions';

import RoomCard from '../components/layout/room-card';
import Modal from '../components/layout/modal';
import Footer from '../components/layout/footer'

const WatchListPage = () => {
    const [clicked, setClicked] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [showRoom, setShowRoom] = useState(true)


    const dispatch = useDispatch()
    const { rooms } = useSelector(state => state.allWatchList);

    useEffect(() => {
        dispatch(getWatchList())
    }, [dispatch])


    return (
        <div className='relative'>

            <div className="pt-8 py-10 px-[3%] ">
                <h1 className="sm:text-center sm:text-2xl font-semibold py-10 px-[3%]">My Bookmark List</h1>

                {rooms?.length === 0 && (
                    <div className="my-10 ">
                        <p className="p-2 rounded-md font-semibold bg-gray-100">Start adding or bookmark your favorite room</p>
                    </div>
                )}
                <div className="flex flex-col gap-y-5 justify-center items-center sm:my-10">
                    {/* {showModal === true ? (
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000066] z-50 flex justify-center py-[50%] ">
                            <Modal setShowModal={setShowModal} setShowRoom={setShowRoom} />
                        </div>
                    ) :
                        rooms && rooms.map(room => (
                            <RoomCard room={room} key={room._id} clicked={clicked} setShowModal={setShowModal} setShowRoom={setShowRoom} />
                        ))
                    } */}

                    {showModal === true &&
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000066] z-50 flex justify-center py-[40%] ">
                            <Modal setShowModal={setShowModal} setShowRoom={setShowRoom} />
                        </div>
                    }
                    {rooms && rooms.map(room => (
                        <RoomCard room={room} key={room._id} clicked={clicked} setShowModal={setShowModal} setShowRoom={setShowRoom} />
                    ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default WatchListPage

//wathclist as bookmark


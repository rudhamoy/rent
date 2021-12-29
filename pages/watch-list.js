import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWatchList } from '../redux/actions/watchListActions';

import RoomCard from '../components/layout/room-card';
import Modal from '../components/layout/modal';

const watchListPage = () => {
    const [clicked, setClicked] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [showRoom, setShowRoom] = useState(true)


    const dispatch = useDispatch()
    const { rooms } = useSelector(state => state.allWatchList);

    useEffect(() => {
        dispatch(getWatchList())
    }, [dispatch])


    // const showModalHandler = () => {
    //     setShowModal(true);
    //     setShowRoom(false)
    // }


    return (
        <div className="pt-8">
            <h1 className="sm:text-center sm:text-2xl font-semibold py-5 px-[3%]">My Bookmark List</h1>
            <div className="flex flex-col gap-y-5 justify-center items-center sm:my-10">
                {showModal === true ? <Modal setShowModal={setShowModal} setShowRoom={setShowRoom} /> :
                    rooms && rooms.map(room => (
                        <RoomCard room={room} key={room._id} clicked={clicked} setShowModal={setShowModal} setShowRoom={setShowRoom} />
                    ))
                }



            </div>
        </div>
    )
}

export default watchListPage

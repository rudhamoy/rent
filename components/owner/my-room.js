import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOwnerRooms } from '../../redux/actions/roomActions'


import RoomCard from '../layout/room-card'

const MyRoom = () => {

    const dispatch = useDispatch()
    const { rooms, loading } = useSelector(state => state.myRoomlist)

    useEffect(() => {
        dispatch(getOwnerRooms())

    }, [dispatch])

    return (
        <div>
            <h1 className="font-semibold my-3">My room list</h1>

            <div className='flex flex-col sm:flex-row flex-wrap gap-y-3 sm:gap-x-4'>
                {rooms.length > 0 ? rooms?.map(room => {
                    return <RoomCard room={room} key={room._id} />
                }) : (
                    <div className='p-2 bg-gray-100 rounded-md text-gray-500'>
                        <p>No room available</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyRoom

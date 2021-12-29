import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import RoomCard from '../layout/room-card';
import { useSelector } from 'react-redux';

const Featured = () => {
    const { rooms, error } = useSelector(state => state.allRooms)

    return (
        <div className="px-6 sm:px-32 bg-gray-200 py-8">
            <h1 className="flex items-center gap-x-5 font-semibold">Featured home <span><HiOutlineArrowNarrowRight /></span></h1>

            <div className="flex justify-between flex-wrap gap-y-4 pt-5">
                {rooms && rooms.slice(0, 4).map(room => (
                    <RoomCard room={room} key={room._id} />
                ))}
            </div>
        </div>
    )
}

export default Featured

import Link from 'next/link'

import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import RoomCard from '../layout/room-card';
import { useSelector } from 'react-redux';

const Featured = () => {
    const { rooms, error } = useSelector(state => state.allRooms)
    const { user } = useSelector(state => state.loadedUser)

    return (
        <div className="px-[3%] sm:px-32 bg-gray-200 py-8">

            {user && user?.role === 'owner' ? (
                <div className="p-2 rounded-md border-[0.5px] border-[gray] mb-7">
                    <p className="text-base">Want to list your rental? <Link href="/owner/room/create"><a className="text-[#7a0acf]">Create now</a></Link> </p>
                </div>
            ) : user?.role !== 'user' && (
                <div className="p-2 rounded-md border-[0.5px] border-[gray] mb-7">
                    <p className="text-base">Want to list your rental? <Link href="/register/owner"><a className="text-[#7a0acf]">Sign Up & continue</a></Link> </p>
                </div>
            )}

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



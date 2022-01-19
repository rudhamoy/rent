import Link from 'next/link'
import classes from './featured.module.css'
import searchclass from '../search/search.module.css'

import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import RoomCard from '../layout/room-card';
import { useSelector } from 'react-redux';

const Featured = ({ rooms }) => {
    // const { rooms, error } = useSelector(state => state.allRooms)
    const { user } = useSelector(state => state.loadedUser)
    // console.log(rooms)

    return (
        <div className=" sm:px-32 bg-gray-200 py-10">
            <div className="px-[3%]">
                {user && user?.role === 'owner' ? (
                    <div className="p-2 rounded-md border-[0.5px] border-[gray] mb-10">
                        <p className="text-base">Want to list your rental? <Link href="/owner/room/create"><a className="text-[#7a0acf]">Create now</a></Link> </p>
                    </div>
                ) : user?.role !== 'user' && (
                    <div className="p-2 rounded-md border-[0.5px] border-[gray] mb-10">
                        <p className="text-base">Want to list your rental? <Link href="/register/owner"><a className="text-[#7a0acf]">Sign Up & continue</a></Link> </p>
                    </div>
                )}
            </div>

            {/* new room */}
            <div>
                <div className="px-[3%]">
                    <h1 className="flex items-center gap-x-5 text-lg font-semibold ">New room <span><HiOutlineArrowNarrowRight /></span></h1>
                    <p className="text-[#7a0acf]">view all new listings</p>
                </div>
                <div className={`${searchclass.search__filter} flex  pt-5 mb-10 `}>
                    <div className={`${classes.container}  flex gap-x-1`}>

                        {rooms && rooms?.map(room => (
                            <div key={room._id} className={`${classes.child} px-[3%]`}>
                                <RoomCard room={room} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* featured room */}
            <div>
                <div className="px-[3%]">
                    <h1 className="flex items-center gap-x-5 text-lg font-semibold">Featured room <span><HiOutlineArrowNarrowRight /></span></h1>
                    <p className="text-[#7a0acf]">view all in featured list</p>
                </div>
                <div className={`flex  pt-5 mb-10 ${classes.featured__list}`}>
                    <div className={`${classes.container}  flex gap-x-1`}>

                        {rooms && rooms?.map(room => (
                            <div key={room._id} className={`${classes.child} px-[3%]`}>
                                <RoomCard room={room} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* attached room */}
            <div>
                <div className="px-[3%]">
                    <h1 className="flex items-center gap-x-5 text-lg font-semibold">Rentals with attached bathroom <span><HiOutlineArrowNarrowRight /></span></h1>
                    <p className="text-[#7a0acf]">view all list</p>
                </div>
                <div className={`flex  pt-5 mb-10 ${classes.featured__list}`}>
                    <div className={`${classes.container}  flex gap-x-1`}>

                        {rooms && rooms?.map(room => (
                            <div key={room._id} className={`${classes.child} px-[3%]`}>
                                <RoomCard room={room} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Featured



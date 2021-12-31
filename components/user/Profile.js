import { useSelector } from 'react-redux'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

const Profile = () => {
    const { user } = useSelector(state => state.loadedUser)

    return (
        <div className="py-6">
            <h1 className="font-semibold">My Profile</h1>
            <div className="flex justify-center">
                <div className="flex flex-col items-center w-full">
                    <img src={user?.avatar.url} alt={user?.name} className="h-[120px] w-[120px] rounded-full" />
                    <div>
                        <h1 className="text-3xl font-semibold text-center">{user?.name}</h1>
                        <div className="flex justify-between gap-x-10 py-10">
                            <div className="flex flex-col items-center text-xl font-semibold">
                                <div className="p-2 rounded-full text-gray-50 bg-[#512d6d]">
                                    <BsFillTelephoneFill />
                                </div>
                                <p className="text-lg py-2 text-gray-600">{user?.mobile}</p>
                            </div>
                            <div className="flex flex-col items-center text-xl font-semibold">
                                <div className="p-2 rounded-full text-gray-50 bg-[#512d6d]">
                                    <MdEmail />
                                </div>
                                <p className="text-lg py-2 text-gray-600">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

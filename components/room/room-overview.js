import React from 'react';
import { HiHome } from 'react-icons/hi'
import { GiElectric } from 'react-icons/gi'
import { FaShower, FaBuilding } from 'react-icons/fa'
import { BsPeopleFill } from 'react-icons/bs'

const FaciltyCard = ({ category, title, children }) => {
    return (
        <div className="flex gap-x-2 items-center my-2">
            <div className="p-2 text-2xl rounded-full bg-[lightgray] shadow-md">
                {children}
            </div>
            <p className=" text-gray-500 "> {category}: <span className="text-gray-800 font-semibold">{title}</span> </p>
        </div>
    )
}

const RoomOverview = ({ room }) => {
    return (
        <div className="">
            {/* status and post date */}
            <div className="text-gray-500">
                <p>Room Status : <span className="text-gray-700 font-semibold">Unoccupied</span> </p>
                <p>Room Available from : <span className="text-gray-700 font-semibold">03/01/2022</span> </p>
            </div>

            {/* small info */}
            <div className="mt-5">
                <FaciltyCard category="Room" title={room.roomCategory}>
                    <HiHome />
                </FaciltyCard>
                <FaciltyCard category="Washroom" title={room.bathroomType}>
                    <FaShower />
                </FaciltyCard>
                <FaciltyCard category="Preffered Tenants" title={room.tenants}>
                    <BsPeopleFill />
                </FaciltyCard>
                <FaciltyCard category="Floor" title={room.floor}>
                    <FaBuilding />
                </FaciltyCard>
                <FaciltyCard category="Electric Bill" title={room.electricBill === true ? "Included" : 'Not included'}>
                    <GiElectric />
                </FaciltyCard>
            </div>
        </div>
    )
}

export default RoomOverview

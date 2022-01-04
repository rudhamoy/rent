import React from 'react'

const FullDetails = ({ room }) => {
    return (
        <div>
            <h1 className="font-semibold text-xl">House Description</h1>
            <p>{room.description}</p>

            <div className="my-3">
                <h1 className="font-semibold text-xl">Facilities & features</h1>
                <div>
                    <p className='font-semibold text-gray-500'>Tenants Type: <span className="text-gray-700">{room.tenants}</span></p>
                </div>
                <div>
                    <p className='font-semibold text-gray-500'>Furnish: <span className="text-gray-700">{room.furnish}</span></p>
                </div>
                <div>
                    <p className='font-semibold text-gray-500'>Room Type: <span className="text-gray-700">{room.roomCategory}</span></p>
                </div>
                <div>
                    <p className='font-semibold text-gray-500'>Floor: <span className="text-gray-700">{room.floor}</span></p>
                </div>
                <div>
                    <p className='font-semibold text-gray-500'>Electric Bill: <span className="text-gray-700">{room.electricBill === true ? 'Inclcuded' : 'Not included'}</span></p>
                </div>
                <div>
                    <p className='font-semibold text-gray-500'>balcony: <span className="text-gray-700">{room.electricBill === true ? 'Yes' : 'No'}</span></p>
                </div>
                <div>
                    <p className='font-semibold text-gray-500'>Pets Friendly: <span className="text-gray-700">{room.electricBill === true ? 'Yes' : 'No'}</span></p>
                </div>
                <div>
                    <p className='font-semibold text-gray-500'>Parking Available: <span className="text-gray-700">{room.electricBill === true ? 'Yes' : 'No'}</span></p>
                </div>
                <div>
                    <p className='font-semibold text-gray-500'>Water Supply: <span className="text-gray-700">{room.electricBill === true ? 'Yes' : 'No'}</span></p>
                </div>
            </div>
        </div>
    )
}

export default FullDetails

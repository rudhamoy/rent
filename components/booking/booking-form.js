import React from 'react'

const BookingForm = ({ booking, room }) => {
    return (
        <div>
            <div>
                <p>Title: {room.name}</p>
                <p>Address: {room.address}</p>
                <p>Price: {room.price} / Month</p>
            </div>
            <button className="p-1 px-3 text-[#eee] bg-[#512d6d] rounded-md" onClick={booking}> Confirm</button>
        </div>
    )
}

export default BookingForm

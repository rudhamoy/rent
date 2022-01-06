import Booking from '../models/booking';

import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'


// Create new Booking   =>   /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {

    const {
        room,
        numTenants
    } = req.body

    const booking = await Booking.create({
        room,
        numTenants,
        user: req.user._id,
    })

    res.status(200).json({
        success: true,
        booking
    })

})

//Get all the bookings of the current user => /api/bookings/me
const myBookings = catchAsyncErrors(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate({
        path: "room",
        select: "name pricePerMonth images"
    }).populate({
        path: "user",
        select: "name email avatar"
    })

    res.status(200).json({
        success: true,
        bookings
    })
})

export {
    newBooking,
    myBookings
}
import Room from '../models/room'
import Booking from '../models/booking'
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from '../utils/errorHandler'
import APIFeatures from '../utils/apiFeatures'

import cloudinary from 'cloudinary';



//Get all rooms
const allRooms = catchAsyncErrors(async (req, res) => {

    const apiFeatures = new APIFeatures(Room.find(), req.query).search()

    let rooms = await apiFeatures.query

    const roomCount = rooms.length


    res.status(200).json({
        success: true,
        roomCount,
        rooms
    })
})

//create a new room ==> /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {

    const images = req.body.images;

    let imageLinks = [];

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "rentaloo/rooms"
        });

        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imageLinks;
    req.body.user = req.user._id

    const room = await Room.create(req.body);


    res.status(200).json({
        success: true,
        room
    })
});

//get room details => /api/room/:id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
    const room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler("Room not found with this ID"))
    }

    res.status(200).json({
        success: true,
        room
    })

})


// Get all rooms of current owner   =>   /api/owner/rooms
const myRooms = catchAsyncErrors(async (req, res) => {

    const rooms = await Room.find({ user: req.user._id })

    const roomCount = rooms.length

    res.status(200).json({
        success: true,
        roomCount,
        rooms
    })
})

export { allRooms, newRoom, getSingleRoom, myRooms }
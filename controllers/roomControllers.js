import Room from '../models/room'
import Booking from '../models/booking'
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from '../utils/errorHandler'
import APIFeatures from '../utils/apiFeatures'

import cloudinary from 'cloudinary';



//Get all rooms
const allRooms = catchAsyncErrors(async (req, res) => {

    const resPerPage = 4;
    const roomsCount = await Room.countDocuments();
    const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter().priceRange([req.query.min, req.query.max])

    // let rooms = await apiFeatures.query

    // let filteredRoomsCount = rooms.length;

    // apiFeatures.pagination(resPerPage)
    // rooms = await apiFeatures.query;

    apiFeatures.pagination(resPerPage);
    let rooms = await apiFeatures.query;
    let filteredRoomsCount = rooms.length;

    res.status(200).json({
        success: true,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
    })
})

//Search /filter
// const handleQuery = async (req, res, query) => {
//     const rooms = await Room.find()
// }

// const searchFilter = catchAsyncErrors(async (req, res) => {
//     const { query } = req.body

//     if(query) {
//         console.log('query', query)
//         await handleQuery(req, res, query)
//     }
// })

//create a new room ==> /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {

    // const images = req.body.images;
    // let imageLinks = [];

    // for (let i = 0; i < images.length; i++) {

    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: "rentaloo/rooms"
    //     });

    //     imageLinks.push({
    //         public_id: result.public_id,
    //         url: result.secure_url
    //     })
    // }

    // req.body.images = imageLinks;
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

//Update room details 
const updateRoom = catchAsyncErrors(async (req, res) => {
    let room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        room
    })
})

//Delete room 
const deleteRoom = catchAsyncErrors(async (req, res) => {
    const room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    await room.remove();

    res.status(200).json({
        success: true,
        message: 'Room is deleted'
    })
})

export { allRooms, newRoom, getSingleRoom, myRooms, updateRoom, deleteRoom }
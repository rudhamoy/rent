import User from '../models/user'
import cloudinary from 'cloudinary';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';


// Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Register user => /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {

    //image upload to cloudianry and get the url
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "rentaloo/avatars",
        width: "150",
        scale: "scale"
    });

    const { name, email, mobile, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        mobile,
        password,
        role,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    });

    res.status(200).json({
        success: true,
        message: "Account Registered Successfully"
    })
});

//get current user => /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {
    const user = await User.findById(req.user._id)

    res.status(200).json({
        success: true,
        user
    })
})


export { registerUser, currentUserProfile }
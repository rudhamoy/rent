import User from '../models/user'
import cloudinary from 'cloudinary';
import absoluteUrl from 'next-absolute-url'
import crypto from 'crypto'

import ErrorHandler from '../utils/errorHandler';
import sendEmail from '../utils/sendEmail';
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
    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "rentaloo/avatars",
    //     width: "150",
    //     scale: "scale"
    // });

    const { name, email, mobile, password, role, avatar, broker } = req.body;

    const user = await User.create({
        broker,
        name,
        email,
        mobile,
        password,
        role,
        avatar,
        // avatar: {
        //     public_id: result.public_id,
        //     url: result.secure_url
        // }
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

//update current user => /api/me/update
const updateProfile = catchAsyncErrors(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.mobile = req.body.mobile;

        if (req.body.password) user.password = req.body.password
    }

    await user.save()

    res.status(200).json({
        success: true,
    })
})

// Forgot password   =>   /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    // Get origin
    const { origin } = absoluteUrl(req)

    // Create reset password url
    const resetUrl = `${origin}/password/reset/${resetToken}`

    const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, please ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'RentmeRoom Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })


    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }

})

// Reset password   =>   /api/password/reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup the new password
    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    })

})



export { registerUser, currentUserProfile, updateProfile, forgotPassword, resetPassword }
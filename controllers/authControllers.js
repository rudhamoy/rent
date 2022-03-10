import User from '../models/user'
import cloudinary from 'cloudinary';
import absoluteUrl from 'next-absolute-url'
import crypto from 'crypto'

import ErrorHandler from '../utils/errorHandler';
import sendEmail from '../utils/sendEmail';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import { generateOTP, fastTwosms } from '../utils/otp'

// Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Register user => /api/auth/register
const registerUser = async (req, res, next) => {

    try {
        const { name, email, mobile, password, role, avatar, broker } = req.body;

        //check if mobile already exist
        const mobileExist = await User.findOne({ mobile })

        if (mobileExist) {
            next({ status: 400, message: "Phone number already exist" })
            return
        }

        const createUser = new User({
            broker,
            name,
            email,
            mobile,
            password,
            role,
            avatar,
        });

        //save user
        const user = await createUser.save()

        res.status(200).json({
            success: true,
            message: "OTP has sent to your mobile number",
            data: {
                userId: user._id
            }
        })

        //gemnerate otp
        const otp = generateOTP(6)

        //save otp to user collection
        user.mobileOtp = otp
        await user.save()

        //send otp to mobile number
        await fastTwosms(
            {
                message: `Your OTP is ${otp}`,
                contactNumber: user.mobile
            },
            next
        )
    } catch (error) {
        next(error);
        console.log(error);
    }
};

const verifyOtp = async (req, res, next) => {
    try {
        const { otp, userId } = req.body
        const user = await User.findById(userId);

        if (!user) {
            next({ status: 400, message: USER_NOT_FOUND_ERR });
            return
        }

        if (user.mobileOtp !== otp) {
            next({ status: 400, message: 'Incorrect OTP' })
            return
        }

        user.mobileOtp = ''
        await user.save()

        res.status(201).json({
            type: 'success',
            message: 'OTP verified successfully',
            data: {
                userId: user._id
            }
        })

    } catch (error) {
        next(error)
    }
}

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



export { registerUser, verifyOtp, currentUserProfile, updateProfile, forgotPassword, resetPassword }
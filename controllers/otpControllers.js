import OtpUser from '../models/otpuser'
import absoluteUrl from 'next-absolute-url'
import crypto from 'crypto'

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import { generateOTP, fastTwosms } from '../utils/otp'

const createOtpUser = async (req, res, next) => {
    try {
        const { name, mobile, password } = req.body;

        //check if mobile already exist
        const mobileExist = await OtpUser.findOne({ mobile })

        if (mobileExist) {
            next({ status: 400, message: "Phone number already exist" })
            return
        }

        //create user
        // const createUser = new OtpUser({
        //     name, mobile, password
        // })

        const user = await OtpUser.create({
            name,
            mobile,
            password,

        });

        //save user
        // const user = await createUser.save()

        res.status(200).json({
            success: true,
            message: "OTP has sent to your mobile number",
            data: {
                userId: user._id
            }
        })

        // //gemnerate otp
        // const otp = generateOTP(6)

        // //save otp to user collection
        // user.mobileOtp = otp
        // await user.save()

        // //send otp to mobile number
        // await fastTwosms(
        //     {
        //         message: `Your OTP is ${otp}`,
        //         contactNumber: user.mobile
        //     },
        //     next
        // )
    } catch (error) {
        next(error);
    }
}

const verifyOtp = catchAsyncErrors(async (req, res, next) => {
    try {
        const { otp, userId } = req.body
        const user = await OtpUser.findById(userId);

        if (!user) {
            next({ status: 400, message: 'User not found' });
            return
        }

        if (user.mobileOtp !== otp) {
            next({ status: 400, message: 'Incorrect OTP' })
            return
        }

        user.mobileOtp = ""
        await user.save()

        res.status(201).json({
            type: 'success',
            message: 'OTP verified successfully',
            data: {
                userId: user._id
            }
        })

    } catch (error) {
        // next(error)
        console.log(error)
    }
})

export { createOtpUser, verifyOtp }
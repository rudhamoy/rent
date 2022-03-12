import TrialUser from '../models/trialuser'
import crypto from 'crypto'

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import { fastTwosms, generateOTP } from '../utils/otp';

const registerTrialUser = catchAsyncErrors(async (req, res, next) => {

    const { name, mobile, password } = req.body;

    const mobileExist = await TrialUser.findOne({ mobile })
    if (mobileExist) {
        return next(new ErrorHandler('Phone number already exist', 404))
    }

    const user = await TrialUser.create({
        name,
        mobile,
        password,
    });

    res.status(200).json({
        success: true,
        message: "OTP has sent to your mobile number"
    })

    const otp = generateOTP(6)

    user.phoneOtp = otp
    await user.save()

    await fastTwosms(
        {
            message: `Your OTP is ${otp}`,
            contactNumber: user.mobile
        },
        next
    )

});

export { registerTrialUser }
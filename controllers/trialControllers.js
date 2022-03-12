import TrialUser from '../models/trialuser'
import crypto from 'crypto'

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';

const registerTrialUser = catchAsyncErrors(async (req, res) => {

    const { name, mobile, password } = req.body;

    const user = await TrialUser.create({
        name,
        mobile,
        password,
    });

    res.status(200).json({
        success: true,
        message: "Account Registered Successfully"
    })
});

export { registerTrialUser }
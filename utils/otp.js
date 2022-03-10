import fast2sms from 'fast-two-sms';

const generateOTP = (otp_length) => {
    let digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < otp_length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)]
    }

    return OTP
}

const fastTwosms = async ({ message, contactNumber }, next) => {
    try {
        const res = await fast2sms.sendMessage({
            authorization: process.env.FAST_TWO_SMS,
            message,
            numbers: [contactNumber]
        })
    } catch (error) {
        next(error)
    }
}

export { generateOTP, fastTwosms }
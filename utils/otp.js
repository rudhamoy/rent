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
            authorization: 'Hdftba3mcBnjePECyg67pRMsrzY0qoGWDJuKhViFXLw2TI51SvTFXa2H3IphKLD6zRjlSe4sMnQACo1q',
            message,
            numbers: [contactNumber]
        })
    } catch (error) {
        next(error)
    }
}

export { generateOTP, fastTwosms }
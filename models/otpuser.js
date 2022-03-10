import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const otpUserSchema = new mongoose.Schema({
    broker: {
        type: String,
        default: "admin"
    },
    name: {
        type: String,
        requires: [true, "Please Enter your email"],
        maxlength: [30, "Your name cannot exceed 30 characters"]
    },

    mobile: {
        type: Number,
        required: [true, "Please enter your mobile Number"],
        unique: true
    },
    mobileOtp: String,
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password must be longer than 6 characters"],
        select: false
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: "owner"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// encrytping password before saving user
otpUserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// compare user password
otpUserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Generate password reset tokem
userSchema.methods.getResetPasswordToken = function () {

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hash and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken;
}

export default mongoose.models.OtpUser || mongoose.model("OtpUser", otpUserSchema)
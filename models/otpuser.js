import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const otpUserSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: [true, "Please Enter your email"],
        maxlength: [30, "Your name cannot exceed 30 characters"]
    },

    mobile: {
        type: Number,
        required: [true, "Please enter your mobile Number"],
        unique: true,
        trim: true
    },
    mobileOtp: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password must be longer than 6 characters"],
        select: false
    },
    role: {
        type: String,
        default: "owner"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
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

export default mongoose.models.OtpUser || mongoose.model("OtpUser", otpUserSchema)
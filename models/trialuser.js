import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const trialUserSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password must be longer than 6 characters"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

//encrytping password before saving user
trialUserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//compare user password
trialUserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.models.TrialUser || mongoose.model("TrialUser", trialUserSchema)
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: String,
    otp: Number,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600
    },
})

const Otp = mongoose.model('otpDB', otpSchema)
export default Otp
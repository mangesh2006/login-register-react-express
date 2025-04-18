import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcrypt'
import User from './Models/model.js'
import Otp from './Models/otp.js'
import { sendOtp } from './utils/sendOtp.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const conn = mongoose.connect(process.env.MONGO_URI)
const generateOtp = () => Math.floor(100000 + Math.random() * 900000)

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            if (!existingUser.isVerified) {
                await User.findOneAndDelete({ email: existingUser.email }, {})
                return res.status(400).json({ message: 'not verified' })
            }
            return res.status(400).json({ message: 'exist' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        const otp = generateOtp()
        await Otp.create({ email, otp })

        await sendOtp(email, otp)

        res.status(200).json({ message: 'Otp sent' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'signup failed' })
    }
})

app.post("/verify", async (req, res) => {
    const { otp, email } = req.body
    try {
        const validOtp = await Otp.findOne({ email, otp })
        if (!validOtp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' })
        }
        await User.findOneAndUpdate({ email }, { isVerified: true })
        await Otp.deleteOne({ _id: validOtp._id })
        res.status(200).json({ message: 'Email verified successfully' })
    } catch (error) {
        res.status(500).json({ message: 'OTP verification failed' })
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: "not exist" })
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: "not verified" })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

app.listen(port, (req, res) => {
    console.log(`App is running on ${port}`)
})

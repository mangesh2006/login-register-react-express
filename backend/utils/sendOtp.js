import { Resend } from 'resend'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
dotenv.config()

const resend = new Resend(process.env.API_KEY)

export const sendOtp = async (email, otp) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const htmlpath = path.join(__dirname,'../emails/email.html')
    let htmlcontent = fs.readFileSync(htmlpath, 'utf8')
    htmlcontent = htmlcontent.replace('{{code}}', otp)
    try {
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: 'Verify your e-mail',
            html: htmlcontent
        })
    } catch (error) {
        console.error('Failed to send OTP email:', error)
    }
}   
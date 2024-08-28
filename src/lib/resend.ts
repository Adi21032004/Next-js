import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config({
    path: 'src/.env'
})

console.log(process.env.RESEND_API_KEY)
export const resend = new Resend(process.env.RESEND_API_KEY);
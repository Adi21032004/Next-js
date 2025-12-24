import nodemailer from "nodemailer";

const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS
console.log('user is ',user)
console.log('app password ',pass)
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
"use server";

// import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { transporter } from "@/lib/node_mailer";
import {render} from "@react-email/render"

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
       const html = await render(
        VerificationEmail({ username, otp: verifyCode })
        );
        console.log(process.env.EMAIL_USER)
       const error = await transporter.sendMail({
        from: `"Feedback App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Feedback | Verification Code",
        html
        });
        // if(error){
        //     console.log("this is the error",error)
        //     return { success: false, message: error.message };
        // }
        return {success: true,message: 'Verification email sent successfully'}
    } catch (error) {
        console.error("Error sending verification email",error)
        return {success: false,message: 'Failed to send verification email'}
    }
}
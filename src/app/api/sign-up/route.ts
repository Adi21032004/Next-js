import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from 'bcrypt'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()

    try {
        const {username,email,password} = await request.json()
        //if username exist
        const existingUserbyUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        
        if(existingUserbyUsername){
            return Response.json({
                success: false,
                message: "Username is already present"
            })
        }
        //if email exist
        const existingUserbyEmail = await UserModel.findOne({
            email,
        })

        const verifyCode = Math.floor(100000 + Math.random()*90000).toString()

        if(existingUserbyEmail){
            if(existingUserbyEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                },{status: 400})
            }else{
                //user exist but not verified so we need to update it
                const hashedPassword = await bcrypt.hash(password,10)
                existingUserbyEmail.password = hashedPassword
                existingUserbyEmail.verifyCode = verifyCode

                const expiryDate = new Date()//due to new keyword the const is an object so it can be modified even if its const
                expiryDate.setHours(expiryDate.getHours()+1)
                existingUserbyEmail.verifyCodeExpiry = expiryDate

                await existingUserbyEmail.save()
            }
        }else{
            //user is new
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date()//due to new keyword the const is an object so it can be modified even if its const
            expiryDate.setHours(expiryDate.getHours()+1)

            const newUser = new UserModel({
                username,
                email,
                password:hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                message: []
            })

            await newUser.save()
        }

        //send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            },{status: 500})
        }

        return Response.json({
            success: true,
            message: "User registered successfully"
        },{status: 200})

    } catch (error) {
        console.error('Error registering user',error)
        return Response.json(
            {
                success: false,
                message: "Error registering the user"
            },
            {
                status: 500
            }
        )
    }
}
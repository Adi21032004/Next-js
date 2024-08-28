import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request:Request) {
    await dbConnect();

    const session = await getServerSession(authOptions)
    // console.log(session?.user)

    const user = session?.user as User//assertion is done but why??
    // console.log(user)
    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "User not authenticated"
            },
            {status: 401}
        )
    }

    const userId = new mongoose.Types.ObjectId(user._id)//userid is in string format,
    // console.log(userId)
    //if we user string in aggregatiion pipeline,it might cause an issue
    try {
        const user = await UserModel.aggregate([
            {$match: {_id: userId._id}},
            //now write aggregation to unwind array
            {$unwind: {path:'$message',preserveNullAndEmptyArrays: true}},//message or messages?
            {$sort: {'message.createdAt': -1}},
            {$group: {_id: '$_id',message: {$push: '$message'}}}
        ])
        // console.log(user)
        if(!user || user.length == 0){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {status: 401}
            )
        }

        return Response.json(
            {
                success: true,
                messages: user[0].message
            },
            {status: 200}
        )
    } catch (error) {
        console.error("Unexpected error",error)
        return Response.json(
            {
                success: false,
                message: "Unexpected error"
            },
            {status: 401}
        )
    }
}
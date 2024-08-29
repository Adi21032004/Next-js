import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { z } from "zod";
import { usernameValidate } from "@/schemas/signUpSchema";

// Indicate that this route should run in a dynamic Node.js environment
export const runtime = 'nodejs';

//query schema
const UsernameQuerySchema = z.object({
    username: usernameValidate
})
// user should be able to see if the username exist or not in runtime

export async function GET(request: Request) {
    await dbConnect();

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        //validate the username with zod
        const queryResult = UsernameQuerySchema.safeParse(queryParam)
        //console.log(queryResult)

        if(!queryResult.success){
            const usernameErrors = queryResult.error.format()
            .username?._errors || []

            return Response.json(
                {
                    success: false,
                    message: "Invalid query parameter"
                },
                {status: 500}
            )
        }

        const {username} = queryResult.data

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true
        })

        if(existingVerifiedUser){
            return Response.json(
                {
                    success: false,
                    message: "Username already exist"
                },
                {status: 400}
            )
        }

        return Response.json(
            {
                success: true,
                message: "Username is unique"
            },
            {status: 200}
        )
    } catch (error) {
        console.error("Error in checking username",error)

        return Response.json(
            {
                success: false,
                message: "Error in checking username"
            },
            {status: 500}
        )
    }
}
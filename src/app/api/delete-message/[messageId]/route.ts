import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(request:Request,
    { params }: { params: { messageId: string } }
) {
    const messageId = params.messageId;
    // console.log(messageId)
    await dbConnect();

    const session = await getServerSession(authOptions)

    const user:User = session?.user as User//assertion is done but why??

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "User not authenticated"
            },
            {status: 401}
        )
    }

    try {
        const updateResult = await UserModel.updateOne(
            {_id: user._id},
            {$pull: {message: {_id: messageId}}}
        )

        if(updateResult.modifiedCount == 0) {
            return Response.json(
                {
                    success: false,
                    message: "Message not found"
                },
                {status: 404}
            )
        }

        return Response.json(
            {
                success: true,
                message: "Message deleted successfully"
            },
            {status: 200}
        )
    } catch (error) {
        console.log("Error in deleting message",error)
        return Response.json(
            {
                success: false,
                message: "Error deleting message"
            },
            {status: 500}
        )
    }

}

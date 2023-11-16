import MessageModel from "@/models/MessageModel";
import ResponseType from "@/types/ResponseType";
import { NextRequest } from "next/server";
import MessageType from "@/types/server/MessageType";
import clientPromise from "@/config/mongodb";
import validateMessage from "@/schemas/messageSchema";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    const data = await request.json();

    data.groupId = new ObjectId(data.groupId);
    data.userId = new ObjectId(data.userId);
    data.createdAt = new Date(data.createdAt);

    const validResult = await validateMessage(data);

    if (!validResult.success) {
        const error: ResponseType = {
            code: 400,
            message: `[${validResult.error.issues[0].path[0]}] ` + validResult.error.issues[0].message 
        }
        
        return Response.json(error);
    }

    try {
        const client = await clientPromise;
        const messagesCollection = client.db('chatty').collection<MessageType>('messages');

        await client.connect();

        const result = await MessageModel.create(messagesCollection, data);

        if (result.acknowledged) {
            const error: ResponseType = { code: 201, message: 'Message created successfully' };
            return Response.json(error);
        } else {
            const error: ResponseType = { code: 500, message: 'Error creating the message' };
            return Response.json(error);
        }
    } catch (error) {
        const catchError: ResponseType = { code: 500, message: error as string };
        return Response.json(catchError);
    }
}

export async function GET(request: NextRequest) {
    const groupId = request.nextUrl.searchParams.get('groupid');
    const fromDate = request.nextUrl.searchParams.get('fromdate');

    if (!groupId) {
        const error: ResponseType = { code: 400, message: 'Messages can only be retrieved with groupId' };
        return Response.json(error);
    }

    if (!ObjectId.isValid(groupId)) {
        const error: ResponseType = { code: 400, message: 'Wrong id format' };
        return Response.json(error);
    }

    if (fromDate) {
        if (!/^(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/.test(fromDate)) {
            const error: ResponseType = { code: 400, message: 'Wrong date format. It must have the following format: YYYY-MM-DDTHH:mm:ss.SSSZ' };
            return Response.json(error);
        }
    }

    try {
        const client = await clientPromise;
        const messagesCollection = client.db('chatty').collection<MessageType>('messages');
        const result = await MessageModel.getByGroup(messagesCollection, groupId, fromDate);
        return Response.json(result);
    } catch (error) {
        const catchError: ResponseType = { code: 500, message: error as string };
        return Response.json(catchError);
    }
}
import MessageModel from "@/models/MessageModel";
import ResponseType from "@/types/ResponseType";
import { NextRequest } from "next/server";
import validateMessage from "@/schemas/messageSchema";
import MessageType from "@/types/MessageType";

export async function POST(request: Request) {
    const data = await request.json();

    data.createdAt = new Date(data.createdAt);

    const validResult = await validateMessage(data);

    if (!validResult.success) {
        const error: ResponseType = {
            status: 400,
            message: `[${validResult.error.issues[0].path[0]}] ${validResult.error.issues[0].message}`
        }
        
        return Response.json(error);
    }

    try {
        const messageId = await MessageModel.create(data);

        if (!messageId) {
            const error: ResponseType = { status: 500, message: 'Error creating the message' };
            return Response.json(error);
        }

        const response: ResponseType = { status: 201, message: 'Message created successfully' };
        return Response.json(response);
    } catch (error: any) {
        const catchError: ResponseType = { status: 500, message: error.message };
        return Response.json(catchError);
    }
}

export async function GET(request: NextRequest) {
    const groupId = request.nextUrl.searchParams.get('groupid');

    if (!groupId) {
        const error: ResponseType = { status: 400, message: 'Messages can only be retrieved with groupId' };
        return Response.json(error);
    }

    try {
        const result = await MessageModel.getByGroup(groupId);
        const response: ResponseType = { status: 200, message: 'Messages retrieved successfully', data: result };
        return Response.json(response);
    } catch (error: any) {
        const catchError: ResponseType = { status: 500, message: error.message };
        return Response.json(catchError);
    }
}
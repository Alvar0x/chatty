import clientPromise from "@/config/mongodb";
import MessageModel from "@/models/MessageModel";
import validateMessage from "@/schemas/messageSchema";
import MessageType from "@/types/server/MessageType";
import ResponseType from "@/types/ResponseType";
import { ObjectId } from "mongodb";

type Params = {
    params: {
        id: string
    }
}

export async function PUT(request: Request, { params }: Params) {
    const { id } = params;
    const data = await request.json();

    if (!ObjectId.isValid(id)) {
        return Response.json({ code: 400, message: 'Wrong id format' });
    }

    // const validResult = await validateMessage(data);
    // if (!validResult.success) {
    //     const error: ResponseType = {
    //         code: 400,
    //         message: `[${validResult.error.issues[0].path[0]}] ` + validResult.error.issues[0].message 
    //     };
    //     return Response.json(error);
    // }

    try {
        const client = await clientPromise;
        const messagesCollection = client.db('chatty').collection<MessageType>('messages');
        const result = await MessageModel.update(messagesCollection, id, data.name);

        if (!result.matchedCount) {
            const error: ResponseType = { code: 404, message: 'Message not found' };
            return Response.json(error);
        }

        if (!result.modifiedCount) {
            const response: ResponseType = { code: 304, message: 'Message updated but nothing changed' };
            return Response.json(response);
        }

        const response: ResponseType = { code: 204, message: 'Message updated successfully' };
        return Response.json(response);
    } catch (error) {
        const catchError: ResponseType = { code: 500, message: error as string };
        return Response.json(catchError);
    }
}

export async function DELETE(request: Request, { params }: Params) {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
        const error: ResponseType = { code: 400, message: 'Wrong id format' };
        return Response.json(error);
    }

    try {
        const client = await clientPromise;
        const messagesCollection = client.db('chatty').collection<MessageType>('messages');
        const result = await MessageModel.delete(messagesCollection, id);

        if (!result.deletedCount) {
            const error: ResponseType = { code: 404, message: 'Message not found' };
            return Response.json(error);
        }

        const response: ResponseType = { code: 204, message: 'Message deleted successfully' };
        return Response.json(response);
    } catch (error) {
        const catchError: ResponseType = { code: 500, message: error as string };
        return Response.json(catchError);
    }
}
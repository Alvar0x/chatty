import MessageModel from "@/models/MessageModel";
import validateMessage from "@/schemas/messageSchema";
import ResponseType from "@/types/ResponseType";

type Params = {
    params: {
        id: string
    }
}

export async function PUT(request: Request, { params }: Params) {
    const { id } = params;
    const data = await request.json();

    const validResult = await validateMessage(data);
    if (!validResult.success) {
        const error: ResponseType = {
            status: 400,
            message: `[${validResult.error.issues[0].path[0]}] ` + validResult.error.issues[0].message 
        };
        return Response.json(error);
    }

    try {
        const result = await MessageModel.update(id, data.content);

        const response: ResponseType = { status: 203, message: 'Message updated successfully', data: result };
        return Response.json(response);
    } catch (error: any) {
        const catchError: ResponseType = { status: 500, message: error.message };
        return Response.json(catchError);
    }
}

export async function DELETE(request: Request, { params }: Params) {
    const { id } = params;

    try {
        const { deleted } = await MessageModel.delete(id);

        const response: ResponseType = { status: 204, message: 'Message deleted successfully' };
        return Response.json(response);
    } catch (error: any) {
        const catchError: ResponseType = { status: 500, message: error.message };
        return Response.json(catchError);
    }
}
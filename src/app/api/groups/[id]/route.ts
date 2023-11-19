import GroupModel from "@/models/GroupModel";
import validateGroup from "@/schemas/groupSchema";
import GroupType from "@/types/GroupType";
import ResponseType from "@/types/ResponseType";
import { NextRequest } from 'next/server';

type Params = {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, { params }: Params) {
    const { id } = params;

    try {
        const result = await GroupModel.getById(id);

        if (!result) {
            const error: ResponseType = { status: 404, message: 'Group not found' };
            return Response.json(error);
        }

        const response: ResponseType = { status: 200, message: 'Group retrieved successfully', data: result };
        return Response.json(response);
    } catch (error: any) {
        const catchError: ResponseType = { status: 500, message: error.message };
        return Response.json(catchError);
    }
}

export async function PUT(request: Request, { params }: Params) {
    const { id } = params;
    const data = await request.json();

    const validResult = await validateGroup(data);
    if (!validResult.success) {
        const error: ResponseType = {
            status: 400,
            message: `[${validResult.error.issues[0].path[0]}] ${validResult.error.issues[0].message}`
        };
        return Response.json(error);
    }

    try {
        const result = await GroupModel.update(id, data.name);

        if (!result) {
            const error: ResponseType = { status: 400, message: 'Could\'t update the group' };
            return Response.json(error);
        }

        const response: ResponseType = { status: 204, message: 'Group updated successfully' };
        return Response.json(response);
    } catch (error: any) {
        const catchError: ResponseType = { status: 500, message: error.message };
        return Response.json(catchError);
    }
}

export async function DELETE(request: Request, { params }: Params) {
    const { id } = params;

    try {
        const { deleted } = await GroupModel.delete(id);

        if (!deleted) {
            const response: ResponseType = { status: 400, message: 'Couldn\'t delete the group' };
            return Response.json(response);
        }

        const response: ResponseType = { status: 204, message: 'Group deleted successfully' };
        return Response.json(response);
    } catch (error: any) {
        const catchError: ResponseType = { status: 500, message: error.message };
        return Response.json(catchError);
    }
}
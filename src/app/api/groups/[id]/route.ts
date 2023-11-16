import authOptions from "@/config/authOptions";
import clientPromise from "@/config/mongodb";
import GroupModel from "@/models/GroupModel";
import validateGroup from "@/schemas/groupSchema";
import GroupType from "@/types/server/GroupType";
import ResponseType from "@/types/ResponseType";
import { ObjectId } from "mongodb";
import { NextRequest } from 'next/server';

type Params = {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, { params }: Params) {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
        const error: ResponseType = { code: 400, message: 'Wrong id format' };
        return Response.json(error);
    }

    try {
        const client = await clientPromise;
        const groupsCollection = client.db('chatty').collection<GroupType>('groups');
        const result = await GroupModel.getById(groupsCollection, id);

        if (!result) {
            const error: ResponseType = { code: 404, message: 'Group not found' };
            return Response.json(error);
        }

        return Response.json(result);
    } catch (error) {
        const catchError: ResponseType = { code: 500, message: error as string };
        return Response.json(catchError);
    }
}

export async function PUT(request: Request, { params }: Params) {
    const { id } = params;
    const data = await request.json();

    if (!ObjectId.isValid(id)) {
        const error: ResponseType = { code: 400, message: 'Wrong id format' };
        return Response.json(error);
    }

    const validResult = await validateGroup(data);
    if (!validResult.success) {
        const error: ResponseType = {
            code: 400,
            message: `[${validResult.error.issues[0].path[0]}] ` + validResult.error.issues[0].message 
        };
        return Response.json(error);
    }

    try {
        const client = await clientPromise;
        const groupsCollection = client.db('chatty').collection<GroupType>('groups');
        const result = await GroupModel.update(groupsCollection, id, data.name);

        if (!result.matchedCount) {
            const error: ResponseType = { code: 404, message: 'Group not found' };
            return Response.json(error);
        }

        if (!result.modifiedCount) {
            const error: ResponseType = { code: 304, message: 'Group updated but nothing changed' };
            return Response.json(error);
        }

        const response: ResponseType = { code: 204, message: 'Group updated successfully' };
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
        const groupsCollection = client.db('chatty').collection<GroupType>('groups');
        const result = await GroupModel.delete(groupsCollection, id);

        if (!result.deletedCount) {
            const error: ResponseType = { code: 404, message: 'Group not found' };
            return Response.json(error);
        }

        const response: ResponseType = { code: 204, message: 'Group deleted successfully' };
        return Response.json(response);
    } catch (error) {
        const catchError: ResponseType = { code: 500, message: error as string };
        return Response.json(catchError);
    }
}
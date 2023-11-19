import GroupModel from "@/models/GroupModel";
import validateGroup from "@/schemas/groupSchema";
import ResponseType from "@/types/ResponseType";
import { NextRequest } from "next/server";
import { getServerSession } from 'next-auth';
import authOptions from "@/config/authOptions";

export async function POST(request: Request) {
    const data = await request.json();
    data.createdAt = new Date(data.createdAt);

    const validResult = await validateGroup(data);

    if (!validResult.success) {
        const error: ResponseType = {
            status: 400,
            message: `[${validResult.error.issues[0].path[0]}] ` + validResult.error.issues[0].message 
        }
        return Response.json(error);
    }

    const session = await getServerSession(authOptions);

    try {
        if (session && session.user) {
            const groupId = await GroupModel.create(data.name);

            if (!groupId) {
                const error: ResponseType = { status: 500, message: 'Couldn\'t create the group' };
                return Response.json(error);
            }

            const { userId, groupId: gId } = await GroupModel.addUserToGroup(session.user.id, groupId, 'admin');

            if (!(userId && gId)) {
                const { deleted } = await GroupModel.delete(groupId);

                if (!deleted) {
                    const error: ResponseType = { status: 500, message: 'Couldn\'t delete the group' };
                    return Response.json(error);
                }

                const error: ResponseType = { status: 500, message: 'Couldn\'t create the group' };
                return Response.json(error);
            }

            const response: ResponseType = { status: 201, message: 'Group created successfully', data: groupId };
            return Response.json(response);
        } else {
            const error: ResponseType = { status: 400, message: 'No session found' };
            return Response.json(error);
        }
    } catch (error: any) {
        const catchError: ResponseType = { status: 201, message: error.message };
        return Response.json(catchError);
    }
}

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userid');

    try {
        if (userId) {
            const result = await GroupModel.getByUser(userId);
            const response: ResponseType = { status: 200, message: 'Groups retrieved successfully', data: result };
            return Response.json(response);
        } else {
            const error: ResponseType = { status: 400, message: 'No user id provided' };
            return Response.json(error);
        }
    } catch (error: any) {
        const catchError: ResponseType = { status: 500, message: error.message };
        return Response.json(catchError);
    }
}
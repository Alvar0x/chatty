import GroupModel from "@/models/GroupModel";
import validateGroup from "@/schemas/groupSchema";
import ResponseType from "@/types/ResponseType";
import { NextRequest } from "next/server";
import { getServerSession } from 'next-auth';
import authOptions from "@/config/authOptions";
import GroupType from "@/types/server/GroupType";
import clientPromise from "@/config/mongodb";

export async function POST(request: Request) {
    const data = await request.json();
    data.createdAt = new Date(data.createdAt);

    const validResult = await validateGroup(data);

    if (!validResult.success) {
        return Response.json({
            code: 400,
            message: `[${validResult.error.issues[0].path[0]}] ` + validResult.error.issues[0].message 
        });
    }

    try {
        const client = await clientPromise;
        const groupsCollection = client.db('chatty').collection<GroupType>('groups');

        await client.connect();

        const existing = await GroupModel.getByName(groupsCollection, data.name);

        if (existing && existing._id) {
            const error: ResponseType = { code: 400, message: 'There is already a group with that name' };
            return Response.json(error);
        }

        const result = await GroupModel.create(groupsCollection, data);

        if (result.acknowledged) {
            const error: ResponseType = { code: 201, message: 'Group created successfully' };
            return Response.json(error);
        } else {
            const error: ResponseType = { code: 500, message: 'Error creating the group' };
            return Response.json(error);
        }
    } catch (error) {
        const catchError: ResponseType = { code: 500, message: error as string };
        return Response.json(catchError);
    }
}

export async function GET(request: NextRequest) {
    // const session = await getServerSession(authOptions);
    const ofUser = request.nextUrl.searchParams.get('ofuser');

    try {
        const client = await clientPromise;
        const groupsCollection = client.db('chatty').collection<GroupType>('groups');

        if (ofUser && ofUser === 'true') {
            // if (session && session.user) {
                const result = await GroupModel.getByUser(groupsCollection, '65469c8cca8bf1e737d733c0');
                return Response.json(result);
            // } else {
            //     return Response.json({ code: 400, message: 'No session found' });
            // }
        } else {
            const result = await GroupModel.getAll(groupsCollection);
            return Response.json(result);
        }
    } catch (error) {
        return Response.json({ code: 500, message: error as string });
    }
}
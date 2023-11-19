import AuthModel from "@/models/AuthModel";
import ResponseType from "@/types/ResponseType";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    const data = await request.json();
    if (!data || !data.username || !data.password) {
        const error: ResponseType = { status: 400, message: 'Mandatory data missing' };
        return Response.json(error);
    }

    try {
        const user = await AuthModel.SignIn(data);
        const response: ResponseType = { status: 200, message: 'Signed in successfully', data: user };
        return Response.json(response);
    } catch (error: any) {
        const catchError: ResponseType = { status: 500, message: error.message };
        return Response.json(catchError);
    }
}
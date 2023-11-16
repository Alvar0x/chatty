import AuthModel from "@/models/AuthModel";
import UserType from "@/types/server/UserType";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    const data = await request.json();
    const result = await AuthModel.Signin(data);
    
    return Response.json(result);
}
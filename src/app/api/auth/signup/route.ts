import AuthModel from "@/models/AuthModel";
import validateUser from "@/schemas/userSchema";
import ResponseType from "@/types/ResponseType";
import { error } from "console";

export async function POST(request: Request) {
    const data = await request.json();
    data.createdAt = new Date(data.createdAt);

    const validResult = await validateUser(data);
    if (!validResult.success) {
        const error: ResponseType = {
            status: 400,
            message: `[${validResult.error.issues[0].path[0]}] ${validResult.error.issues[0].message}` 
        }
        return Response.json(error);
    }

    try {
        const id = await AuthModel.SignUp(data);
        const response: ResponseType = { status: 200, message: 'Signed up successfully', data: id };
        return Response.json(response);
    } catch (error: any) {
        const catchError: ResponseType = { status: 500, message: error.message }
        return Response.json(catchError);
    }
}
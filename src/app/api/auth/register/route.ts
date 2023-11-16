import AuthModel from "@/models/AuthModel";
import validateUser from "@/schemas/userSchema";
import { v4 } from "uuid";

export async function POST(request: Request) {
    const id: string = v4();
    const data = await request.json();
    data.id = id;
    const validResult = await validateUser(data);
    if (!validResult.success) return Response.json({code: 400, message: "Bad request"});

    const result = await AuthModel.Register(data);
    return Response.json(result);
}
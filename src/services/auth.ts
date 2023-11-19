import AuthModel from "@/models/AuthModel";
import ResponseType from "@/types/ResponseType";
import UserType from "@/types/UserType";

export async function authenticate(username: string, password: string) {
    const requestConfig = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/signin`, requestConfig);
    const responseJSON: ResponseType = await response.json();

    return responseJSON;
}

export async function signUp(newUser: UserType) {
    const requestConfig = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/auth/signup`, requestConfig);
    const responseJSON: ResponseType = await response.json();

    return responseJSON;
}
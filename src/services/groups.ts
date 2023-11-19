import ResponseType from "@/types/ResponseType";

export async function getUserGroups(userId: string) {
    const requestConfig = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/groups?userid=${userId}`, requestConfig);

    const resultJSON: ResponseType = await result.json();

    return resultJSON;
}
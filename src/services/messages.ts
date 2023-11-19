import ResponseType from "@/types/ResponseType";

export async function getGroupMessages(groupId: string) {
    const requestConfig = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/messages?groupid=${groupId}`, requestConfig);

    const resultJSON: ResponseType = await result.json();

    return resultJSON;
}
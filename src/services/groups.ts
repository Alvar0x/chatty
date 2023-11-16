export async function getUserGroups() {
    const requestConfig = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/groups?ofuser=true`, requestConfig);

    const resultJSON = await result.json();
    resultJSON.createdAt = new Date(resultJSON.createdAt);

    return resultJSON;
}
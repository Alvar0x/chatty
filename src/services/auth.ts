export async function authenticate(username: string, password: string) {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }

    const authResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signin`, settings);

    if (!authResponse.ok) {
        return null;
    }

    const user = await authResponse.json();

    return user;
}

export async function register() {
    
}
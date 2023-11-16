import { MongoClient, ServerApiVersion } from 'mongodb';

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}).db('chatty').collection('users');

class AuthModel {
    static async Signin({ username, password }: { username: string, password: string }) {
        const result = await client.findOne({ name: username, password });
        return result;
    }
}

export default AuthModel;
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
};

if (!uri) {
  throw new Error('Add Mongo URI to .env.local');
}

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
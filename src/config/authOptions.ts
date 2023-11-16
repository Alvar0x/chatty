import { authenticate } from "@/services/auth";
import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { MongoClient, ServerApiVersion } from 'mongodb';

type Credentials = {
    username: string,
    password: string,
    redirect: string,
    csrfToken: string,
    callbackUrl: string,
    json: string
}

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize (credentials, req) {
                const data = req.body;
                
                if (data !== undefined) {
                    const res = await authenticate(data.username, data.password);
                    if (typeof res !== "undefined") {
                        return res;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: `${process.env.NEXTAUTH_URL}/signin`
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(client.connect(), {
        databaseName: 'chatty',
        collections: {
            Users: 'users',
            Accounts: 'accounts',
            Sessions: 'sessions',
            VerificationTokens: 'verificationTokens'
        }
    }),
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.user = user;
            }
            return token
        },
        async session({ session, token }) {
            if (token?.user) {
                delete (token.user as any).password;
                session.user = token.user as Session['user'];
            }
            return session
        }
    }
} satisfies NextAuthOptions;

export default authOptions;
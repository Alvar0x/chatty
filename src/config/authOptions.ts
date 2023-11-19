import { authenticate } from "@/services/auth";
import ResponseType from "@/types/ResponseType";
import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type Credentials = {
    username: string,
    password: string,
    redirect: string,
    csrfToken: string,
    callbackUrl: string,
    json: string
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                const data = req.body;
                
                if (data !== undefined) {
                    try {
                        const response: ResponseType = await authenticate(data.username, data.password);

                        if (response.status !== 200) {
                            return response.message;
                        }
                        
                        return response.data;
                    } catch (error: any) {
                        return error.message;
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
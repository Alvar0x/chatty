import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// middleware is applied to all routes, use conditionals to select

export default async function middleware(req: NextRequest) {
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });

    if (req.nextUrl.pathname.startsWith('/home') && !session) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/signin') && session) {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    return NextResponse.next();
}
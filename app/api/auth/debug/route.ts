export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        return NextResponse.json({
            hasSession: !!session,
            session: session ? {
                user: {
                    name: session.user?.name,
                    email: session.user?.email,
                    image: session.user?.image ? 'SET' : 'NOT SET',
                },
            } : null,
            env: {
                NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
                NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
                GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...' || 'NOT SET',
                GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET',
            },
            callbackUrl: process.env.NEXTAUTH_URL + '/api/auth/callback/google',
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message || 'Unknown error',
            stack: error.stack?.split('\n').slice(0, 5),
        });
    }
}

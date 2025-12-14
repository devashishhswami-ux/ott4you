import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connectDB from './lib/mongodb';
import Settings from './models/Settings';

export async function middleware(request: NextRequest) {
    // Skip maintenance check for admin routes and API
    if (
        request.nextUrl.pathname.startsWith('/admin') ||
        request.nextUrl.pathname.startsWith('/api') ||
        request.nextUrl.pathname === '/maintenance'
    ) {
        return NextResponse.next();
    }

    try {
        await connectDB();
        const settings = await Settings.findOne();

        if (settings?.maintenanceMode) {
            return NextResponse.redirect(new URL('/maintenance', request.url));
        }
    } catch (error) {
        console.error('Middleware error:', error);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

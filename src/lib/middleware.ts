import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@root/lib/get-user-session';

export async function middleware(request: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/not-auth', request.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/not-auth', request.url));
  }
}

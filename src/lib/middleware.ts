import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@root/lib/get-user-session';
import { prisma } from '@prisma/prisma-client';

export async function middleware(request: NextRequest) {
  const session = await getUserSession();
  if (!session) {
    return NextResponse.redirect(new URL('/not-auth', request.url));
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session.id) },
  });

  if (!user || user.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/not-auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

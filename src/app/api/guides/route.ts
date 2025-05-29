import { prisma } from '@prisma/prisma-client';

import { NextResponse } from 'next/server';

export async function GET() {
  const guide = await prisma.guide.findMany();

  return NextResponse.json(guide);
}

import { prisma } from '@prisma/prisma-client';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  const guide = await prisma.guide.findMany();

  return NextResponse.json(guide);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);

    const { classId, specializationId, modeId, patch } = body;

    if (!classId || !specializationId || !modeId || !patch) {
      console.error('Missing fields in request body:', body);
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const guide = await prisma.guide.create({
      data: {
        classId,
        specializationId,
        modeId,
        patch,
        heroTalents: {
          create: {
            tabs: {
              create: [
                {
                  value: 'tab1',
                  label: 'Таланты',
                  content: 'Здесь будет ваш контент...',
                },
                {
                  value: 'tab2',
                  label: 'Ротация',
                  content: 'Описание ротации...',
                },
              ],
            },
          },
        },
        overviewGear: {
          create: {
            headName: null,
            headImg: null,
            headLink: null,
            headEnchantImg: null,
            headEnchantUrl: null,
          },
        },
      },

      include: {
        class: true,
        specialization: true,
        modeRelation: true,
      },
    });

    console.log('Created guide:', guide);
    revalidatePath('/guides');
    return NextResponse.json({ success: true, guide }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/guides:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create guide' },
      { status: 500 }
    );
  }
}

import { prisma } from '@prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    const { id, content } = await request.json();

    const updatedTextField = await prisma.textField.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json({ success: true, textField: updatedTextField });
  } catch (error) {
    console.error('Error updating text field:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update text field' },
      { status: 500 }
    );
  }
}

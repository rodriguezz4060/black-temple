import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.BLIZZARD_CLIENT_ID!;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET!;

  try {
    const tokenRes = await fetch('https://oauth.battle.net/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });

    if (!tokenRes.ok) {
      throw new Error('Ошибка получения токена');
    }

    const tokenData = await tokenRes.json();
    return NextResponse.json({ access_token: tokenData.access_token });
  } catch (e) {
    console.error('Ошибка в API /api/blizzard-token:', e);
    return NextResponse.json(
      { error: 'Ошибка получения токена' },
      { status: 500 }
    );
  }
}

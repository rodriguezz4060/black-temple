'use server';

interface PatchData {
  patch_string: string;
}

export async function PatchData(): Promise<{ patch: string }> {
  const patchData: PatchData = await getPatchNumber();
  return {
    patch: patchData.patch_string,
  };
}

export const getPatchNumber = async () => {
  const clientId = process.env.BLIZZARD_CLIENT_ID!;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET!;

  try {
    // return JSON.parse("123");
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

    const tokenData = await tokenRes.json();
    // console.log(tokenData, tokenData.access_token);

    const patchRes = await fetch(
      'https://eu.api.blizzard.com/data/wow/region/3?namespace=dynamic-eu&locale=en_US',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        cache: 'force-cache',
        next: { revalidate: 3600 },
      }
    );

    const patchData = await patchRes.json();
    // console.log(patchData);
    return patchData;
    // return NextResponse.json({ patchBuildOrTimestamp: data.last_updated_timestamp });
  } catch (e) {
    console.error('Ошибка в API /api/patch:', e);
    // return NextResponse.json({ error: "Ошибка получения патча" }, { status: 500 });
  }
};

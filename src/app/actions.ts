"use server";

import { TCreateGuideSchemas } from "@/components/shared/guide/editor/schemas/create-guide-schemas";
import { TUpdateTabsSchemas } from "@/components/shared/guide/editor/schemas/update-tabs-schemas";

export const createGuide = async (data: TCreateGuideSchemas) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/";
    const url = `${baseUrl}/api/guides`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create guide");
    }

    const newGuide = await response.json();
    return newGuide; // Возвращаем созданный гайд с ID для редиректа
  } catch (error) {
    console.error("Error creating guide:", error);
    throw error;
  }
};

export const updateTabs = async (data: TUpdateTabsSchemas) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/";
    const url = `${baseUrl}/api/guides/tabs`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tabs: data.tabs,
        guideId: data.guideId,
      }),
    });

    const textResponse = await response.text(); // Сначала читаем как текст

    if (!response.ok) {
      try {
        // Пытаемся распарсить JSON ошибки
        const errorData = textResponse ? JSON.parse(textResponse) : {};
        throw new Error(errorData.error || "Failed to update tabs");
      } catch {
        throw new Error(textResponse || "Failed to update tabs");
      }
    }

    return textResponse ? JSON.parse(textResponse) : {};
  } catch (error) {
    console.error("Error updating tabs:", error);
    throw error instanceof Error ? error : new Error("Unknown error occurred");
  }
};

export const getPatchNumber = async () => {
  const clientId = process.env.BLIZZARD_CLIENT_ID!;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET!;

  try {
    // return JSON.parse("123");
    const tokenRes = await fetch("https://oauth.battle.net/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenRes.json();
    console.log(tokenData, tokenData.access_token);

    const patchRes = await fetch(
      "https://eu.api.blizzard.com/data/wow/region/3?namespace=dynamic-eu&locale=en_US",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const patchData = await patchRes.json();
    console.log(patchData);
    return patchData;
    // return NextResponse.json({ patchBuildOrTimestamp: data.last_updated_timestamp });
  } catch (e) {
    console.error("Ошибка в API /api/patch:", e);
    // return NextResponse.json({ error: "Ошибка получения патча" }, { status: 500 });
  }
};

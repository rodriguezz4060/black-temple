"use server";

import { TCreateGuideSchemas } from "@/components/shared/guide/editor/schemas/create-guide-schemas";
import { TUpdateTabsSchemas } from "@/components/shared/guide/editor/schemas/update-tabs-schemas";

export const createGuide = async (data: TCreateGuideSchemas) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/";
    const url = `${baseUrl}/api/guide`;

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
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/";
    const url = `${baseUrl}/api/guide/tabs`;

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

"use server";

import { revalidatePath } from "next/cache";
import { addClick } from "@/lib/data";

export async function saveClickData(
  linkId: string,
  userAgent: string,
  location: { latitude: number, longitude: number } | null
) {
  try {
    await addClick(linkId, userAgent, location);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to save click data:", error);
    return { success: false, error: "Failed to save click data." };
  }
}

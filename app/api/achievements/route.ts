import { NextResponse } from "next/server";
import { getAchievements } from "@/lib/firebase/firestore";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const data = await getAchievements();
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json([], { status: 500 }); }
}

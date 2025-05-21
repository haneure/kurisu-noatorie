// app/api/system/route.ts
import { getSystemDetails } from "@/lib/system";
import { NextResponse } from "next/server";

export async function GET() {
  const systemInfo = await getSystemDetails();
  return NextResponse.json(systemInfo);
}

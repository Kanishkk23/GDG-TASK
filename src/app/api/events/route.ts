import { NextResponse } from "next/server";
import { initialEvents } from "@/lib/store";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialEvents,
  });
}

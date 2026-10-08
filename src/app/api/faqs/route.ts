import { NextResponse } from "next/server";
import { initialFaqs } from "@/lib/store";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialFaqs,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { ContactMessage } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: ContactMessage = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for getting in touch! A GDG RBU lead will reply shortly.",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}

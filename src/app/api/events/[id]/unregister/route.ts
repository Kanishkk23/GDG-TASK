import { NextRequest, NextResponse } from "next/server";
import { eventsDb, registrationsDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.cookies.get("gdg_token")?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ success: false, message: "Invalid session." }, { status: 401 });
  }

  const regIndex = registrationsDb.findIndex(
    (r) => r.eventId === params.id && r.userId === payload.userId
  );

  if (regIndex === -1) {
    return NextResponse.json({ success: false, message: "You do not have an active registration for this event." }, { status: 404 });
  }

  // Remove registration
  registrationsDb.splice(regIndex, 1);

  // Decrement event registeredCount
  const event = eventsDb.find((e) => e.id === params.id);
  if (event && event.registeredCount > 0) {
    event.registeredCount -= 1;
  }

  return NextResponse.json({
    success: true,
    message: "Registration cancelled successfully. Your spot has been released.",
  });
}

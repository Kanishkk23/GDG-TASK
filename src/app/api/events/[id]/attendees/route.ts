import { NextRequest, NextResponse } from "next/server";
import { eventsDb, registrationsDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.cookies.get("gdg_token")?.value;

  if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ success: false, message: "Forbidden. Admin access required." }, { status: 403 });
  }

  const event = eventsDb.find((e) => e.id === params.id);
  if (!event) {
    return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
  }

  const attendees = registrationsDb.filter((r) => r.eventId === params.id);

  return NextResponse.json({
    success: true,
    eventTitle: event.title,
    capacity: event.capacity,
    registeredCount: event.registeredCount,
    attendees,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { eventsDb, registrationsDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.cookies.get("gdg_token")?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ success: false, message: "Invalid session token" }, { status: 401 });
  }

  const userRegs = registrationsDb.filter((r) => r.userId === payload.userId);

  const registeredEvents = userRegs.map((reg) => {
    const event = eventsDb.find((e) => e.id === reg.eventId);
    return {
      registrationId: reg.id,
      ticketId: reg.ticketId,
      eventId: reg.eventId,
      eventTitle: event?.title || "Unknown Event",
      dateTime: event?.dateTime || "TBD",
      venue: event?.venue || "Main Auditorium",
      category: event?.category || reg.domain,
      registeredAt: reg.createdAt,
    };
  });

  return NextResponse.json({
    success: true,
    count: registeredEvents.length,
    data: registeredEvents,
  });
}

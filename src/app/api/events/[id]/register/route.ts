import { NextRequest, NextResponse } from "next/server";
import { eventsDb, registrationsDb, usersDb, syncDbFromDisk, saveDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RegistrationRecord } from "@/types";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  syncDbFromDisk();
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.cookies.get("gdg_token")?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: "Please log in to register for events." }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ success: false, message: "Invalid or expired session. Please log in again." }, { status: 401 });
  }

  const event = eventsDb.find((e) => e.id === params.id);
  if (!event) {
    return NextResponse.json({ success: false, message: "Event not found." }, { status: 404 });
  }

  // 1. Prevent duplicate registration
  const alreadyRegistered = registrationsDb.find(
    (r) => r.eventId === params.id && r.userId === payload.userId
  );
  if (alreadyRegistered) {
    return NextResponse.json(
      {
        success: false,
        message: "You are already registered for this event!",
        ticketId: alreadyRegistered.ticketId,
      },
      { status: 409 }
    );
  }

  // 2. Enforce capacity limit
  if (event.registeredCount >= event.capacity) {
    return NextResponse.json(
      {
        success: false,
        message: `Sorry, this event is at full capacity (${event.capacity}/${event.capacity} seats taken). Registration is closed.`,
      },
      { status: 400 }
    );
  }

  const user = usersDb.find((u) => u.id === payload.userId);
  let domain = event.category;

  try {
    const body = await req.json().catch(() => ({}));
    if (body.domain) domain = body.domain;
  } catch {}

  // 3. Atomically increment registered count & issue digital pass
  event.registeredCount += 1;

  const ticketId = `GDG-RBU-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;

  const newReg: RegistrationRecord = {
    id: `reg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ticketId,
    eventId: event.id,
    userId: payload.userId,
    userName: user?.name || payload.name,
    userEmail: user?.email || payload.email,
    department: user?.department || "Student",
    year: user?.year || "Year 1",
    domain,
    createdAt: new Date().toISOString(),
  };

  registrationsDb.push(newReg);
  saveDb();

  return NextResponse.json({
    success: true,
    message: `Successfully registered for ${event.title}!`,
    ticketId,
    registeredAt: newReg.createdAt,
    data: newReg,
  });
}

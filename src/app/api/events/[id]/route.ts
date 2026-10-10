import { NextRequest, NextResponse } from "next/server";
import { eventsDb, registrationsDb, syncDbFromDisk, saveDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  syncDbFromDisk();
  const event = eventsDb.find((e) => e.id === params.id);
  if (!event) {
    return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: event });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // Admin check
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.cookies.get("gdg_token")?.value;

  if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ success: false, message: "Forbidden. Admin only." }, { status: 403 });
  }

  const eventIndex = eventsDb.findIndex((e) => e.id === params.id);
  if (eventIndex === -1) {
    return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const event = eventsDb[eventIndex];

    if (body.capacity !== undefined) {
      const newCapacity = parseInt(body.capacity, 10);
      if (isNaN(newCapacity) || newCapacity < event.registeredCount) {
        return NextResponse.json(
          { success: false, message: `Capacity cannot be lower than current registered attendees (${event.registeredCount}).` },
          { status: 400 }
        );
      }
      event.capacity = newCapacity;
    }

    if (body.title) event.title = body.title.trim();
    if (body.description) event.description = body.description.trim();
    if (body.dateTime) event.dateTime = body.dateTime.trim();
    if (body.venue) event.venue = body.venue.trim();
    if (body.category) event.category = body.category.trim();

    saveDb();
    return NextResponse.json({ success: true, message: "Event updated successfully!", data: event });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid update payload" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Admin check
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.cookies.get("gdg_token")?.value;

  if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ success: false, message: "Forbidden. Admin only." }, { status: 403 });
  }

  syncDbFromDisk();
  const eventIndex = eventsDb.findIndex((e) => e.id === params.id);
  if (eventIndex === -1) {
    return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
  }

  // Remove event
  eventsDb.splice(eventIndex, 1);

  // Cascade cancel registrations
  for (let i = registrationsDb.length - 1; i >= 0; i--) {
    if (registrationsDb[i].eventId === params.id) {
      registrationsDb.splice(i, 1);
    }
  }

  saveDb();
  return NextResponse.json({ success: true, message: "Event and associated registrations deleted successfully." });
}

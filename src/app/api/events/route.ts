import { NextRequest, NextResponse } from "next/server";
import { eventsDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { EventItem } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  let filtered = eventsDb;

  if (category && category !== "All") {
    filtered = filtered.filter((e) => e.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(search) ||
        e.description.toLowerCase().includes(search) ||
        (e.venue || "").toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}

export async function POST(req: NextRequest) {
  // Admin only
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.cookies.get("gdg_token")?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized. Authentication required." }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ success: false, message: "Forbidden. Admin access required to create events." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, description, dateTime, venue, capacity, category } = body;

    if (!title || !description || !dateTime || !venue || !capacity || !category) {
      return NextResponse.json(
        { success: false, message: "All fields are required: Title, Description, Date/Time, Venue, Capacity, Category." },
        { status: 400 }
      );
    }

    const numCapacity = parseInt(capacity, 10);
    if (isNaN(numCapacity) || numCapacity <= 0) {
      return NextResponse.json(
        { success: false, message: "Capacity must be a positive number greater than 0." },
        { status: 400 }
      );
    }

    const newEvent: EventItem = {
      id: `event-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      description: description.trim(),
      dateTime: dateTime.trim(),
      venue: venue.trim(),
      capacity: numCapacity,
      category: category.trim(),
      registeredCount: 0,
      createdAt: new Date().toISOString(),
      isUpcoming: true,
    };

    eventsDb.unshift(newEvent);

    return NextResponse.json(
      { success: true, message: "Event created successfully!", data: newEvent },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Failed to parse event data." }, { status: 400 });
  }
}

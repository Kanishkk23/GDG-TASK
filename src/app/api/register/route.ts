import { NextRequest, NextResponse } from "next/server";
import { initialEvents, registrationsDb, StoredRegistration } from "@/lib/store";
import { RegistrationRequest } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: RegistrationRequest = await req.json();

    // Validation
    if (!body.fullName || !body.email || !body.department || !body.year) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields (Name, Email, Department, Year).",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // Check duplicate email for the same event
    const existing = registrationsDb.find(
      (r) => r.email.toLowerCase() === body.email.toLowerCase() && r.eventId === body.eventId
    );
    if (existing) {
      return NextResponse.json(
        {
          success: true,
          ticketId: existing.ticketId,
          message: "You are already registered! Here is your existing ticket ID.",
          registeredAt: existing.createdAt,
        },
        { status: 200 }
      );
    }

    // Generate unique Ticket ID
    const ticketId = `GDG-RBU-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const newReg: StoredRegistration = {
      id: Math.random().toString(36).substring(2, 9),
      ticketId,
      eventId: body.eventId || "gdg-orientation-2024",
      fullName: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      department: body.department,
      year: body.year,
      phone: body.phone,
      createdAt: new Date().toISOString(),
    };

    registrationsDb.push(newReg);

    // Update event counter
    const event = initialEvents.find((e) => e.id === newReg.eventId);
    if (event) {
      event.registeredCount += 1;
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Registration successful! Welcome to GDG RBU Orientation 2024.",
      registeredAt: newReg.createdAt,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing registration.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    totalRegistrations: registrationsDb.length,
    recentRegistrations: registrationsDb.slice(-10).map(r => ({
      ticketId: r.ticketId,
      fullName: r.fullName,
      department: r.department,
      year: r.year,
      createdAt: r.createdAt
    }))
  });
}

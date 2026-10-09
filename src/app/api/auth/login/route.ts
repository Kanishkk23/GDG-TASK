import { NextRequest, NextResponse } from "next/server";
import { usersDb } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const emailLower = email.trim().toLowerCase();
    const user = usersDb.find((u) => u.email.toLowerCase() === emailLower);

    if (!user || user.passwordHash !== hashPassword(password)) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      year: user.year,
      createdAt: user.createdAt,
    };

    const token = signToken(safeUser);

    const res = NextResponse.json({
      success: true,
      message: "Login successful!",
      user: safeUser,
      token,
    });

    res.cookies.set("gdg_token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

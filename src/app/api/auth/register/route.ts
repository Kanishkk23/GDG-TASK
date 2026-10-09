import { NextRequest, NextResponse } from "next/server";
import { usersDb } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/auth";
import { User } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, department, year, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const emailLower = email.trim().toLowerCase();
    const existing = usersDb.find((u) => u.email.toLowerCase() === emailLower);
    if (existing) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists." },
        { status: 409 }
      );
    }

    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      email: emailLower,
      role: role === "admin" ? "admin" : "user",
      department: department || "Computer Science",
      year: year || "1st Year",
      createdAt: new Date().toISOString(),
    };

    usersDb.push({
      ...newUser,
      passwordHash: hashPassword(password),
    });

    const token = signToken(newUser);

    const res = NextResponse.json({
      success: true,
      message: "Registration successful!",
      user: newUser,
      token,
    });

    res.cookies.set("gdg_token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { usersDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.cookies.get("gdg_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired session token" },
      { status: 401 }
    );
  }

  const user = usersDb.find((u) => u.id === payload.userId);
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      year: user.year,
      createdAt: user.createdAt,
    },
  });
}

export async function POST() {
  const res = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
  res.cookies.delete("gdg_token");
  return res;
}

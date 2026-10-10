import { NextRequest, NextResponse } from "next/server";
import { usersDb } from "@/lib/db";
import { verifyToken, hashPassword } from "@/lib/auth";
import { User } from "@/types";

function getAdminPayload(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  let token = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else {
    token = req.cookies.get("gdg_token")?.value || "";
  }

  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") return null;
  return payload;
}

// GET /api/admin/users - List all administrators and chapter members
export async function GET(req: NextRequest) {
  try {
    const admin = getAdminPayload(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    const sanitizedUsers = usersDb.map(({ passwordHash, ...user }) => user);
    const admins = sanitizedUsers.filter((u) => u.role === "admin");

    return NextResponse.json({
      success: true,
      admins,
      users: sanitizedUsers,
      totalUsers: sanitizedUsers.length,
      totalAdmins: admins.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Admin creates another admin account or promotes an existing user
export async function POST(req: NextRequest) {
  try {
    const admin = getAdminPayload(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Forbidden. Only an existing Chapter Admin can grant admin access." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, email, password, department, year } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const emailLower = email.trim().toLowerCase();
    const existingIndex = usersDb.findIndex((u) => u.email.toLowerCase() === emailLower);

    if (existingIndex !== -1) {
      const existingUser = usersDb[existingIndex];
      if (existingUser.role === "admin") {
        return NextResponse.json(
          { success: false, message: `"${existingUser.email}" is already a Chapter Admin.` },
          { status: 409 }
        );
      }

      // Promote existing user to admin
      existingUser.role = "admin";
      if (password) {
        existingUser.passwordHash = hashPassword(password);
      }
      if (name) existingUser.name = name.trim();
      if (department) existingUser.department = department;

      const { passwordHash, ...safeUser } = existingUser;

      return NextResponse.json({
        success: true,
        message: `Successfully promoted "${existingUser.email}" to Chapter Admin!`,
        user: safeUser,
      });
    }

    // Creating a completely new Admin account
    if (!name || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required to create a new admin account." },
        { status: 400 }
      );
    }

    const newAdmin: User = {
      id: `admin-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      email: emailLower,
      role: "admin",
      department: department || "GDG Leadership",
      year: year || "Lead / Faculty",
      createdAt: new Date().toISOString(),
    };

    usersDb.push({
      ...newAdmin,
      passwordHash: hashPassword(password),
    });

    return NextResponse.json({
      success: true,
      message: `New Chapter Admin account created for "${emailLower}"!`,
      user: newAdmin,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
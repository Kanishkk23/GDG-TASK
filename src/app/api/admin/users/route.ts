import { NextRequest, NextResponse } from "next/server";
import { usersDb, syncDbFromDisk, saveDb } from "@/lib/db";
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

    syncDbFromDisk();
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

// POST /api/admin/users - Admin creates another admin account or promotes/updates an existing user
export async function POST(req: NextRequest) {
  try {
    const admin = getAdminPayload(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Forbidden. Only an existing Chapter Admin can grant admin access." },
        { status: 403 }
      );
    }

    syncDbFromDisk();
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
        if (password || name || department) {
          if (password) existingUser.passwordHash = hashPassword(password);
          if (name) existingUser.name = name.trim();
          if (department) existingUser.department = department;
          saveDb();

          const { passwordHash, ...safeUser } = existingUser;
          return NextResponse.json({
            success: true,
            message: `Updated profile & credentials for Chapter Admin "${existingUser.email}"!`,
            user: safeUser,
          });
        }

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
      saveDb();

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
    saveDb();

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

// DELETE /api/admin/users - Remove admin privileges or remove account
export async function DELETE(req: NextRequest) {
  try {
    const admin = getAdminPayload(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    syncDbFromDisk();
    const body = await req.json().catch(() => ({}));
    const email = (body.email || "").trim().toLowerCase();
    const userId = body.userId;
    const deleteAccount = Boolean(body.deleteAccount);

    if (!email && !userId) {
      return NextResponse.json(
        { success: false, message: "Email or userId is required to remove an admin." },
        { status: 400 }
      );
    }

    const targetIndex = usersDb.findIndex(
      (u) => (email && u.email.toLowerCase() === email) || (userId && u.id === userId)
    );

    if (targetIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Admin user not found." },
        { status: 404 }
      );
    }

    const targetUser = usersDb[targetIndex];

    // Safety checks:
    // 1. Cannot remove primary chapter lead
    if (targetUser.email.toLowerCase() === "k3kriplani@gmail.com") {
      return NextResponse.json(
        { success: false, message: "The primary Chapter Lead (k3kriplani@gmail.com) cannot be removed." },
        { status: 400 }
      );
    }

    // 2. Cannot remove yourself while logged in
    if (targetUser.id === admin.userId || targetUser.email.toLowerCase() === admin.email.toLowerCase()) {
      return NextResponse.json(
        { success: false, message: "You cannot remove your own admin account while currently logged in." },
        { status: 400 }
      );
    }

    if (deleteAccount) {
      // Remove completely from users database
      usersDb.splice(targetIndex, 1);
      saveDb();
      return NextResponse.json({
        success: true,
        message: `Admin account "${targetUser.email}" removed completely.`,
      });
    } else {
      // Demote from admin to regular user
      targetUser.role = "user";
      saveDb();
      return NextResponse.json({
        success: true,
        message: `Admin privileges revoked for "${targetUser.email}". Account changed to regular member.`,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
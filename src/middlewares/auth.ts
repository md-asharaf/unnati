import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../lib/token";
import { db } from "../lib/db";

export async function requireAdmin(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        var decodedToken = verifyToken(token);
    } catch (err) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    const admin = await db.admin.findUnique({ where: { id: decodedToken.id } });

    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return admin;
}

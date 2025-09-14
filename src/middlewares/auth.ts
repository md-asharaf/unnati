import { NextResponse } from "next/server";
import { verifyToken } from "../lib/token";
import { db } from "../lib/db";

export async function requireAdmin(request: Request) {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let id;
    try {
        id = (verifyToken(token) as { id: string }).id;
    } catch (err) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    const admin = await db.admin.findUnique({ where: { id } });

    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return admin;
}

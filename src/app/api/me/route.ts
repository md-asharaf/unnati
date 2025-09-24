import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middlewares/auth";

export const GET = async (_req: NextRequest) => {
    const { id, error, status } = await requireAdmin();
    if (error) {
        return NextResponse.json({ error, data: { admin: null } }, { status });
    }
    const admin = await db.admin.findUnique({ where: { id } });
    if (!admin) {
        return NextResponse.json({ error: "Not Found", data: { admin: null } }, { status: 404 });
    }
    return NextResponse.json({ message: "Admin fetched successfully", data: { admin } });
};
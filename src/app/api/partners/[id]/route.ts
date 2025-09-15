import { db } from "@/lib/db";
import { requireAdmin } from "@/middlewares/auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const admin = await requireAdmin(req);
    if (admin instanceof NextResponse) return admin;
    const { id } = await params;
    console.log(id)
    if (!id) {
        return NextResponse.json({ error: "No id provided" }, { status: 400 });
    }
    const image = await db.image.findUnique({ where: { id } });
    if (!image) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    if (image.type !== "PARTNER") {
        return NextResponse.json({ error: "Not a partner image" }, { status: 400 });
    }
    await db.image.delete({ where: { id } });
    return NextResponse.json({ message: "Partner image deleted successfully" });
}
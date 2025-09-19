import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    const adminId = req.headers.get("x-admin-id");
    const admin = await db.admin.findUnique({ where: { id: adminId! } });
    return NextResponse.json({
        message: "Admin fetched successfully",
        data: {
            admin
        }
    })
}
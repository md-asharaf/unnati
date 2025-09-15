import { requireAdmin } from "@/middlewares/auth"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    const admin = await requireAdmin(req);
    if (admin instanceof NextResponse) return admin;
    if (!admin) {
        return NextResponse.json({
            error: "Admin not found"
        }, { status: 404 })
    }
    return NextResponse.json({
        message: "Admin fetched successfully",
        data: {
            admin
        }
    })
}
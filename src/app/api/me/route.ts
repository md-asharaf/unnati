import { requireAdmin } from "@/middlewares/auth"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const admin = await requireAdmin(req);
    if (admin instanceof NextResponse) return admin;
    if (!admin) {
        return NextResponse.json({
            message:"Admin not found"
        }, {status:404})
    }
    return NextResponse.json({
        message:"Admin fetched successfully",
        data:{
            admin
        }
    })
}
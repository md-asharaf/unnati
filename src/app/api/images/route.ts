import { db } from "@/lib/db";
import { imageTypeSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const type = req.nextUrl.searchParams.get("type");
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10", 10);
    let validatedType;
    try {
        validatedType = type ? imageTypeSchema.parse(type.toUpperCase()) : undefined;
    } catch (error) {
        return NextResponse.json({ error: "Invalid Image type" }, { status: 400 });
    }
    const where = {
        ...(validatedType && { type: validatedType }),
    }
    const [images, total] = await Promise.all([
        db.image.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
        }),
        db.image.count({ where }),
    ])
    return NextResponse.json({ data: { images, total, totalPages: Math.ceil(total / limit), page, limit }, message: "Images fetched successfully" });
};

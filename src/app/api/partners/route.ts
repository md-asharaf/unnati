import { db } from "@/lib/db";
import uploadService from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file || !(file instanceof Blob)) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // upload to cloudinary
    const { id, url } = await uploadService.uploadBuffer(buffer, file.type);
    // save to db
    const partner = await db.image.create({
        data: {
            url,
            id,
            type: "PARTNER",
        },
    });
    return NextResponse.json({
        data: {
            partner: {
                id: partner.id,
                url: partner.url
            }
        }, message: "Partner image uploaded successfully"
    });
}
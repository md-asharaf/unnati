import { db } from "@/lib/db";
import { createCompanySchema } from "@/schemas";
import uploadService from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const isPremium = formData.get("isPremium") === "true";
    let validatedData;
    try {
        validatedData = createCompanySchema.parse({ name, isPremium, file });
    } catch (error) {
        return NextResponse.json(
            {
                error: (error as z.ZodError).issues
                    .map((issue) => issue.message)
                    .join(", "),
            },
            { status: 400 },
        );
    }
    const arrayBuffer = await validatedData.file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // upload to cloudinary
    const { id, url } = await uploadService.uploadBuffer(buffer, validatedData.file.type);
    // save to db
    const image = await db.image.create({
        data: {
            url,
            id,
            type: "COMPANY",
        },
    });

    const company = await db.company.create({
        data: {
            name: validatedData.name,
            isPremium: validatedData.isPremium,
            imageId: image.id,
        },
        include: {
            logo: true
        }
    })
    return NextResponse.json({
        data: {
            company
        }, message: "Company image uploaded successfully"
    });
}


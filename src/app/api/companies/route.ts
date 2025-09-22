import { db } from "@/lib/db";
import { createCompanySchema } from "@/schemas";
import uploadService from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const logo = formData.get("logo") as File;
    const name = formData.get("name") as string;
    const isPremium = formData.get("isPremium") === "true";
    let validatedData;
    try {
        validatedData = createCompanySchema.parse({ name, isPremium, logo });
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
    const arrayBuffer = await validatedData.logo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // upload to cloudinary
    const { id, url } = await uploadService.uploadBuffer(buffer, validatedData.logo.type);
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

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const isPremium = searchParams.get("isPremium");
    const whereClause = isPremium !== null ? { isPremium: isPremium === "true" } : {};
    const companies = await db.company.findMany({
        where: whereClause,
        include: {
            logo: true
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: "desc"
        }
    });
    const total = await db.company.count({
        where: whereClause
    });
    return NextResponse.json({
        data: {
            companies,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        },
        message: "Companies fetched successfully"
    }, { status: 200 });
}


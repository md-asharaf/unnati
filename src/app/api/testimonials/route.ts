import { db } from "@/lib/db";
import { CreateTestimonial, createTestimonialSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const { content, placementId, rating } = await req.json() as CreateTestimonial
    let validatedData;
    try {
        validatedData = createTestimonialSchema.parse({ content, placementId, rating });
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
    const placement = await db.placement.findUnique({
        where: { id: placementId },
    });
    if (!placement) {
        return NextResponse.json(
            { error: "Placement not found" },
            { status: 404 }
        );
    }
    const testimonial = await db.testimonial.create({
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                testimonial,
            },
            message: "Testimonial created successfully",
        },
        { status: 201 },
    );
};

export const GET = async (req: NextRequest) => {
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10", 10)
    const placementId = req.nextUrl.searchParams.get("placementId");
    const where = placementId
        ? {
            placementId,
        }
        : {};
    const [testimonials, total] = await Promise.all([
        db.testimonial.findMany({
            where,
            skip: (page - 1) * limit,
            include: {
                placement: true
            },
            take: limit,
        }),
        db.testimonial.count({ where }),
    ]);
    return NextResponse.json({
        data: {
            testimonials,
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit,
        },
        message: "testimonials fetched successfully",
    });
};

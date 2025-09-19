import { db } from "@/lib/db";
import { CreateTestimonial, createTestimonialSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const testimonial = await db.testimonial.findUnique({
        where: { id }
    });
    if (!testimonial) {
        return NextResponse.json(
            { error: "Testimonial not found" },
            { status: 404 }
        );
    }
    await db.testimonial.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Testimonial deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { content, placementId, rating } = await req.json() as CreateTestimonial;
    let validatedData;
    try {
        validatedData = createTestimonialSchema.parse({ content, placementId, rating });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const testimonial = await db.testimonial.findUnique({
        where: { id }
    });
    if (!testimonial) {
        return NextResponse.json(
            { error: "Testimonial not found" },
            { status: 404 }
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
    const updatedTestimonial = await db.testimonial.update({
        where: { id },
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                testimonial: updatedTestimonial
            },
            message: "Testimonial updated successfully"
        },
        { status: 200 }
    );
}
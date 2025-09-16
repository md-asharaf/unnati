import { db } from "@/lib/db";
import { requireAdmin } from "@/middlewares/auth";
import { CreateFaq, createFaqSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const admin = await requireAdmin(req);
    if (admin instanceof Response) return admin;
    const { id } = await params;
    const faq = await db.faq.findUnique({
        where: { id }
    });
    if (!faq) {
        return NextResponse.json(
            { error: "FAQ not found" },
            { status: 404 }
        );
    }
    await db.faq.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "FAQ deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const admin = await requireAdmin(req);
    if (admin instanceof Response) return admin;
    const { id } = await params;
    const { question, answer, topicId } = await req.json() as CreateFaq;
    let validatedData;
    try {
        validatedData = createFaqSchema.parse({ question, answer, topicId });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const faq = await db.faq.findUnique({
        where: { id }
    });
    if (!faq) {
        return NextResponse.json(
            { error: "FAQ not found" },
            { status: 404 }
        );
    }
    const topic = await db.topic.findUnique({
        where: { id: topicId },
    });
    if (!topic) {
        return NextResponse.json(
            { error: "Topic not found" },
            { status: 404 }
        );
    }
    const updatedFaq = await db.faq.update({
        where: { id },
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                faq: updatedFaq
            },
            message: "FAQ updated successfully"
        },
        { status: 200 }
    );
}
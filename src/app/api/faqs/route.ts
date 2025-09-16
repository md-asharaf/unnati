import { db } from "@/lib/db";
import { CreateFaq, createFaqSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const { question, answer, topicId } = (await req.json()) as CreateFaq;
    let validatedData;
    try {
        validatedData = createFaqSchema.parse({ question, answer, topicId });
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
    const topic = await db.topic.findUnique({
        where: { id: topicId },
    });
    if (!topic) {
        return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }
    const faq = await db.faq.create({
        data: validatedData,
    });
    return NextResponse.json(
        {
            data: {
                faq,
            },
            message: "FAQ created successfully",
        },
        { status: 201 },
    );
};

export const GET = async (req: NextRequest) => {
    const topicId = req.nextUrl.searchParams.get("topicId");
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10", 10);
    const where = topicId
        ? {
              topicId,
          }
        : {};
    const [faqs, total] = await Promise.all([
        db.faq.findMany({
            where,
            include:{
                topic:true
            },
            skip: (page - 1) * limit,
            take: limit,
        }),
        db.faq.count({ where }),
    ]);
    return NextResponse.json({
        data: {
            faqs,
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit,
        },
        message: "faqs fetched successfully",
    });
};

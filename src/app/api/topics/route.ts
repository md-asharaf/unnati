import { db } from "@/lib/db";
import { CreateTopic, createTopicSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const { name } = await req.json() as CreateTopic;
    let validatedData;
    try {
        validatedData = createTopicSchema.parse({ name });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const topic = await db.topic.create({
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                topic
            },
            message: "Topic created successfully"
        },
        { status: 201 }
    );
}

export const GET = async (req: NextRequest) => {
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10", 10);
    const [topics, total] = await Promise.all([
        db.topic.findMany({
            skip: (page - 1) * limit,
            include: {
                faqs: true
            },
            take: limit,
        }),
        db.topic.count(),
    ]);
    return NextResponse.json({
        data: {
            topics,
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit,
        },
        message: "topics fetched successfully",
    });
};

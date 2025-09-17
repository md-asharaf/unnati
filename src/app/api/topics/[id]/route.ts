import { db } from "@/lib/db";
import { CreateTopic, createTopicSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const topic = await db.topic.findUnique({
        where: { id }
    });
    if (!topic) {
        return NextResponse.json(
            { error: "Topic not found" },
            { status: 404 }
        );
    }
    await db.topic.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Topic deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
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
    const topic = await db.topic.findUnique({
        where: { id }
    });
    if (!topic) {
        return NextResponse.json(
            { error: "Topic not found" },
            { status: 404 }
        );
    }
    const updatedTopic = await db.topic.update({
        where: { id },
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                topic: updatedTopic
            },
            message: "Topic updated successfully"
        },
        { status: 200 }
    );
}
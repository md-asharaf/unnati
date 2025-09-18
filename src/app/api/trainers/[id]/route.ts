import { db } from "@/lib/db";
import { CreateTrainer, createTrainerSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const trainer = await db.trainer.findUnique({
        where: { id }
    });
    if (!trainer) {
        return NextResponse.json(
            { error: "Trainer not found" },
            { status: 404 }
        );
    }
    await db.trainer.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Trainer deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { designation, experience, expertise, name, bio, photoUrl } = await req.json() as CreateTrainer;
    let validatedData;
    try {
        validatedData = createTrainerSchema.parse({ designation, experience, expertise, name, bio, photoUrl });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const trainer = await db.trainer.findUnique({
        where: { id }
    });
    if (!trainer) {
        return NextResponse.json(
            { error: "Trainer not found" },
            { status: 404 }
        );
    }
    const updatedTrainer = await db.trainer.update({
        where: { id },
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                trainer: updatedTrainer
            },
            message: "Trainer updated successfully"
        },
        { status: 200 }
    );
}
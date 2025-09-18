import { db } from "@/lib/db";
import { CreateTrainer, createTrainerSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const { designation, experience, expertise, name, bio, photoUrl } = await req.json() as CreateTrainer
    let validatedData;
    try {
        validatedData = createTrainerSchema.parse({ designation, experience, expertise, name, bio, photoUrl });
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
    const trainer = await db.trainer.create({
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                trainer,
            },
            message: "Trainer created successfully",
        },
        { status: 201 },
    );
};

export const GET = async () => {
    const traineres = await db.trainer.findMany();
    return NextResponse.json({
        data: {
            traineres,
        },
        message: "Traineres fetched successfully",
    });
};

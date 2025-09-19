import { db } from "@/lib/db";
import { CreateUsp, createUspSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const { bulletPoints, heading, subheading } = await req.json() as CreateUsp
    let validatedData;
    try {
        validatedData = createUspSchema.parse({ bulletPoints, heading, subheading });
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
    const usp = await db.usp.create({
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                usp,
            },
            message: "Usp created successfully",
        },
        { status: 201 },
    );
};

export const GET = async () => {
    const usps = await db.usp.findMany();
    return NextResponse.json({
        data: {
            usps,
        },
        message: "Usps fetched successfully",
    });
};

import { db } from "@/lib/db";
import { CreateUsp, createUspSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const usp = await db.usp.findUnique({
        where: { id }
    });
    if (!usp) {
        return NextResponse.json(
            { error: "Usp not found" },
            { status: 404 }
        );
    }
    await db.usp.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Usp deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { bulletPoints, heading, subheading } = await req.json() as CreateUsp;
    let validatedData;
    try {
        validatedData = createUspSchema.parse({ bulletPoints, heading, subheading });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const usp = await db.usp.findUnique({
        where: { id }
    });
    if (!usp) {
        return NextResponse.json(
            { error: "Usp not found" },
            { status: 404 }
        );
    }
    const updatedUsp = await db.usp.update({
        where: { id },
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                usp: updatedUsp
            },
            message: "Usp updated successfully"
        },
        { status: 200 }
    );
}
import { db } from "@/lib/db";
import { CreatePlacement, createPlacementSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const placement = await db.placement.findUnique({
        where: { id }
    });
    if (!placement) {
        return NextResponse.json(
            { error: "Placement not found" },
            { status: 404 }
        );
    }
    await db.placement.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Placement deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { companyId, name, role, photoUrl } = await req.json() as CreatePlacement;
    let validatedData;
    try {
        validatedData = createPlacementSchema.parse({ companyId, name, role, photoUrl });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const placement = await db.placement.findUnique({
        where: { id }
    });
    if (!placement) {
        return NextResponse.json(
            { error: "Placement not found" },
            { status: 404 }
        );
    }
    const company = await db.company.findUnique({
        where: { id: companyId },
    });
    if (!company) {
        return NextResponse.json(
            { error: "Company not found" },
            { status: 404 }
        );
    }
    const updatedPlacement = await db.placement.update({
        where: { id },
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                placement: updatedPlacement
            },
            message: "Placement updated successfully"
        },
        { status: 200 }
    );
}
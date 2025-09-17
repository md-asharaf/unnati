import { db } from "@/lib/db";
import { CreateBranch, createBranchSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const branch = await db.branch.findUnique({
        where: { id }
    });
    if (!branch) {
        return NextResponse.json(
            { error: "Branch not found" },
            { status: 404 }
        );
    }
    await db.branch.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Branch deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { address, latitude, longitude, name, phone } = await req.json() as CreateBranch;
    let validatedData;
    try {
        validatedData = createBranchSchema.parse({ address, latitude, longitude, name, phone });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const branch = await db.branch.findUnique({
        where: { id }
    });
    if (!branch) {
        return NextResponse.json(
            { error: "Branch not found" },
            { status: 404 }
        );
    }
    const updatedBranch = await db.branch.update({
        where: { id },
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                branch: updatedBranch
            },
            message: "Branch updated successfully"
        },
        { status: 200 }
    );
}
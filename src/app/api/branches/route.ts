import { db } from "@/lib/db";
import { CreateBranch, createBranchSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const { address, latitude, longitude, name, phone } = await req.json() as CreateBranch
    let validatedData;
    try {
        validatedData = createBranchSchema.parse({ address, latitude, longitude, name, phone });
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
    const branch = await db.branch.create({
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                branch,
            },
            message: "Branch created successfully",
        },
        { status: 201 },
    );
};

export const GET = async () => {
    const branches = await db.branch.findMany();
    return NextResponse.json({
        data: {
            branches,
        },
        message: "Branches fetched successfully",
    });
};

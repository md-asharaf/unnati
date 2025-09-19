import { db } from "@/lib/db";
import { CreateSetting, createSettingSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const { key, value } = await req.json() as CreateSetting;
    let validatedData;
    try {
        validatedData = createSettingSchema.parse({ key, value });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const setting = await db.setting.create({
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                setting
            },
            message: "Setting created successfully"
        },
        { status: 201 }
    );
}

export const GET = async (req: NextRequest) => {
    const settings = await db.setting.findMany()
    return NextResponse.json({
        data: {
            settings,
        },
        message: "settings fetched successfully",
    });
};

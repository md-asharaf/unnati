import { db } from "@/lib/db";
import { CreateSetting, createSettingSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const setting = await db.setting.findUnique({
        where: { id }
    });
    if (!setting) {
        return NextResponse.json(
            { error: "Setting not found" },
            { status: 404 }
        );
    }
    await db.setting.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Setting deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { key,value } = await req.json() as CreateSetting;
    let validatedData;
    try {
        validatedData = createSettingSchema.parse({ key,value });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const setting = await db.setting.findUnique({
        where: { id }
    });
    if (!setting) {
        return NextResponse.json(
            { error: "Setting not found" },
            { status: 404 }
        );
    }
    const updatedSetting = await db.setting.update({
        where: { id },
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                setting: updatedSetting
            },
            message: "Setting updated successfully"
        },
        { status: 200 }
    );
}
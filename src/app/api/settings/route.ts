import { db } from "@/lib/db";
import { CreateSetting, createSettingSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const body = await req.json() as CreateSetting;
    let validatedData;
    try {
        validatedData = createSettingSchema.parse(body);
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

export const DELETE = async () => {
    const setting = await db.setting.findFirst();
    if (!setting) {
        return NextResponse.json(
            { error: "Setting not found" },
            { status: 404 }
        );
    }
    await db.setting.delete({
        where: { id: setting.id }
    });
    return NextResponse.json(
        { message: "Setting deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest) => {
    const body = await req.json() as CreateSetting;
    let validatedData;
    try {
        validatedData = createSettingSchema.parse(body);
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const setting = await db.setting.findFirst();
    if (!setting) {
        return NextResponse.json(
            { error: "Setting not found" },
            { status: 404 }
        );
    }
    const updatedSetting = await db.setting.update({
        where: { id: setting.id },
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

export const GET = async () => {
    const setting = await db.setting.findFirst();
    if (!setting) {
        return NextResponse.json(
            { error: "Setting not found" },
            { status: 404 }
        );
    }
    return NextResponse.json(
        {
            data: {
                setting
            },
            message: "Setting fetched successfully"
        },
        { status: 200 }
    );
}

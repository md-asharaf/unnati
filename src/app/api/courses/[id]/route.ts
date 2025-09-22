import { db } from "@/lib/db";
import { CreateCourse, createCourseSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const course = await db.course.findUnique({
        where: { id }
    });
    if (!course) {
        return NextResponse.json(
            { error: "Course not found" },
            { status: 404 }
        );
    }
    await db.course.delete({
        where: { id }
    });
    return NextResponse.json(
        { message: "Course deleted successfully" },
        { status: 200 }
    );
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { description, duration, language, mode, subtitle, title, thumbnail } = await req.json() as CreateCourse;
    let validatedData;
    try {
        validatedData = createCourseSchema.parse({ description, duration, language, mode, subtitle, title, thumbnail });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const course = await db.course.findUnique({
        where: { id }
    });
    if (!course) {
        return NextResponse.json(
            { error: "Course not found" },
            { status: 404 }
        );
    }
    const updatedCourse = await db.course.update({
        where: { id },
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                course: updatedCourse
            },
            message: "Course updated successfully"
        },
        { status: 200 }
    );
}

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const course = await db.course.findUnique({
        where: { id },
    });
    if (!course) {
        return NextResponse.json(
            { error: "Course not found" },
            { status: 404 }
        );
    }
    return NextResponse.json({
        data: {
            course,
        },
        message: "Course fetched successfully",
    });
}
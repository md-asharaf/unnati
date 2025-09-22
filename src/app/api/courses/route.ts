import { db } from "@/lib/db";
import { CreateCourse, createCourseSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const { description, duration, language, mode, subtitle, title, thumbnail } = await req.json() as CreateCourse
    let validatedData;
    try {
        validatedData = createCourseSchema.parse({ description, duration, language, mode, subtitle, title, thumbnail });
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
    const course = await db.course.create({
        data: validatedData
    });
    return NextResponse.json(
        {
            data: {
                course,
            },
            message: "Course created successfully",
        },
        { status: 201 },
    );
};

export const GET = async (req: NextRequest) => {
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10", 10);
    const [courses, total] = await Promise.all([
        db.course.findMany({
            skip: (page - 1) * limit,
            take: limit,
        }),
        db.course.count(),
    ]);
    return NextResponse.json({
        data: {
            courses,
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit,
        },
        message: "courses fetched successfully",
    });
};

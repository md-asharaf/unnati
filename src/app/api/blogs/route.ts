import { db } from "@/lib/db";
import { createBlogSchema } from "@/schemas";
import uploadService from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const content = formData.get("content") as string;
    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const thumbnail = formData.get("thumbnail") as File;
    let validatedData;
    try {
        validatedData = createBlogSchema.parse({ content, slug, thumbnail, title });
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
    // upload thumbnail 
    const arrayBuffer = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { id, url } = await uploadService.uploadBuffer(buffer, thumbnail.type);
    const image = await db.image.create({
        data: {
            type: "BLOG",
            url,
            id,
        }
    })
    const blog = await db.blog.create({
        data: {
            content: validatedData.content,
            slug: validatedData.slug,
            title: validatedData.title,
            imageId: image.id,
        },
        include: {
            thumbnail: true
        }
    });
    return NextResponse.json(
        {
            data: {
                blog,
            },
            message: "Blog created successfully",
        },
        { status: 201 },
    );
};

export const GET = async (req: NextRequest) => {
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10", 10);
    const [blogs, total] = await Promise.all([
        db.blog.findMany({
            skip: (page - 1) * limit,
            take: limit,
        }),
        db.blog.count(),
    ]);
    return NextResponse.json({
        data: {
            blogs,
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit,
        },
        message: "blogs fetched successfully",
    });
};

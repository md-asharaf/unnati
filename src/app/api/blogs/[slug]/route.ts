import { db } from "@/lib/db";
import { updateBlogSchema } from "@/schemas";
import uploadService from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const blog = await db.blog.findUnique({
        where: { slug },
        include: { thumbnail: true }
    });
    if (!blog) {
        return NextResponse.json(
            { error: "Blog not found" },
            { status: 404 }
        );
    }
    await db.blog.delete({
        where: { slug }
    });
    // delete image
    await uploadService.delete(blog.thumbnail?.id as string);
    await db.image.delete({
        where: { id: blog.thumbnail?.id }
    })
    return NextResponse.json(
        { message: "Blog deleted successfully" },
        { status: 200 }
    );
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const formData = await req.formData();
    const content = formData.get("content") as string;
    const newSlug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const thumbnail = formData.get("thumbnail") as File | null  || undefined;
    let validatedData;
    try {
        validatedData = updateBlogSchema.parse({ content, slug: newSlug, thumbnail, title });
    } catch (error) {
        return NextResponse.json(
            { error: (error as z.ZodError).issues.map((issue) => issue.message).join(", ") },
            { status: 400 }
        )
    }
    const blog = await db.blog.findUnique({
        where: { slug },
        include: { thumbnail: true }
    });
    if (!blog) {
        return NextResponse.json(
            { error: "Blog not found" },
            { status: 404 }
        );
    }
    let image;
    if (thumbnail) {
        // upload thumbnail
        const arrayBuffer = await thumbnail.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const { id, url } = await uploadService.uploadBuffer(buffer, thumbnail.type);
        image = await db.image.create({
            data: {
                type: "BLOG",
                url,
                id,
            }
        })
    }
    const updatedBlog = await db.blog.update({
        where: { slug },
        data: {
            content: validatedData.content,
            slug: validatedData.slug,
            title: validatedData.title,
            imageId: image?.id || undefined
        },
        include: { thumbnail: true }
    });
    if (image) {
        // delete old image
        await uploadService.delete(blog.thumbnail?.id as string);
        await db.image.delete({
            where: { id: blog.thumbnail?.id }
        })
    }
    return NextResponse.json(
        {
            data: {
                blog: updatedBlog
            },
            message: "Blog updated successfully"
        },
        { status: 200 }
    );
}
import { db } from "@/lib/db";
import { updateCompanySchema } from "@/schemas";
import uploadService from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const company = await db.image.findUnique({ where: { id } });
    if (!company) {
        return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }
    await db.company.delete({ where: { id } });
    return NextResponse.json({ message: "Company deleted successfully" })
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const formData = await req.formData();
    const logo = formData.get("logo") as File | null | undefined;
    const name = formData.get("name") as string;
    const isPremium = formData.get("isPremium") === "true";
    let validatedData;
    try {
        validatedData = updateCompanySchema.parse({ name, isPremium, logo });
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
    const company = await db.company.findUnique({
        where: { id },
        include: { logo: true }
    });
    if (!company) {
        return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }
    let image;
    if (validatedData.logo) {
        // upload thumbnail
        const arrayBuffer = await validatedData.logo.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const { id, url } = await uploadService.uploadBuffer(buffer, validatedData.logo.type);
        image = await db.image.create({
            data: {
                type: "BLOG",
                url,
                id,
            }
        })
    }
    const updatedCompany = await db.company.update({
        where: { id },
        data: {
            name: validatedData.name,
            isPremium: validatedData.isPremium,
            imageId: image?.id || undefined,
        },
        include: {
            logo: true
        }
    })

    if (image) {
        // delete old image
        await uploadService.delete(company.logo?.id as string);
        await db.image.delete({
            where: { id: company.logo?.id }
        })
    }
    return NextResponse.json({
        data: {
            company: updatedCompany
        }, message: "Company image uploaded successfully"
    });
}
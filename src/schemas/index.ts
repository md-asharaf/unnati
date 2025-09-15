import { z } from "zod";

export const imageTypeSchema = z.enum(["HERO", "LOGO", "PARTNER", "BLOG"]);

export const adminSchema = z.object({
    id: z.uuid(),
    email: z.email(),
    name: z.string(),
})

export const imageSchema = z.object({
    id: z.string(),
    url: z.url(),
    type: imageTypeSchema,
    createdAt:z.date(),
    updatedAt:z.date(),
})

export const loginSchema = z.object({
    email: z.email("invalid email format"),
});

export const verifyLoginSchema = z.object({
    email: z.email("invalid email format"),
    otp: z
        .string()
        .min(6)
        .max(6)
        .regex(/^\d+$/, "OTP must be a 6-digit number"),
});

export type Admin = z.infer<typeof adminSchema>;

export type Image = z.infer<typeof imageSchema>;

export type VerifyLogin = z.infer<typeof verifyLoginSchema>;

export type Login = z.infer<typeof loginSchema>;

export type ImageType = z.infer<typeof imageTypeSchema>;

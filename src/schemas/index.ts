import { z } from "zod";

export const imageTypeSchema = z.enum(["HERO", "LOGO", "PARTNER", "BLOG"]);

export const adminSchema = z.object({
    id: z.uuid(),
    email: z.email(),
    name: z.string(),
});

export const imageSchema = z.object({
    id: z.string(),
    url: z.url(),
    type: imageTypeSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const faqSchema = z.object({
    id: z.string(),
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
    topic: z.string().min(1, "Topic is required"),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const topicSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createTopicSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export const createFaqSchema = z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
    topicId: z.string().min(1, "Topic ID is required"),
});

export const blogSchema = z.object({
    slug: z.string(),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    imageId: z.string().min(1, "Image ID is required"),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createBlogSchema = z.object({
    slug: z.string().min(1, "Slug is required"),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    thumbnail: z.instanceof(File),
});

export const updateBlogSchema = createBlogSchema.omit({ thumbnail: true }).and(z.object({
    thumbnail: z.instanceof(File).optional(),
}));

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

export type FAQ = z.infer<typeof faqSchema>;
export type CreateFAQ = z.infer<typeof createFaqSchema>;

export type Topic = z.infer<typeof topicSchema>;
export type CreateTopic = z.infer<typeof createTopicSchema>;

export type Blog = z.infer<typeof blogSchema>;
export type CreateBlog = z.infer<typeof createBlogSchema>;
export type UpdateBlog = z.infer<typeof updateBlogSchema>;

export type VerifyLogin = z.infer<typeof verifyLoginSchema>;

export type Login = z.infer<typeof loginSchema>;

export type ImageType = z.infer<typeof imageTypeSchema>;

import { z } from "zod";
// Image
export const imageTypeSchema = z.enum(["HERO", "LOGO", "PARTNER", "BLOG"]);

export const imageSchema = z.object({
    id: z.uuid(),
    url: z.url(),
    type: imageTypeSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Company
export const companySchema = z.object({
    id: z.uuid(),
    name: z.string(),
    isPremium: z.boolean(),
    imageId: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    // Relations
    logo: imageSchema,
});

export const createCompanySchema = z.object({
    name: z.string().min(1, "Name is required"),
    isPremium: z.boolean().optional().default(false),
    imageId: z.uuid(),
});

// Placement
export const placementSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    role: z.string(),
    photoUrl: z.url().optional(),
    companyId: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    company: companySchema
});

export const createPlacementSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    photoUrl: z.url().optional(),
    companyId: z.uuid(),
});
// Testimonial
export const testimonialSchema = z.object({
    id: z.uuid(),
    content: z.string(),
    rating: z.number().int(),
    placementId: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    placement: placementSchema,
});

export const createTestimonialSchema = z.object({
    content: z.string().min(1, "Content is required"),
    rating: z.number().int().min(1).max(5),
    placementId: z.uuid(),
});


// Course
export const courseSchema = z.object({
    id: z.uuid(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    duration: z.string(),
    language: z.array(z.string()),
    mode: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createCourseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required"),
    description: z.string().min(1, "Description is required"),
    duration: z.string().min(1, "Duration is required"),
    language: z.array(z.string().min(1)),
    mode: z.array(z.string().min(1)),
});

// Usp
export const uspSchema = z.object({
    id: z.uuid(),
    heading: z.string(),
    subheading: z.string(),
    bulletPoints: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createUspSchema = z.object({
    heading: z.string().min(1, "Heading is required"),
    subheading: z.string().min(1, "Subheading is required"),
    bulletPoints: z.array(z.string().min(1)),
});

// Settings
export const settingsSchema = z.object({
    id: z.uuid(),
    key: z.string(),
    value: z.string(),
    description: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createSettingsSchema = z.object({
    key: z.string().min(1, "Key is required"),
    value: z.string().min(1, "Value is required"),
    description: z.string().optional(),
});


// Topic
export const topicSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Faq
export const faqSchema = z.object({
    id: z.uuid(),
    question: z.string(),
    answer: z.string(),
    topic: topicSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Admin
export const adminSchema = z.object({
    id: z.uuid(),
    email: z.email(),
    name: z.string(),
});

// Branch
export const branchSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Trainer
export const trainerSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    bio: z.string().optional(),
    expertise: z.string(),
    experience: z.string(),
    designation: z.string(),
    photoUrl: z.url(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Blog
export const blogSchema = z.object({
    slug: z.string(),
    title: z.string(),
    content: z.string(),
    imageId: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    // Relations
    thumbnail: imageSchema,
});

// Auth
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

// Create Schemas
export const createTopicSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export const createFaqSchema = z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
    topicId: z.uuid().min(1, "Topic ID is required"),
});

export const createBlogSchema = z.object({
    slug: z.string().min(1, "Slug is required"),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    thumbnail: z.file(),
});

export const createBranchSchema = z.object({
    address: z.string().min(1, "Address is required"),
    name: z.string().min(1, "Branch name is required"),
    phone: z.string().min(1, "Phone is required"),
    latitude: z.number(),
    longitude: z.number(),
});

export const createTrainerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    bio: z.string().optional(),
    expertise: z.string().min(1, "Expertise is required"),
    experience: z.string().min(1, "Experience is required"),
    designation: z.string().min(1, "Designation is required"),
    photoUrl: z.url(),
});

// Update Schemas
export const updateBlogSchema = createBlogSchema.omit({ thumbnail: true }).and(z.object({
    thumbnail: z.file().optional(),
}));

// Type Inference
export type Admin = z.infer<typeof adminSchema>;

export type Image = z.infer<typeof imageSchema>;

export type Faq = z.infer<typeof faqSchema>;
export type CreateFaq = z.infer<typeof createFaqSchema>;

export type Topic = z.infer<typeof topicSchema>;
export type CreateTopic = z.infer<typeof createTopicSchema>;

export type Blog = z.infer<typeof blogSchema>;
export type CreateBlog = z.infer<typeof createBlogSchema>;
export type UpdateBlog = z.infer<typeof updateBlogSchema>;

export type Branch = z.infer<typeof branchSchema>;
export type CreateBranch = z.infer<typeof createBranchSchema>;

export type Trainer = z.infer<typeof trainerSchema>;
export type CreateTrainer = z.infer<typeof createTrainerSchema>;

export type VerifyLogin = z.infer<typeof verifyLoginSchema>;

export type Login = z.infer<typeof loginSchema>;

export type ImageType = z.infer<typeof imageTypeSchema>;

export type Company = z.infer<typeof companySchema>;
export type CreateCompany = z.infer<typeof createCompanySchema>;

export type Placement = z.infer<typeof placementSchema>;
export type CreatePlacement = z.infer<typeof createPlacementSchema>;

export type Testimonial = z.infer<typeof testimonialSchema>;
export type CreateTestimonial = z.infer<typeof createTestimonialSchema>;

export type Course = z.infer<typeof courseSchema>;
export type CreateCourse = z.infer<typeof createCourseSchema>;

export type Usp = z.infer<typeof uspSchema>;
export type CreateUsp = z.infer<typeof createUspSchema>;

export type Settings = z.infer<typeof settingsSchema>;
export type CreateSettings = z.infer<typeof createSettingsSchema>;

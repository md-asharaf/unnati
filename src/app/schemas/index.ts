import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email("invalid email format"),
});

export const VerifyLoginSchema = z.object({
    email: z.email("invalid email format"),
    otp: z
        .string()
        .min(6)
        .max(6)
        .regex(/^\d+$/, "OTP must be a 6-digit number"),
});
export type VerifyLogin = z.infer<typeof VerifyLoginSchema>;

export type Login = z.infer<typeof LoginSchema>;

import * as z from "zod";

export const EmailSchema = z.object({
    email: z.string().trim().email('Please enter a valid email address'),
});
export const LoginSchema = z.object({
    email: z.string().trim().email('Please enter a valid email address'),
    otp: z.string().trim()
        .min(6, 'OTP must be 6 digits')
        .max(6, 'OTP must be 6 digits')
        .regex(/^\d+$/, 'OTP must contain only numbers')
        .optional()
});

import * as z from "zod";

export const LoginEmailSchema = z.object({
    email: z.string().trim().email("Please enter a valid email address")

})
export const SignupEmailSchema = z.object({
    email: z.string().trim().email("Please enter a valid email address"),
    name: z.string().trim()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    agreeToTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and privacy policy.",
    })

});


export const LoginSchema = z.object({
    email: z.string().trim().email('Please enter a valid email address'),
    otp: z.string().trim()
        .min(6, 'OTP must be 6 digits')
        .max(6, 'OTP must be 6 digits')
        .regex(/^\d+$/, 'OTP must contain only numbers')
});



export const SignUpSchema = z.object({
    email: z.string().trim().email('Please enter a valid email address'),
    name: z.string().trim()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    otp: z.string().trim()
        .min(6, 'OTP must be 6 digits')
        .max(6, 'OTP must be 6 digits')
        .regex(/^\d+$/, 'OTP must contain only numbers'),
    agreeToTerms: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must agree to the terms and privacy policy.",
        }),
})
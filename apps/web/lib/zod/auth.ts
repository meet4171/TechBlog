import * as z from "zod";

export const LoginEmailSchema = z.object({
    email: z.string().trim().email("Please enter a valid email address")

})

export const LoginSchema = z.object({
    email: z.string().trim().email('Please enter a valid email address'),
    otp: z.string().trim()
        .min(6, 'OTP must be 6 digits')
        .max(6, 'OTP must be 6 digits')
        .regex(/^\d+$/, 'OTP must contain only numbers')
});


export const SendOtpSchema = z.object({
    email: z.string().trim().email("Please enter a valid email address"),
    name: z.string().trim()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    agreeToTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and privacy policy.",
    })

});
export const VerifyOtpSchema = z.object({
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

export const PasswordSchema = z
    .object({
        email: z.string().trim().email('Please enter a valid email address'),
        name: z.string().trim()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be less than 50 characters'),
        password: z
            .string()
            .min(8, { message: 'Minimum length should be 8 characters' })
            .max(20, { message: 'Maximum length should be 14 characters' })
            .refine((val) => !/\s/.test(val), {
                message: 'Password must not contain spaces',
            })
            .refine((val) => /[A-Z]/.test(val), {
                message: 'At least one uppercase letter required A-Z',
            })
            .refine((val) => /[a-z]/.test(val), {
                message: 'At least one lowercase letter required a-z',
            })
            .refine((val) => /[0-9]/.test(val), {
                message: 'At least one number required 0-9',
            })
            .refine((val) => /[!@#$%^&*]/.test(val), {
                message: 'At least one special character required !@#$%^&*',
            }),

        confirmPassword: z.string(),
        agreeToTerms: z
            .boolean()
            .refine((val) => val === true, {
                message: "You must agree to the terms and privacy policy.",
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });





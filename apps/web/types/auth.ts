import { LoginEmailSchema, LoginSchema, SignupEmailSchema, SignUpSchema } from '@/lib/zod/auth';
import { ReactNode } from 'react';
import * as z from 'zod';


export type VerifyLoginEmail = z.infer<typeof LoginEmailSchema>;
export type VerifySignupEmail = z.infer<typeof SignupEmailSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type SignupData = z.infer<typeof SignUpSchema>;


// Dynamic FormData Based on stage(otp or verification)
export type SignupFormData = VerifySignupEmail & Partial<SignupData>;
export type LoginFormData = VerifyLoginEmail & Partial<LoginData>;

export type AuthContextType = {
    accessToken: string | null;
    userId: string | null;
    setAuth: (accessToken: string, userId: string) => void;
    clearAuth: () => void;
};

export type AuthProviderProps = {
    children: ReactNode;
};



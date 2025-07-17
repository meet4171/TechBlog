import { LoginEmailSchema, LoginSchema, SignupEmailSchema, SignUpSchema } from '@/lib/zod/auth';
import { User } from '@/types/data';
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
    user: User | null;
    initialCheckComplete: boolean;
    setUser: (user: User | null) => void;
    loadUser: () => Promise<void>;
    logout: () => Promise<void>;
};
export type AuthProviderProps = {
    children: ReactNode;
};



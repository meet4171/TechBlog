import { LoginEmailSchema, LoginSchema, PasswordSchema, SendOtpSchema, VerifyOtpSchema } from '@/lib/zod/auth';
import { User } from '@/types/data';
import { ReactNode } from 'react';
import * as z from 'zod';


export type VerifyLoginEmail = z.infer<typeof LoginEmailSchema>;
export type LoginData = z.infer<typeof LoginSchema>;




// signup data
export type SendOtp = z.infer<typeof SendOtpSchema>;
export type VerfiyOtp = z.infer<typeof VerifyOtpSchema>;
export type Password = z.infer<typeof PasswordSchema>;

export type SignupData = SendOtp | VerfiyOtp | Password;


// Dynamic FormData Based on stage(otp or verification)
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



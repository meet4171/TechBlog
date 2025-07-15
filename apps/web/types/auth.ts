import { EmailSchema, LoginSchema } from '@/lib/zod/auth';
import { ReactNode } from 'react';
import * as z from 'zod';

export type LoginData = z.infer<typeof LoginSchema>;
export type Email = z.infer<typeof EmailSchema>;

export type AuthContextType = {
    accessToken: string | null;
    userId: string | null;
    setAuth: (token: string, userId: string) => void;
    clearAuth: () => void;
};

export type AuthProviderProps = {
    children: ReactNode;
};

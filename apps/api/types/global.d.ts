import * as express from 'express';

declare global {
    type GenerateJwtPayload = {
        id: number;
        email: string;
        role: string;
    };

    type LoginResTokens = {
        id: number;
        access_token: string;
        refresh_token: string;
    };

    type RefreshAceessToken = {
        id: number;
        email: string;
        role: string;
    };

    type AuthResponse = {
        id: number;
        access_token: string;
    };

    type SendOtp = {
        email: string;
        otp: string;
    };

    type MailSent = {
        expiresAt: number;
        message: string;
    };
}

declare module 'express' {
    export interface Request {
        user?: GenerateJwtPayload;
    }
}

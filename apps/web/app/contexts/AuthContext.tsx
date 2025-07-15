'use client';

import { AuthContextType, AuthProviderProps } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { createContext, useState, ReactElement, useEffect } from 'react';



export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);




    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const id = localStorage.getItem('userId');
        if (token && id) {
            setAccessToken(token);
            setUserId(id);
        }
    }, []);

    const setAuth = (token: string, userId: string) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userId', userId.toString());
        setAccessToken(token);
        setUserId(userId);
    };

    const clearAuth = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        setAccessToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ accessToken, userId, setAuth, clearAuth }
        }>
            {children}
        </AuthContext.Provider>
    );
};


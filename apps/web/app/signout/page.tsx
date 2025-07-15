'use client';

import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/lib/api/auth';

export default function SignOutPage() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { clearAuth, accessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            try {
                setLoading(true);
                logout(accessToken);

            } catch (error) {
                console.log(error);

            } finally {
                clearAuth();
                setLoading(false);
                router.push('/');
            }
        }
    }, []);

    return null;
}

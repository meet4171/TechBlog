'use client';

import { useEffect, useContext, useState } from 'react';
import { logout } from '@/lib/api/auth';
import { useAuth } from '@/app/contexts/AuthContext';

export default function SignOutPage() {

    const { user, setCurrentUser } = useAuth();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setLoading(true);
            try {

                logout();

            } catch (error) {
                console.log(error);

            } finally {
                setCurrentUser(null);
                setLoading(false);
            }
        }
    }, []);

    return null;
}

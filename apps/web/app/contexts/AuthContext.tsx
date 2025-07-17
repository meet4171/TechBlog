'use client';

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { authenticateUser } from '@/lib/api/auth';
import { JwtPayload } from '@/types/data';
import Loader from '@/components/Loader';

type AuthContextType = {
    user: JwtPayload | null;
    loading: boolean;
    authUser: () => Promise<void>;
    setCurrentUser: (user: JwtPayload | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicPaths = ['/', '/contact', '/login', '/signup'];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<JwtPayload | null>(null);
    const [loading, setLoading] = useState(true); // Start with true
    const pathname = usePathname();

    const isPublicPath = publicPaths.includes(pathname);

    const setCurrentUser = (user: JwtPayload | null) => {
        setUser(user);
    };

    const authUser = useCallback(async () => {
        if (isPublicPath) {
            setLoading(false); // Don't trigger loader for public pages
            return;
        }

        try {
            const user = await authenticateUser();
            setUser(user);
        } catch (error: any) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [isPublicPath]);

    useEffect(() => {
        authUser();
    }, [authUser]);

    return (
        <AuthContext.Provider value={{ user, loading, authUser, setCurrentUser }}>
            {/* Only show loader if private route */}
            {loading && !isPublicPath ? <Loader /> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

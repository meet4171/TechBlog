'use client';

import { ToastContainer } from 'react-toastify';
import ScrollToTopButton from '@/components/ScrollToTop';
import { useEffect, useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import Loader from '@/components/Loader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        setIsMounted(true);

        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>

            {showLoader && <Loader />}
            <div className={`${showLoader ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={resolvedTheme}
                />
                {children}
                <ScrollToTopButton />
            </div>
        </>
    );
}
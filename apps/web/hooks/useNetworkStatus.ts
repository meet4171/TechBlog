'use client '
import { useEffect, useState } from 'react';

export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const updateNetworkStatus = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);

        updateNetworkStatus();

        return () => {
            window.removeEventListener('online', updateNetworkStatus);
            window.removeEventListener('offline', updateNetworkStatus);
        };
    }, []);

    return isOnline;
}

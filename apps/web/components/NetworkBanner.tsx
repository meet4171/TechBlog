'use client'
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";

export default function NetworkBanner() {
    const isOnline = useNetworkStatus();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isOnline) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isOnline]);

    if (!isVisible) return null;

    return (
        <div className={`
            sticky top-0 left-0 right-0 z-[100] 
            py-2 px-4 text-center 
            animate-in fade-in slide-in-from-top duration-200
            flex items-center justify-center gap-2
            ${isOnline ?
                'bg-green-600 text-white' :
                'bg-yellow-500 text-gray-900'}
            shadow-md
        `}>
            {isOnline ? (
                <>
                    <Wifi className="h-4 w-4" />
                    <span>Connection restored!</span>
                </>
            ) : (
                <>
                    <WifiOff className="h-4 w-4" />
                    <span>You're offline. Some features may not work.</span>
                </>
            )}
        </div>
    );
}
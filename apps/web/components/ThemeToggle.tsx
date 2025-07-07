'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function ThemeToggle() {
    const { theme, resolvedTheme, setTheme } = useTheme();

    const handleToggle = () => {
        // Always toggle between light and dark, ignoring system after first interaction
        const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <button
            onClick={handleToggle}
            className="relative inline-flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
        >
            {/* Toggle Background */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-opacity duration-300 ${resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'
                }`} />

            {/* Toggle Circle */}
            <div
                className={`relative flex items-center justify-center w-5 h-5 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform duration-300 ${resolvedTheme === 'dark' ? 'translate-x-3' : '-translate-x-3'
                    }`}
            >
                {resolvedTheme === 'light' ? (
                    <Sun className="w-3 h-3 text-yellow-500" />
                ) : (
                    <Moon className="w-3 h-3 text-blue-400" />
                )}
            </div>

            {/* Background Icon - Shows opposite of current */}
            {resolvedTheme === 'dark' ? (
                <Sun className="absolute left-1 w-3 h-3 text-yellow-400 opacity-60 transition-opacity duration-300" />
            ) : (
                <Moon className="absolute right-1 w-3 h-3 text-blue-300 opacity-60 transition-opacity duration-300" />
            )}
        </button>
    );
}
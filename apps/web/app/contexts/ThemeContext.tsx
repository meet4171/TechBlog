'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Initialize theme
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Get current system theme
        const getSystemTheme = (): 'light' | 'dark' => {
            return mediaQuery.matches ? 'dark' : 'light';
        };

        // Set initial theme
        const initialTheme = savedTheme || 'system';
        const initialResolvedTheme = initialTheme === 'system' ? getSystemTheme() : initialTheme;

        setThemeState(initialTheme);
        setResolvedTheme(initialResolvedTheme);
        applyTheme(initialResolvedTheme);
        setMounted(true);

        // Listen for system theme changes
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            if (theme === 'system') {
                setResolvedTheme(newSystemTheme);
                applyTheme(newSystemTheme);
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    const applyTheme = (themeToApply: 'light' | 'dark') => {
        if (themeToApply === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const setTheme = (newTheme: Theme) => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const currentSystemTheme = mediaQuery.matches ? 'dark' : 'light';

        const newResolvedTheme = newTheme === 'system' ? currentSystemTheme : newTheme;

        setThemeState(newTheme);
        setResolvedTheme(newResolvedTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newResolvedTheme);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    if (!mounted) {
        return <div className="h-screen w-screen" />;
    }

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
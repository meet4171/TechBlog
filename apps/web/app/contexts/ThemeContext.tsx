'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    isMounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'system',
    resolvedTheme: 'light',
    toggleTheme: () => { },
    setTheme: () => { },
    isMounted: false,
});


export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
    const [isMounted, setIsMounted] = useState(false);

    // Memoized theme application
    const applyTheme = useCallback((themeToApply: ResolvedTheme) => {
        const root = document.documentElement;
        if (themeToApply === 'dark') {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
        } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
        }
        root.style.backgroundColor = themeToApply === 'dark' ? '#000000' : '#ffffff';
    }, []);

    // Initialize theme on mount
    useEffect(() => {
        const initializeTheme = () => {
            try {
                const savedTheme = localStorage.getItem('theme') as Theme | null;
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

                const getSystemTheme = (): ResolvedTheme => mediaQuery.matches ? 'dark' : 'light';
                const initialTheme = savedTheme || 'system';
                const initialResolvedTheme = initialTheme === 'system' ? getSystemTheme() : initialTheme;

                setThemeState(initialTheme);
                setResolvedTheme(initialResolvedTheme);
                applyTheme(initialResolvedTheme);
                setIsMounted(true);

                const handleSystemThemeChange = (e: MediaQueryListEvent) => {
                    if (theme === 'system') {
                        const newTheme = e.matches ? 'dark' : 'light';
                        setResolvedTheme(newTheme);
                        applyTheme(newTheme);
                    }
                };

                mediaQuery.addEventListener('change', handleSystemThemeChange);
                return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
            } catch (e) {
                console.error('Theme initialization error:', e);
                setIsMounted(true);
            }
        };

        // Delay initialization slightly to prevent flash
        const timer = setTimeout(initializeTheme, 50);
        return () => clearTimeout(timer);
    }, [theme, applyTheme]);

    const setTheme = useCallback((newTheme: Theme) => {
        try {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const newResolvedTheme = newTheme === 'system'
                ? (mediaQuery.matches ? 'dark' : 'light')
                : newTheme;

            setThemeState(newTheme);
            setResolvedTheme(newResolvedTheme);
            localStorage.setItem('theme', newTheme);
            applyTheme(newResolvedTheme);
        } catch (e) {
            console.error('Failed to set theme:', e);
        }
    }, [applyTheme]);

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }, [theme, setTheme]);

    // Prevent flash of unstyled content
    if (!isMounted) {
        return (
            <div style={{ visibility: 'hidden' }}>
                {children}
            </div>
        );
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            resolvedTheme,
            toggleTheme,
            setTheme,
            isMounted
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (process.env.NODE_ENV !== 'production' && context === undefined) {
        console.warn('useTheme must be used within a ThemeProvider');
        return {
            theme: 'light',
            resolvedTheme: 'light',
            toggleTheme: () => { },
            setTheme: () => { },
            isMounted: true,
        };
    }
    return context;
}
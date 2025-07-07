import '@/app/styles/globals.css'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import ScrollToTopButton from '@/components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlogSpace - Share Your Stories',
  description: 'A modern platform for sharing ideas, stories, and insights. Join our community of passionate writers and readers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navigation />
            <main className="flex-grow">
              {children}
              <ScrollToTopButton />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
import '@/app/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import ScrollToTopButton from '@/components/ScrollToTop';
import { AuthProvider } from '@/app/contexts/AuthContext';
import NetworkBanner from '@/components/NetworkBanner';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'BlogSpace - Share Your Stories',
  description:
    'A modern platform for sharing ideas, stories, and insights. Join our community of passionate writers and readers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground transition-colors duration-300 scroll-smooth`}
      >
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <NetworkBanner />
              <Navigation />
              <main className="flex-grow">
                {children}
                <ScrollToTopButton />
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

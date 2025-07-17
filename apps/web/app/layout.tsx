import '@/app/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins, Bungee } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import NetworkBanner from '@/components/NetworkBanner';
import ClientLayout from '@/components/ClientLayout';
import { AuthProvider } from '@/app/contexts/AuthContext';



const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-poppins' });
const bungee = Bungee({ weight: '400', variable: '--font-bungee', display: 'swap', style: 'normal', subsets: ['latin'] })


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
      <head>
        {/* This is safe: inserted before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>

      <body className={`${inter.className} ${poppins.variable} ${bungee.variable} bg-background text-foreground transition-colors duration-300 scroll-smooth`}>
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <ClientLayout>
                <NetworkBanner />
                <Navigation />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </ClientLayout>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}

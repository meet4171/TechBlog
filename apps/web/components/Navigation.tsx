'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, PenTool, Home, LogIn, UserPlus, Edit } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-card shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <PenTool className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-foreground">BlogSpace</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {[
                { href: '/', label: 'Home', icon: Home },
                { href: '/create-post', label: 'Write', icon: Edit },
                { href: '/profile', label: 'Profile', icon: User },
                { href: '/login', label: 'Login', icon: LogIn }
              ].map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  <Icon className="inline h-4 w-4 mr-1" />
                  {label}
                </Link>
              ))}

              <Link
                href="/signup"
                className=" text-white bg-btn-blue hover:bg-btn-blue-hover px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <UserPlus className="inline h-4 w-4 mr-1" />
                Sign Up
              </Link>

              <div className="flex items-center ml-4">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {[
                { href: '/', label: 'Home', icon: Home },
                { href: '/create-post', label: 'Write', icon: Edit },
                { href: '/profile', label: 'Profile', icon: User },
                { href: '/login', label: 'Login', icon: LogIn }
              ].map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={toggleMenu}
                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  <Icon className="inline h-4 w-4 mr-2" />
                  {label}
                </Link>
              ))}

              <Link
                href="/signup"
                onClick={toggleMenu}
                className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                <UserPlus className="inline h-4 w-4 mr-2" />
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

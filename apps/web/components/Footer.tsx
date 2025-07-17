'use client';

import Link from 'next/link';
import { PenTool, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-card text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <PenTool className="h-8 w-8 text-blue-400 dark:text-blue-300" />
                <span className="text-2xl font-bold text-logo-color">BlogSpace</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500 mb-4 max-w-md">
                A modern platform for sharing ideas, stories, and insights. Join our community of passionate writers and readers.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="footer-link">Home</Link></li>
                <li><Link href="/about" className="footer-link">About</Link></li>
                <li><Link href="/contact" className="footer-link">Contact</Link></li>
                <li><Link href="/terms-privacy-policy" className="footer-link">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Account</h3>
              <ul className="space-y-2">
                <li><Link href="/login" className="footer-link">Login</Link></li>
                <li><Link href="/signup" className="footer-link">Sign Up</Link></li>
                <li><Link href="/profile" className="footer-link">Profile</Link></li>
              </ul>
            </div>
          </div>
        ) : (
          // Guest Footer: two columns only
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <PenTool className="h-8 w-8 text-logo-color" />
                <span className="text-2xl font-bold text-logo-color">BlogSpace</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500 mb-4 max-w-md">
                A modern platform for sharing ideas, stories, and insights. Join our community of passionate writers and readers.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200"><Github className="h-5 w-5" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200"><Mail className="h-5 w-5" /></a>
              </div>
            </div>

            {/* Guest Links */}
            <div className="md:text-right">
              <h3 className="text-lg font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="footer-link">About</Link></li>
                <li><Link href="/contact" className="footer-link">Contact</Link></li>
                <li><Link href="/terms-privacy-policy" className="footer-link">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        )}

        {/* Bottom Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-700 text-center">
          <p className="text-gray-400 dark:text-gray-500">
            © 2025 BlogSpace. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

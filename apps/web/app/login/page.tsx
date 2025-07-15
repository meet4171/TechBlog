"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { accessToken, userId } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (accessToken && userId) {
      router.replace('/');
    }
  }, [accessToken, userId, router]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
      </div>

      <LoginForm />
    </div>
  );
}
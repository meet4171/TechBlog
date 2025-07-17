"use client";

import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
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
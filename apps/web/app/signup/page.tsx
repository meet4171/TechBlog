'use client';

import CombinedSignupForm from "@/components/SignupForm";

export default function SignUp() {




    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-widest text-gray-heading font-bungee">Join BlogSpace</h2>
                    <p className="mt-2 text-sm text-gray-subheading">
                        Create your account and start sharing your stories
                    </p>
                </div>
            </div>

            <CombinedSignupForm />
        </div>
    );
}

'use client';

import Link from 'next/link';

export default function TermsAndPrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-foreground">
            <h1 className="text-3xl font-bold mb-6">Terms of Service & Privacy Policy</h1>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">1. Terms of Service</h2>
                <p className="mb-4 text-sm leading-7">
                    By accessing and using our platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, you should not use our services.
                </p>

                <h3 className="text-lg font-medium mb-1">User Responsibilities</h3>
                <p className="mb-4 text-sm leading-7">
                    You agree not to use the platform for any unlawful purpose or any purpose prohibited by these Terms. You are responsible for all activities that occur under your account.
                </p>

                <h3 className="text-lg font-medium mb-1">Content Ownership</h3>
                <p className="mb-4 text-sm leading-7">
                    You retain ownership of any content you post. However, by posting content, you grant us a license to use, distribute, modify, and publicly display such content.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">2. Privacy Policy</h2>
                <p className="mb-4 text-sm leading-7">
                    Your privacy is important to us. This policy outlines how we collect, use, and safeguard your information.
                </p>

                <h3 className="text-lg font-medium mb-1">Information We Collect</h3>
                <p className="mb-4 text-sm leading-7">
                    We may collect personal information such as name, email address, and usage data when you interact with our services.
                </p>

                <h3 className="text-lg font-medium mb-1">How We Use Information</h3>
                <p className="mb-4 text-sm leading-7">
                    Your information is used to provide and improve our services, respond to inquiries, and send important updates.
                </p>

                <h3 className="text-lg font-medium mb-1">Data Security</h3>
                <p className="mb-4 text-sm leading-7">
                    We take reasonable precautions to protect your information from unauthorized access and disclosure.
                </p>
            </section>

            <footer className="text-sm text-muted-foreground">
                Last updated: July 2025. If you have any questions, please <Link href="/contact" className="underline text-blue-600">contact us</Link>.
            </footer>
        </div>
    );
}

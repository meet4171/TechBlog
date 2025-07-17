'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto w-full">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="font-bungee tracking-widest font-light text-4xl text-gray-heading">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-base text-gray-subheading">
                        Have a question or need help? We&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start space-x-6">
                            <Mail className="h-6 w-6 text-blue-500 mt-1" />
                            <div>
                                <p className="font-medium text-lg text-foreground">Email</p>
                                <p className="mt-1 text-muted-foreground">support@blogspace.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-6">
                            <Phone className="h-6 w-6 text-blue-500 mt-1" />
                            <div>
                                <p className="font-medium text-lg text-foreground">Phone</p>
                                <p className="mt-1 text-muted-foreground">+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-6">
                            <MapPin className="h-6 w-6 text-blue-500 mt-1" />
                            <div>
                                <p className="font-medium text-lg text-foreground">Address</p>
                                <p className="mt-1 text-muted-foreground">
                                    123 Main Street, Limbdi<br />
                                    Gujarat, India
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form className="space-y-6 bg-card p-8 rounded-lg border border-border shadow-sm">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                placeholder="Write your message here..."
                                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
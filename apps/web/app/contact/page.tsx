'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-foreground">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <p className="mb-10 text-muted-foreground">
                Have a question or need help? We'd love to hear from you. Fill out the form below or reach us directly.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-blue-500" />
                        <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">support@example.com</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-blue-500" />
                        <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-blue-500" />
                        <div>
                            <p className="font-medium">Address</p>
                            <p className="text-sm text-muted-foreground">123 Main Street, Limbdi, Gujarat, India</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-4 bg-card py-8 px-4 shadow-md sm:rounded-lg sm:px-10 border border-border">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            className="mt-1 block w-full rounded-md border border-border bg-background px-4 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="mt-1 block w-full rounded-md border border-border bg-background px-4 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            placeholder="Write your message here..."
                            className="mt-1 block w-full rounded-md border border-border bg-background px-4 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

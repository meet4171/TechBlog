'use client';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto w-full">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold">About BlogSpace</h1>
                    <p className="mt-4 text-base text-muted-foreground">
                        Discover our mission and the story behind BlogSpace.
                    </p>
                </div>

                <div className="space-y-8 text-sm sm:text-base leading-relaxed">
                    <p>
                        <strong>BlogSpace</strong> is a modern blogging platform designed for creators, writers, and thinkers. Whether you&apos;re sharing your personal stories, tech tutorials, or creative ideas, BlogSpace gives you the tools to express yourself beautifully and reach a wider audience.
                    </p>

                    <p>
                        Our mission is to simplify content publishing while maintaining performance, accessibility, and a clean aesthetic. We aim to empower individuals to share knowledge, spark conversations, and build communities through writing.
                    </p>

                    <p>
                        Built using cutting-edge technologies like <strong>Next.js</strong>, <strong>NestJS</strong>, and <strong>Tailwind CSS</strong>, BlogSpace delivers blazing-fast experiences and elegant designs by default.
                    </p>

                    <p>
                        We prioritize <strong>privacy</strong>, <strong>speed</strong>, and <strong>creator control</strong>. Your words are yours, and we’re here to help amplify them with a distraction-free, delightful editor and a friendly interface.
                    </p>

                    <p>
                        Want to contribute or learn more? <a href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">Contact us</a> — we’d love to hear from you.
                    </p>
                </div>
            </div>
        </div>
    );
}

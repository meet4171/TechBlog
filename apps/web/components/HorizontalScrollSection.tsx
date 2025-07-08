'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlogCard from '@/components/BlogCard';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    category: string;
}

interface HorizontalScrollSectionProps {
    posts: Post[];
}

const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ posts }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [totalScrollWidth, setTotalScrollWidth] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);

    useEffect(() => {
        const calculateDimensions = () => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const scrollWidth = container.scrollWidth;
                const clientWidth = container.clientWidth;
                setTotalScrollWidth(scrollWidth);
                setViewportWidth(clientWidth);
            }
        };

        const timers = [
            setTimeout(calculateDimensions, 100),
            setTimeout(calculateDimensions, 300),
            setTimeout(calculateDimensions, 500),
        ];

        window.addEventListener('resize', calculateDimensions);
        return () => {
            timers.forEach(timer => clearTimeout(timer));
            window.removeEventListener('resize', calculateDimensions);
        };
    }, [posts]);

    const horizontalScrollDistance = Math.max(0, totalScrollWidth - viewportWidth);
    const verticalScrollHeight = horizontalScrollDistance * 3;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -horizontalScrollDistance]);

    return (
        <div className="relative mt-8">
            {/* Vertical scroll space */}
            <div
                ref={containerRef}
                style={{
                    height: ` ${verticalScrollHeight + (typeof window !== 'undefined' ? window.innerHeight : 800)} px
                `}}
            >
                {/* Make the entire section sticky */}
                <section className="sticky top-0 bg-white dark:bg-gray-800 py-16 h-screen overflow-hidden">
                    {/* Header remains sticky within the section */}
                    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm py-4">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Posts</h2>
                                <p className="text-gray-600 dark:text-gray-400">Stay up to date with the latest</p>
                            </div>
                        </div>
                    </div>

                    {/* Horizontal scroll content */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100%-80px)] pt-8">
                        <div className="relative w-full h-full overflow-hidden">
                            <motion.div
                                ref={scrollContainerRef}
                                className="flex h-full items-center gap-8 absolute top-0 left-0"
                                style={{ x }}
                            >
                                {posts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        className="flex-shrink-0 w-80 h-full"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <BlogCard post={post} />
                                    </motion.div>
                                ))}
                                <div className="flex-shrink-0 w-20"></div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
};

export default HorizontalScrollSection;
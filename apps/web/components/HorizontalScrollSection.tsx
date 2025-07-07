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

    // Calculate dimensions
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

        // Multiple attempts to ensure accurate measurement
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

    // Calculate the distance that needs to be scrolled horizontally
    const horizontalScrollDistance = Math.max(0, totalScrollWidth - viewportWidth);

    // Create enough vertical scroll space - this is key!
    const verticalScrollHeight = horizontalScrollDistance * 3; // Multiply by 3 to slow down the scroll

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Transform vertical scroll to horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], [0, -horizontalScrollDistance]);

    return (
        <div className="relative">
            {/* This div creates the vertical scroll space needed for horizontal scrolling */}
            <div
                ref={containerRef}
                style={{
                    height: `${verticalScrollHeight + (typeof window !== 'undefined' ? window.innerHeight : 800)}px`
                }}
            >
                {/* Sticky container */}
                <div className="sticky top-16 h-screen overflow-hidden bg-white dark:bg-gray-900 mt-8">
                    {/* Header */}
                    <section className="bg-white dark:bg-gray-800 py-16 mt-8">
                        <div className="sticky top-16 z-10 bg-white dark:bg-gray-800 shadow-sm py-4">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Posts</h2>
                                    <p className="text-gray-600 dark:text-gray-400">Stay up to date with the latest</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-full overflow-hidden">
                            <motion.div
                                ref={scrollContainerRef}
                                className="flex h-full items-center gap-8 px-8"
                                style={{ x }}
                            >
                                {posts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        className="flex-shrink-0 w-80"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <BlogCard post={post} />
                                    </motion.div>
                                ))}
                                {/* Add some padding at the end to ensure last post is fully visible */}
                                <div className="flex-shrink-0 w-20"></div>
                            </motion.div>

                        </div>
                    </section>

                </div>
            </div>
        </div >

    );
};

export default HorizontalScrollSection;


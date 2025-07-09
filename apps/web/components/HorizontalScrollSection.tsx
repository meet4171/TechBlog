'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AdMedia from '@/components/AdMedia';

interface Ad {
    id: string;
    type: 'image' | 'video';
    src: string;
    link?: string;
}

interface HorizontalScrollSectionProps {
    ads: Ad[];
}

const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ ads }) => {
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
            timers.forEach(clearTimeout);
            window.removeEventListener('resize', calculateDimensions);
        };
    }, [ads]);

    // Add extra space (1.5x viewport width) after last image
    const horizontalScrollDistance = Math.max(0, totalScrollWidth - viewportWidth + (viewportWidth * 0.5));

    const SCROLL_SPEED_MULTIPLIER = 0.8;
    const verticalScrollHeight = horizontalScrollDistance * SCROLL_SPEED_MULTIPLIER;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -horizontalScrollDistance]);

    return (
        <div className="relative mt-8 w-full">
            <div
                ref={containerRef}
                style={{
                    height: ` ${verticalScrollHeight + (typeof window !== 'undefined' ? window.innerHeight : 800)}px`,
                }}
            >
                <section className="sticky top-0 bg-section py-16 h-screen w-full overflow-hidden">
                    <div className="sticky top-0 z-10 bg-section shadow-sm py-4 w-full">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Ads</h2>
                                <p className="text-gray-600 dark:text-gray-400">Scroll to discover</p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100%-80px)] w-full pt-8">
                        <div className="relative w-full h-full overflow-hidden">
                            <motion.div
                                ref={scrollContainerRef}
                                className="flex h-full items-center"
                                style={{ x }}
                            >
                                {/* Left padding to center first item */}
                                <div className="flex-shrink-0" />

                                {ads.map((ad, index) => (
                                    <motion.div
                                        key={ad.id}
                                        className="flex-shrink-0 w-[80vw] h-full flex items-center justify-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: index * 0.1 }
                                        }}
                                        viewport={{
                                            once: true,
                                            margin: "0px 0px 0px 0px"
                                        }}
                                    >
                                        <AdMedia type={ad.type} src={ad.src} link={ad.link} />
                                    </motion.div>
                                ))}

                                {/* Extra right padding for scroll buffer */}
                                <div className="flex-shrink-0" />
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HorizontalScrollSection;
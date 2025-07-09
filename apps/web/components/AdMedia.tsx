'use client';

import Image from 'next/image';

interface AdMediaProps {
    type: 'image' | 'video';
    src: string;
    link?: string;
}

const AdMedia: React.FC<AdMediaProps> = ({ type, src, link }) => {
    return (
        <div className="w-full h-full max-w-full aspect-video relative">
            {type === 'image' ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={src}
                        alt="Ad"
                        fill
                        className="shadow-lg"
                        priority
                    />
                </a>
            ) : (
                <iframe
                    className="w-full h-full rounded-lg shadow-lg"
                    src={`https://www.youtube.com/embed/${src}?autoplay=1&mute=1&playsinline=1&rel=0&showinfo=0`}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />

            )}
        </div>
    );
};

export default AdMedia;

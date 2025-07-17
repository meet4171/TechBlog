// components/Loader.tsx
'use client';

export default function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/50 z-50">
            <div className="loader" />
        </div>
    );
}

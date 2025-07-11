import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Dropdown = ({ buttonText, items }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Dropdown button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2.5 text-left rounded-lg border border-border bg-btn-blue hover:bg-btn-blue-hover text-white 
                          flex items-center justify-between outline-none transition-colors duration-200"
                type="button"
            >
                <span className="truncate">{buttonText}</span>
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="z-10 absolute top-full mt-1 w-full bg-card rounded-lg shadow-lg border border-border">
                    <ul className="max-h-60 overflow-auto py-1 text-sm">
                        {items.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => {
                                        item.onClick();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-foreground
                                              hover:bg-gray-200 dark:hover:bg-gray-700
                                              transition-colors duration-200"
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
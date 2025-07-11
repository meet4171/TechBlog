'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Save, Eye, Upload, X, Plus,
    Image as ImageIcon, Type, List, Bold, Italic,
    Link as LinkIcon, Quote
} from 'lucide-react';
import { DropdownItem } from '@/types/global';
import { Dropdown } from '@/components/Dropdown';

const dropdownItems: DropdownItem[] = [
    { label: 'Dashboard', onClick: () => console.log('Dashboard clicked') },
    { label: 'Settings', onClick: () => console.log('Settings clicked') },
    { label: 'Earnings', onClick: () => console.log('Earnings clicked') },
    { label: 'Sign out', onClick: () => console.log('Sign out clicked') },
];


const categories = [
    'Technology', 'Design', 'Development', 'React',
    'CSS', 'TypeScript', 'JavaScript', 'UI/UX',
    'Web Development', 'Mobile', 'AI/ML', 'DevOps'
];

export default function CreatePost() {



    const [formData, setFormData] = useState({
        title: '', excerpt: '', content: '', category: '',
        tags: [] as string[], featuredImage: '', status: 'draft'
    });

    const [newTag, setNewTag] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImagePreview(result);
                setFormData(prev => ({ ...prev, featuredImage: result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const insertFormatting = (format: string) => {
        const textarea = document.getElementById('content') as HTMLTextAreaElement;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let replacement = '';
        switch (format) {
            case 'bold': replacement = `**${selectedText}**`; break;
            case 'italic': replacement = `*${selectedText}*`; break;
            case 'heading': replacement = `## ${selectedText}`; break;
            case 'list': replacement = `- ${selectedText}`; break;
            case 'quote': replacement = `> ${selectedText}`; break;
            case 'link': replacement = `[${selectedText}](url)`; break;
        }
        const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
        setFormData(prev => ({ ...prev, content: newContent }));
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + replacement.length, start + replacement.length);
        }, 0);
    };

    const handleSave = (status: 'draft' | 'published') => {
        const postData = {
            ...formData,
            status,
            createdAt: new Date().toISOString(),
            author: 'Current User'
        };
        console.log('Saving post:', postData);
        alert(`Post ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
    };

    const renderPreview = () => (
        <div className="bg-card rounded-lg shadow-sm p-6">
            {formData.featuredImage && (
                <Image
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                    width={1024}
                    height={400}
                />
            )}
            {formData.category && (
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
                    {formData.category}
                </span>
            )}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{formData.title || 'Your Post Title'}</h1>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6">{formData.excerpt || 'Post excerpt...'}</p>
            <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none">
                {formData.content.split('\n').map((para, idx) => {
                    if (para.startsWith('## ')) return <h2 key={idx} className="text-xl font-bold mt-8 mb-4">{para.replace('## ', '')}</h2>;
                    if (para.startsWith('- ')) return <li key={idx} className="ml-4">{para.replace('- ', '')}</li>;
                    if (para.startsWith('> ')) return <blockquote key={idx} className="border-l-4 border-gray-300 pl-4 italic">{para.replace('> ', '')}</blockquote>;
                    return <p key={idx} className="mb-4">{para}</p>;
                })}
            </div>
            {formData.tags.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-sm font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                            <span key={tag} className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">#{tag}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-gray-800 dark:text-white pb-24">
            {/* Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
                    <Link href="/" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>
                    <h1 className="text-xl font-bold">Create New Post</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isPreview ? renderPreview() : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left - Content Editor */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title */}
                            <div className="bg-card rounded-lg shadow-sm p-6">
                                <label htmlFor="title" className="block text-sm font-medium mb-2">Post Title</label>
                                <input
                                    id="title" name="title" type="text" value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 outline-none bg-background text-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter post title..."
                                />
                            </div>

                            {/* Excerpt */}
                            <div className="bg-card rounded-lg shadow-sm p-6">
                                <label htmlFor="excerpt" className="block text-sm font-medium mb-2">Post Excerpt</label>
                                <textarea
                                    id="excerpt" name="excerpt" rows={3} value={formData.excerpt}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 outline-none bg-background text-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder="Short summary..."
                                />
                            </div>

                            {/* Content Editor */}
                            <div className="bg-card rounded-lg shadow-sm p-6">
                                <div className="flex justify-between mb-4">
                                    <label htmlFor="content" className="text-sm font-medium">Post Content</label>
                                    <div className="flex gap-2">
                                        {['bold', 'italic', 'heading', 'list', 'quote', 'link'].map((format, idx) => {
                                            const icons = {
                                                bold: Bold,
                                                italic: Italic,
                                                heading: Type,
                                                list: List,
                                                quote: Quote,
                                                link: LinkIcon
                                            };
                                            const Icon = icons[format as keyof typeof icons];
                                            return (
                                                <button key={idx} title={format} onClick={() => insertFormatting(format)}
                                                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                                                    <Icon className="h-4 w-4" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <textarea
                                    id="content" name="content" rows={16} value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full font-mono px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 outline-none bg-background text-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder="Start writing..."
                                />
                            </div>
                        </div>

                        {/* Right - Sidebar */}
                        <div className="space-y-6">
                            {/* Featured Image */}
                            <div className="bg-card rounded-lg shadow-sm p-6">
                                <h3 className="text-sm font-medium mb-2">Featured Image</h3>
                                {imagePreview ? (
                                    <div className="relative">
                                        <Image src={imagePreview} alt="Featured" className="rounded-lg" width={300} height={200} />
                                        <button onClick={() => { setImagePreview(''); setFormData(p => ({ ...p, featuredImage: '' })); }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="bg-background flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer">
                                        <ImageIcon className="h-8 w-8 text-gray-400" />
                                        <p className="text-xs text-gray-500">Click to upload</p>
                                        <input type="file" className="hidden" onChange={handleImageUpload} />
                                    </label>
                                )}
                            </div>

                            {/* Category */}
                            <Dropdown buttonText="Category" items={dropdownItems} />

                            {/* Tags */}
                            <div className="bg-card rounded-lg shadow-sm p-6">
                                <h3 className="text-sm font-medium mb-2">Tags</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <input
                                        value={newTag} onChange={(e) => setNewTag(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                                        className="bg-background flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm  focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Add tag"
                                    />
                                    <button onClick={handleAddTag} className="bg-btn-blue hover:bg-btn-blue-hover text-white px-3 py-2 rounded-lg">
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="flex items-center bg-gray-200 dark:bg-gray-800 text-sm rounded-full px-3 py-1">
                                            #{tag}
                                            <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-gray-500 hover:text-red-500">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Status */}
                            <div className="bg-card rounded-lg shadow-sm p-6">
                                <h3 className="text-sm font-medium mb-2">Status</h3>
                                <label className="flex items-center gap-2 accent-primary">
                                    <input type="radio" name="status" value="draft" checked={formData.status === 'draft'} onChange={handleInputChange} />
                                    Draft
                                </label>
                                <label className="flex items-center gap-2 mt-2 accent-primary">
                                    <input type="radio" name="status" value="published" checked={formData.status === 'published'} onChange={handleInputChange} />
                                    Publish
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer - Fixed Buttons */}
            <div className="fixed bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between px-4">
                    <button
                        onClick={() => setIsPreview(!isPreview)}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center ${isPreview
                            ? 'bg-btn-blue hover:bg-btn-blue-hover text-white'
                            : 'bg-btn-gray hover:bg-btn-gray-hover text-gray-600 dark:text-gray-700'
                            } transition-colors`}
                    >
                        <Eye className="h-4 w-4 mr-1" />
                        {isPreview ? 'Continue Editing' : 'Preview Post'}
                    </button>
                    <div className="space-x-3">
                        <button onClick={() => handleSave('draft')} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                            <Save className="inline h-4 w-4 mr-1" /> Save Draft
                        </button>
                        <button onClick={() => handleSave('published')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            <Upload className="inline h-4 w-4 mr-1" /> Publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

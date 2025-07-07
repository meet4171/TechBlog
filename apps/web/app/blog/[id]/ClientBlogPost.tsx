'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Save,
    Eye,
    Upload,
    X,
    Plus,
    Image as ImageIcon,
    Type,
    List,
    Bold,
    Italic,
    Link as LinkIcon,
    Quote
} from 'lucide-react';

const categories = [
    'Technology',
    'Design',
    'Development',
    'React',
    'CSS',
    'TypeScript',
    'JavaScript',
    'UI/UX',
    'Web Development',
    'Mobile',
    'AI/ML',
    'DevOps'
];

export default function CreatePost() {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: [] as string[],
        featuredImage: '',
        status: 'draft' // draft or published
    });

    const [newTag, setNewTag] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
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
                setFormData(prev => ({
                    ...prev,
                    featuredImage: result
                }));
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
            case 'bold':
                replacement = `**${selectedText}**`;
                break;
            case 'italic':
                replacement = `*${selectedText}*`;
                break;
            case 'heading':
                replacement = `## ${selectedText}`;
                break;
            case 'list':
                replacement = `- ${selectedText}`;
                break;
            case 'quote':
                replacement = `> ${selectedText}`;
                break;
            case 'link':
                replacement = `[${selectedText}](url)`;
                break;
        }

        const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
        setFormData(prev => ({ ...prev, content: newContent }));

        // Focus back to textarea
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
            author: 'Current User' // This would come from auth context
        };

        console.log('Saving post:', postData);
        // Here you would typically send the data to your backend
        alert(`Post ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
    };

    const renderPreview = () => {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8">
                {formData.featuredImage && (
                    <img
                        src={formData.featuredImage}
                        alt="Featured"
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                )}

                {formData.category && (
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
                        {formData.category}
                    </span>
                )}

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {formData.title || 'Your Post Title'}
                </h1>

                <p className="text-xl text-gray-600 mb-6">
                    {formData.excerpt || 'Your post excerpt will appear here...'}
                </p>

                <div className="prose prose-lg max-w-none">
                    {formData.content.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('## ')) {
                            return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                        } else if (paragraph.startsWith('- ')) {
                            return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>;
                        } else if (paragraph.startsWith('> ')) {
                            return <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic">{paragraph.replace('> ', '')}</blockquote>;
                        } else {
                            return <p key={index} className="mb-4">{paragraph}</p>;
                        }
                    })}
                </div>

                {formData.tags.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsPreview(!isPreview)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                            >
                                <Eye className="h-4 w-4" />
                                <span>{isPreview ? 'Edit' : 'Preview'}</span>
                            </button>

                            <button
                                onClick={() => handleSave('draft')}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200"
                            >
                                <Save className="h-4 w-4" />
                                <span>Save Draft</span>
                            </button>

                            <button
                                onClick={() => handleSave('published')}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                            >
                                <Upload className="h-4 w-4" />
                                <span>Publish</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isPreview ? (
                    renderPreview()
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Post Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter your post title..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                                />
                            </div>

                            {/* Excerpt */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                                    Post Excerpt
                                </label>
                                <textarea
                                    id="excerpt"
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleInputChange}
                                    placeholder="Write a brief description of your post..."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Content Editor */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                        Post Content
                                    </label>

                                    {/* Formatting Toolbar */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => insertFormatting('bold')}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
                                            title="Bold"
                                        >
                                            <Bold className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => insertFormatting('italic')}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
                                            title="Italic"
                                        >
                                            <Italic className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => insertFormatting('heading')}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
                                            title="Heading"
                                        >
                                            <Type className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => insertFormatting('list')}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
                                            title="List"
                                        >
                                            <List className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => insertFormatting('quote')}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
                                            title="Quote"
                                        >
                                            <Quote className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => insertFormatting('link')}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
                                            title="Link"
                                        >
                                            <LinkIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    placeholder="Start writing your post content here..."
                                    rows={20}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                />

                                <div className="mt-4 text-sm text-gray-500">
                                    <p>Formatting tips:</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Use ## for headings</li>
                                        <li>Use **text** for bold</li>
                                        <li>Use *text* for italic</li>
                                        <li>Use - for bullet points</li>
                                        <li>Use  for quotes</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Featured Image */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>

                                {imagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Featured"
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => {
                                                setImagePreview('');
                                                setFormData(prev => ({ ...prev, featuredImage: '' }));
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">Click to upload image</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Category */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Tags */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>

                                <div className="flex space-x-2 mb-4">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        placeholder="Add a tag..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                    />
                                    <button
                                        onClick={handleAddTag}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            #{tag}
                                            <button
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Post Status */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Status</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="draft"
                                            checked={formData.status === 'draft'}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <span className="text-gray-700">Save as Draft</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="published"
                                            checked={formData.status === 'published'}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <span className="text-gray-700">Publish Immediately</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
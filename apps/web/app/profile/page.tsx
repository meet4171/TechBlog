'use client';

import { useState } from 'react';
import {
  User, Mail, Calendar, Edit3, Save, X, Camera,
  Award, BookOpen, Heart, MessageCircle, Share2, MoreHorizontal
} from 'lucide-react';
import Image from 'next/image';
import ProtectedRoute from '@/routes/ProtectedRoute';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    bio: 'Passionate writer and tech enthusiast. I love sharing insights about web development, design, and the latest trends in technology.',
    joinDate: 'January 2023',
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.dev',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  const [editForm, setEditForm] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(profile);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const userPosts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Post Title ${i + 1}`,
    excerpt: 'Discover practical tips to improve your JavaScript performance...',
    date: 'Dec 8, 2024',
    likes: 156,
    comments: 8,
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400'
  }));

  const userStats = [
    { label: 'Posts', value: '24', icon: BookOpen },
    { label: 'Followers', value: '1.2K', icon: User },
    { label: 'Following', value: '345', icon: Heart },
    { label: 'Likes', value: '3.4K', icon: Award }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-card">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Image
                src={profile.avatar}
                alt={profile.name}
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                width={96}
                height={96}
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    className="text-2xl font-bold text-foreground bg-transparent border-b-2 border-blue-600 focus:outline-none focus:border-blue-700"
                  />
                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-btn-gray hover:bg-btn-gray-hover text-gray-700 px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                  <p className="text-gray-heading mt-2">{profile.bio}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {profile.email}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined {profile.joinDate}
                    </div>
                  </div>
                  <button
                    onClick={handleEdit}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStats.map((stat) => (
              <div key={stat.label} className="bg-stats hover:bg-stats-hover rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-card max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['posts', 'drafts', 'liked'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'posts' && (
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {userPosts.map((post) => (
                  <div key={post.id} className="bg-background rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{post.date}</span>
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              {post.likes}
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {post.comments}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <Image
                        src={post.image}
                        alt={post.title}
                        className="w-24 h-24 object-cover rounded-lg ml-4"
                        height={100}
                        width={100}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'drafts' && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No drafts yet</h3>
                <p className="text-gray-600">Your draft posts will appear here</p>
              </div>
            )}

            {activeTab === 'liked' && (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No liked posts yet</h3>
                <p className="text-gray-600">Posts you like will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

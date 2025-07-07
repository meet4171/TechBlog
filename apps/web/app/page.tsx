'use client';

import BlogCard from '@/components/BlogCard';
import { motion, Variants } from 'framer-motion';
import { TrendingUp, Users, BookOpen, ArrowRight } from 'lucide-react';
import CountUp from 'react-countup';


const SafeCountUp = CountUp as unknown as React.FC<any>;

const featuredPosts = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.',
    author: 'Sarah Johnson',
    date: 'Dec 28, 2024',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Technology'
  },
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.',
    author: 'Sarah Johnson',
    date: 'Dec 28, 2024',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Technology'
  },
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.',
    author: 'Sarah Johnson',
    date: 'Dec 28, 2024',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Technology'
  },
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.',
    author: 'Sarah Johnson',
    date: 'Dec 28, 2024',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Technology'
  },
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.',
    author: 'Sarah Johnson',
    date: 'Dec 28, 2024',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Technology'
  },
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.',
    author: 'Sarah Johnson',
    date: 'Dec 28, 2024',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Building Sustainable Design Systems for Modern Applications',
    excerpt: 'Learn how to create and maintain design systems that scale with your team and product requirements.',
    author: 'Michael Chen',
    date: 'Dec 25, 2024',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Design'
  },
  {
    id: '3',
    title: 'The Art of Code Review: Best Practices for Team Collaboration',
    excerpt: 'Discover effective strategies for conducting code reviews that improve code quality and team communication.',
    author: 'Emily Rodriguez',
    date: 'Dec 22, 2024',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Development'
  }
];

const recentPosts = [
  {
    id: '4',
    title: 'Understanding React Server Components',
    excerpt: 'A deep dive into React Server Components and how they revolutionize server-side rendering.',
    author: 'David Kim',
    date: 'Dec 20, 2024',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'React'
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'Master the differences between CSS Grid and Flexbox to choose the right layout method for your projects.',
    author: 'Anna Thompson',
    date: 'Dec 18, 2024',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'CSS'
  },
  {
    id: '6',
    title: 'TypeScript Tips for Better Code Quality',
    excerpt: 'Practical TypeScript tips and tricks to write more maintainable and error-free code.',
    author: 'James Wilson',
    date: 'Dec 15, 2024',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'TypeScript'
  },
  {
    id: '4',
    title: 'Understanding React Server Components',
    excerpt: 'A deep dive into React Server Components and how they revolutionize server-side rendering.',
    author: 'David Kim',
    date: 'Dec 20, 2024',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'React'
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'Master the differences between CSS Grid and Flexbox to choose the right layout method for your projects.',
    author: 'Anna Thompson',
    date: 'Dec 18, 2024',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'CSS'
  },
  {
    id: '6',
    title: 'TypeScript Tips for Better Code Quality',
    excerpt: 'Practical TypeScript tips and tricks to write more maintainable and error-free code.',
    author: 'James Wilson',
    date: 'Dec 15, 2024',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'TypeScript'
  }
];

const stats = [
  { icon: BookOpen, value: 10000, label: 'Articles Published', color: 'blue' },
  { icon: Users, value: 50000, label: 'Active Readers', color: 'purple' },
  { icon: TrendingUp, value: 1000000, label: 'Monthly Views', color: 'green' }
];

const animationVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animationVariants}
        className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.h1
            variants={animationVariants}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Share Your Stories,
            <br />
            <motion.span
              variants={animationVariants}
              className="text-blue-200 dark:text-blue-300 block mt-2"
            >
              Inspire the World
            </motion.span>
          </motion.h1>

          <motion.p
            variants={animationVariants}
            className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-blue-200 max-w-3xl mx-auto"
          >
            Join thousands of writers and readers in our vibrant community.
          </motion.p>

          <motion.div
            variants={animationVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center"
            >
              Start Writing
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Explore Posts
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="relative">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Impact</h2>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={animationVariants}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`bg-${stat.color}-100 dark:bg-${stat.color}-900 p-4 rounded-full w-max mx-auto mb-4`}>
                  <stat.icon className={`h-8 w-8 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  <SafeCountUp
                    end={stat.value}
                    duration={2}
                    separator=","
                    suffix="+"
                  />
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        {/* Sticky header inside scrollable page */}
        <div className="sticky top-16 z-10 bg-gray-50 dark:bg-gray-900 shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Posts</h2>
              <p className="text-gray-600 dark:text-gray-400">Discover our most popular articles</p>
            </div>
          </div>
        </div>

        {/* Section content scrolls as part of page */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </section>



      {/* Recent Posts */}
      <section className="bg-white dark:bg-gray-800 py-16 mt-32">
        <div className="sticky top-16 z-10 bg-white dark:bg-gray-800 shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Posts</h2>
              <p className="text-gray-600 dark:text-gray-400">Stay up to date with the latest</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </section>


      {/* Newsletter Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animationVariants}
        className="py-16 bg-blue-600 dark:bg-blue-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl mb-8 text-blue-100 dark:text-blue-200">
            Get the latest posts and updates
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 dark:text-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-blue-800 dark:bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-900 dark:hover:bg-blue-700 transition-colors duration-200 font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
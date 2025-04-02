
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Design Trends for 2023',
    excerpt: 'Discover the latest design trends that are dominating the digital landscape in 2023.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.',
    author: 'Alex Johnson',
    date: 'October 15, 2023',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1974&auto=format&fit=crop',
    category: 'Design',
  },
  {
    id: 2,
    title: 'How to Choose the Right Template for Your Project',
    excerpt: 'Learn how to select the perfect template that meets all your project requirements.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.',
    author: 'Sarah Williams',
    date: 'September 28, 2023',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
    category: 'Tips & Tricks',
    hasVideo: true,
  },
  {
    id: 3,
    title: 'Maximizing Productivity with Our Dashboard Templates',
    excerpt: 'Explore how our dashboard templates can help you streamline workflows and boost productivity.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.',
    author: 'Michael Chen',
    date: 'August 12, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    category: 'Productivity',
  },
  {
    id: 4,
    title: 'Building a Successful E-commerce Site in One Week',
    excerpt: 'Step-by-step guide to launching your online store quickly using our e-commerce templates.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.',
    author: 'Emma Davis',
    date: 'July 20, 2023',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
    category: 'E-commerce',
  },
  {
    id: 5,
    title: 'The Psychology of Color in Web Design',
    excerpt: 'Understanding how color choices affect user perception and engagement with your website.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.',
    author: 'Ryan Parker',
    date: 'June 5, 2023',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=1974&auto=format&fit=crop',
    category: 'Design',
    hasVideo: true,
  },
  {
    id: 6,
    title: 'Responsive Design Best Practices for 2023',
    excerpt: 'Learn the latest techniques to ensure your website looks great on all devices.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.',
    author: 'Linda Thompson',
    date: 'May 18, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    category: 'Development',
  },
];

const Blog = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <h1 className="text-4xl font-bold mb-6">Blog</h1>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            Latest articles, tutorials, and updates from our design and development team.
          </p>
          
          {/* Featured Article */}
          <div className="mb-16 overflow-hidden rounded-lg shadow-lg">
            <div className="relative aspect-[21/9] md:aspect-[21/9] overflow-hidden">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="bg-brand-purple px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{blogPosts[0].title}</h2>
                <p className="text-lg md:text-xl mb-4 max-w-3xl">{blogPosts[0].excerpt}</p>
                <div className="flex items-center space-x-4 text-sm md:text-base">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  {post.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/30 p-3 rounded-full">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-brand-purple px-3 py-1 rounded-full text-xs font-medium text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

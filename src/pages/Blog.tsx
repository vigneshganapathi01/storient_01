
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Blog = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <h1 className="text-4xl font-bold mb-6">Blog</h1>
          <p className="text-muted-foreground mb-12">
            Latest articles, tutorials, and updates from our team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog post placeholders */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video bg-secondary/30 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-secondary/30 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-secondary/20 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-secondary/20 rounded animate-pulse mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-24 bg-secondary/30 rounded animate-pulse"></div>
                    <div className="h-5 w-16 bg-secondary/30 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

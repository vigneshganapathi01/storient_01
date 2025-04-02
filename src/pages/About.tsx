
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            We're a team of designers and developers passionate about creating high-quality templates that help professionals elevate their projects.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                Our mission is to empower professionals with beautiful, functional templates that save time and enhance their work. We believe that great design should be accessible to everyone, regardless of technical skill.
              </p>
              <p className="text-muted-foreground">
                Every template we create is crafted with attention to detail, usability, and modern design principles to ensure you make the best impression.
              </p>
            </div>
            <div className="bg-secondary/30 rounded-lg animate-pulse h-64"></div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {/* Team Member Placeholders */}
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-full bg-secondary/30 animate-pulse mx-auto mb-4"></div>
                <div className="h-5 bg-secondary/30 w-24 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 bg-secondary/20 w-32 rounded animate-pulse mx-auto"></div>
              </div>
            ))}
          </div>
          
          <div className="bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="mb-6">
              We're always looking for talented designers and developers to join our team. If you're passionate about creating beautiful templates, we'd love to hear from you.
            </p>
            <button className="px-6 py-2 bg-brand-purple text-white rounded-md hover:bg-brand-indigo transition-colors">
              View Open Positions
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

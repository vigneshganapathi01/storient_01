
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const HowItWorks = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <h1 className="text-4xl font-bold mb-6">How It Works</h1>
          <p className="text-muted-foreground mb-12">
            Learn how to make the most of our template marketplace.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-purple text-white mb-4 font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold mb-3">Choose a Template</h3>
              <p className="text-muted-foreground">
                Browse our extensive collection of premium templates and find the perfect one for your project.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-purple text-white mb-4 font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold mb-3">Purchase & Download</h3>
              <p className="text-muted-foreground">
                Complete your purchase and instantly download your template. Your files are always accessible in your account.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-purple text-white mb-4 font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold mb-3">Customize & Use</h3>
              <p className="text-muted-foreground">
                Easily customize your template with our detailed guides and start using it right away in your projects.
              </p>
            </div>
          </div>
          <div className="p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
            <p className="mb-4">Our support team is here to help you with any questions or issues.</p>
            <button className="px-6 py-2 bg-brand-purple text-white rounded-md hover:bg-brand-indigo transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;

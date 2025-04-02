
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SearchIcon, CreditCard, Download, Settings, Code, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <h1 className="text-4xl font-bold mb-6">How It Works</h1>
          <p className="text-muted-foreground mb-12 text-lg max-w-3xl">
            Our platform makes it easy to find, purchase, and use premium templates for your projects.
            Follow these simple steps to get started.
          </p>
          
          {/* Process steps with larger icons and more details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-border transition-all hover:shadow-lg">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-purple text-white mb-6">
                <SearchIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Browse Templates</h3>
              <p className="text-muted-foreground mb-4">
                Explore our extensive collection of premium templates across various categories.
                Filter by type, price, or popularity to find exactly what you need.
              </p>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/templates'}
                className="w-full"
              >
                Browse Templates
              </Button>
            </div>
            
            <div className="p-8 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-border transition-all hover:shadow-lg">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-purple text-white mb-6">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Purchase</h3>
              <p className="text-muted-foreground mb-4">
                Select your desired template or pack and proceed to checkout.
                We offer secure payment options and immediate access to your purchases.
              </p>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-brand-purple mr-2">•</span>
                  <span>One-time payment, no subscription needed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-purple mr-2">•</span>
                  <span>Secure checkout process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-purple mr-2">•</span>
                  <span>Instant access to downloads</span>
                </li>
              </ul>
            </div>
            
            <div className="p-8 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-border transition-all hover:shadow-lg">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-purple text-white mb-6">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Download & Use</h3>
              <p className="text-muted-foreground mb-4">
                Access your templates immediately after purchase. All files can be found in your dashboard
                for download anytime you need them.
              </p>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-brand-purple mr-2">•</span>
                  <span>High-quality source files included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-purple mr-2">•</span>
                  <span>Documented code and resources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-purple mr-2">•</span>
                  <span>Lifetime access to your purchases</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Video guide section */}
          <div className="bg-muted rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Video Guide: How to Get Started</h2>
            <div className="aspect-video max-w-3xl mx-auto bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
              <p className="text-white text-center p-8">Video guide would be embedded here</p>
              {/* In a real implementation, you would add: */}
              {/* <iframe src="https://www.youtube.com/embed/your-video-id" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-brand-purple" />
                  What file formats do you provide?
                </h3>
                <p className="text-muted-foreground">
                  Our templates come in industry-standard formats including PSD, AI, Figma, XD, HTML/CSS, React, and more.
                  Each template listing clearly indicates the included formats.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-brand-purple" />
                  Do you offer customization services?
                </h3>
                <p className="text-muted-foreground">
                  Yes, we offer customization services for our templates. Contact our support team with your requirements for a custom quote.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-brand-purple" />
                  Can I use templates for commercial projects?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely! All our templates come with a commercial license, allowing you to use them in your client projects or commercial applications.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-brand-purple" />
                  Do you offer refunds?
                </h3>
                <p className="text-muted-foreground">
                  Due to the digital nature of our products, we generally don't offer refunds. However, if you experience technical issues, please contact our support team.
                </p>
              </div>
            </div>
          </div>
          
          {/* Support section */}
          <div className="p-8 bg-brand-purple rounded-xl text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Our support team is ready to assist you with any questions or issues. Get in touch and we'll respond as quickly as possible.
            </p>
            <Button variant="secondary" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;

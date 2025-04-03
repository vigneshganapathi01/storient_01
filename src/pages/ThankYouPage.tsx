
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Check, Download, ChevronRight, ChevronLeft, Play } from 'lucide-react';

const ThankYouPage = () => {
  const location = useLocation();
  const { packageName = "Package" } = (location.state as { packageName: string }) || {};
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {packageName}
              </h1>
              
              <div className="text-xl md:text-2xl text-white mb-8">
                <p>
                  Thank you for purchasing from Storient! Your template is ready to use
                  —wishing you success in your projects.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="h-5 w-5" />
                  Download Files
                </Button>
                
                <Card className="border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-medium">Curated Content</div>
                      <span className="text-lg">+</span>
                      <div className="text-lg font-medium">Bonus content</div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex items-center space-x-6 text-white">
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Premium support</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <img 
                      src="/lovable-uploads/ff9ae1db-3c11-45a4-b4a0-8b691c330e1c.png"
                      alt="Template preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-blue-600 rounded-full p-3">
                        <Play fill="white" className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="aspect-video">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
              
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 text-white"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;

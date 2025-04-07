import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroMessage {
  title: string;
  description: string;
  cta: string;
  path: string;
}

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const messages: HeroMessage[] = [
    {
      title: "Storient Premium Templates for Market Expertise",
      description: "Elevate your projects with our expertly crafted designs. Save time and impress your clients.",
      cta: "Browse Templates",
      path: "/templates"
    },
    {
      title: "Customize with Ease",
      description: "All templates are fully customizable. Make them yours with our intuitive editor.",
      cta: "Start Creating",
      path: "/templates"
    },
    {
      title: "New Templates Every Week",
      description: "Stay ahead of the curve with our regularly updated collection of modern designs.",
      cta: "See What's New",
      path: "/blog"
    }
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % messages.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + messages.length) % messages.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleCtaClick = (path: string) => {
    navigate(path);
  };

  // Auto rotate messages
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      handleNext();
    }, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex, isAnimating]);

  return (
    <section className="relative min-h-screen pt-20 pb-10 flex items-center overflow-hidden">
      <div className="max-container grid md:grid-cols-2 gap-12 md:gap-4 items-center">
        {/* Left Side - Message Slider */}
        <div className="order-2 md:order-1 z-10">
          <div className="relative h-[300px] md:h-[350px] flex flex-col justify-center">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-400 ${
                  index === activeIndex
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-20 pointer-events-none'
                }`}
              >
                <p className="text-brand-purple font-semibold mb-3 animate-fade-in">Premium Quality</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {message.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-md">
                  {message.description}
                </p>
                <Button 
                  className="bg-brand-purple hover:bg-brand-indigo text-white px-8 py-6 rounded-lg text-lg"
                  onClick={() => handleCtaClick(message.path)}
                >
                  {message.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>

          {/* Message Navigation Dots */}
          <div className="flex items-center space-x-3 mt-12">
            {messages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-brand-purple w-8' : 'bg-secondary'
                }`}
                aria-label={`View message ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Video Player */}
        <div className="order-1 md:order-2 relative rounded-xl overflow-hidden shadow-xl card-shadow min-h-[300px] md:min-h-[400px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video w-full h-full object-cover"
            poster="/placeholder.svg"
          >
            <source src="https://videos.pexels.com/video-files/3249940/3249940-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
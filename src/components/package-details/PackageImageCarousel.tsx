
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface PackageImageCarouselProps {
  slides: Slide[];
}

const PackageImageCarousel = ({ slides }: PackageImageCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white rounded-lg p-5 text-black">
      <div className="relative">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-1">{slides[currentSlide].title}</h2>
          <h3 className="text-lg font-bold mb-4">{slides[currentSlide].subtitle}</h3>
          
          <p className="mb-4 text-sm">
            {slides[currentSlide].description}
          </p>
        </div>
        
        {/* Main Image */}
        <div className="bg-blue-900 rounded-lg p-6 mb-6">
          <img 
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].title}
            className="w-full h-auto rounded-lg mb-4"
          />
          
          {/* Template Type Cards Grid */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((index) => (
              <Card key={index} className={`bg-blue-${index === 2 ? '300' : index === 1 ? '400' : '500'} p-3 rounded-lg text-center overflow-hidden`}>
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <div className="relative w-10 h-10">
                    <img 
                      src={`/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png`} 
                      alt="Template icon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex justify-center space-x-1 mb-1">
                  <Badge variant="outline" className="bg-white/20 h-5 w-5 p-0 flex items-center justify-center">★</Badge>
                  <span className="text-xs font-medium">
                    {index === 1 ? 'Strategic' : index === 2 ? 'Technology' : 'Creative'}
                  </span>
                  <Badge variant="outline" className="bg-white/20 h-5 w-5 p-0 flex items-center justify-center">★</Badge>
                </div>
                <h4 className="text-center font-bold text-sm uppercase">
                  {index === 1 ? 'THINKERS' : index === 2 ? 'TRAILBLAZERS' : 'VANGUARDS'}
                </h4>
                {index === 1 && <p className="text-xs mt-1">with Strong Business Acumen</p>}
              </Card>
            ))}
          </div>
          
          {/* Second row of cards */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            {[4, 5, 6].map((index) => (
              <Card key={index} className={`bg-${index === 4 ? 'orange-300' : index === 5 ? 'green-300' : 'blue-200'} p-3 rounded-lg text-center overflow-hidden`}>
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <div className="relative w-10 h-10">
                    <img 
                      src={`/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png`} 
                      alt="Template icon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex justify-center space-x-1 mb-1">
                  <Badge variant="outline" className="bg-white/20 h-5 w-5 p-0 flex items-center justify-center">★</Badge>
                  <span className="text-xs font-medium">
                    {index === 4 ? 'Innovative' : index === 5 ? 'Data' : 'Continual'}
                  </span>
                  <Badge variant="outline" className="bg-white/20 h-5 w-5 p-0 flex items-center justify-center">★</Badge>
                </div>
                <h4 className="text-center font-bold text-sm uppercase">
                  {index === 4 ? 'CONTENT STRATEGISTS' : index === 5 ? 'INTERPRETERS' : 'LEARNERS'}
                </h4>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 bottom-1/2 -translate-x-12 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon size={24} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 bottom-1/2 translate-x-12 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
          aria-label="Next slide"
        >
          <ChevronRightIcon size={24} />
        </button>
        
        {/* Dots Navigation */}
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index} 
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageImageCarousel;

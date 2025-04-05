
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

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
        <h2 className="text-xl font-bold text-blue-800 mb-1">{slides[currentSlide].title}</h2>
        <h3 className="text-lg font-bold mb-4">{slides[currentSlide].subtitle}</h3>
        
        <p className="mb-4 text-sm">
          {slides[currentSlide].description}
        </p>
        
        <div className="bg-white rounded-lg border">
          <img 
            src={slides[currentSlide].image} 
            alt="Consulting Template Preview" 
            className="w-full h-auto rounded-lg"
          />
        </div>
        
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


import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechScale Inc",
      content: "Storient has been a game-changer for our marketing team. The templates are not only stunning but also incredibly easy to tailor to our brand. We've cut our design time in half!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "UI/UX Designer",
      company: "Design Forward",
      content: "As a designer, I'm very selective about the templates I use. Storient’s collection is exceptional. The modern design and attention to detail have wowed both me and my clients.",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Startup Founder",
      company: "Novus Technologies",
      content: "Launching a startup is challenging. But with Storient, our branding and presentations looked polished from day one. It played a key role in helping us secure funding and build customer trust.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4
    }
  ];

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-muted">
      <div className="max-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what professionals like you have to say about our premium templates.
          </p>
        </div>

        {/* Desktop Testimonials */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              return (
                <Card 
                  key={testimonial.id}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isActive 
                      ? 'scale-105 shadow-xl border-brand-purple' 
                      : 'scale-95 opacity-75'
                  }`}
                >
                  <CardContent className="p-8">
                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'
                          }`} 
                        />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Testimonial */}
        <div className="md:hidden">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'
                    }`} 
                  />
                ))}
              </div>
              
              {/* Content */}
              <p className="mb-6 text-muted-foreground">{testimonials[activeIndex].content}</p>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-6 space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev}
              className="h-8 w-8 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-1">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? 'w-6 bg-brand-purple' : 'w-2 bg-secondary'
                  }`}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext}
              className="h-8 w-8 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

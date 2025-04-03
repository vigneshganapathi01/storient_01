import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import PackageDetailsHeader from '@/components/package-details/PackageDetailsHeader';
import ReviewSection from '@/components/package-details/ReviewSection';
import PackageInfo from '@/components/package-details/PackageInfo';
import { Review } from '@/components/package-details/ReviewList';
import { fetchTemplateById, fetchTemplateBySlug } from '@/services/templateService';

const PackageDetails = () => {
  const { packageId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [packageDetails, setPackageDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewCount, setReviewCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Part 1:",
      subtitle: "Get a tried-and-tested best-practice guide on structuring consulting proposals with hands-on examples and practical tips",
      description: "A best-practice guide with hands-on tips and examples on how to creating proposals following the structure used by McKinsey, Bain, and BCG:",
      image: "/lovable-uploads/009021ed-582e-42e5-95b7-28ef8fbb950a.png"
    },
    {
      title: "Part 2:",
      subtitle: "Use our PowerPoint templates to create professional slides",
      description: "Professional PowerPoint templates with charts, diagrams, and layouts used by top consulting firms:",
      image: "/lovable-uploads/009021ed-582e-42e5-95b7-28ef8fbb950a.png"
    },
    {
      title: "Part 3:",
      subtitle: "Learn from real-world examples",
      description: "Study real Fortune 500 case examples to understand how consultants structure their proposals:",
      image: "/lovable-uploads/009021ed-582e-42e5-95b7-28ef8fbb950a.png"
    }
  ];
  
  const formatPackageName = (id: string) => {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const packageName = packageId ? formatPackageName(packageId) : 'Package';
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!packageId) {
          setIsLoading(false);
          return;
        }
        
        let templateData = null;
        
        try {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (uuidRegex.test(packageId)) {
            templateData = await fetchTemplateById(packageId);
          } else {
            templateData = await fetchTemplateBySlug(packageId);
          }
        } catch (e) {
          templateData = await fetchTemplateBySlug(packageId);
        }
          
        if (templateData) {
          setPackageDetails(templateData);
          setReviewCount(templateData.review_count || 0);
        }
        
        await fetchReviews();
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [packageId, user]);

  const fetchReviews = async () => {
    try {
      if (!packageId) return;
      
      let templateId;
      
      try {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(packageId)) {
          templateId = packageId;
        } else {
          const templateData = await fetchTemplateBySlug(packageId);
          if (templateData) {
            templateId = templateData.id;
          }
        }
      } catch (e) {
        console.error('Error determining template ID:', e);
        return;
      }
      
      if (!templateId) {
        console.error('Could not determine template ID');
        return;
      }
      
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('template_id', templateId);
      
      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
        throw reviewsError;
      }
      
      if (reviewsData) {
        const userIds = [...new Set(reviewsData.map(review => review.user_id))];
        
        if (userIds.length > 0) {
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', userIds);
            
          if (profilesError) throw profilesError;
          
          const userNameMap = new Map();
          profilesData?.forEach(profile => {
            userNameMap.set(profile.id, profile.full_name || 'Anonymous User');
          });
          
          const formattedReviews = reviewsData.map(review => ({
            id: review.id,
            user_id: review.user_id,
            rating: review.rating,
            created_at: review.created_at,
            user_name: userNameMap.get(review.user_id) || 'Anonymous User',
          }));
          
          setReviews(formattedReviews);
          
          if (formattedReviews.length > 0) {
            const sum = formattedReviews.reduce((acc, review) => acc + review.rating, 0);
            setAverageRating(sum / formattedReviews.length);
          }
          
          if (user) {
            const userReview = formattedReviews.find(review => review.user_id === user.id);
            setHasUserReviewed(!!userReview);
          }

          setReviewCount(formattedReviews.length);
        } else {
          setReviews([]);
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews. Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-slate-950">
        <div className="max-container pt-32 pb-20">
          <div className="grid md:grid-cols-2 gap-10">
            <PackageDetailsHeader 
              packageName={packageName}
              reviewCount={reviewCount}
              averageRating={averageRating}
              price={packageDetails?.price || 149}
              isLoading={isLoading}
            />
            
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
          </div>
          
          <div className="mt-16">
            <PackageInfo />
          </div>
          
          <div id="reviews" className="mt-8">
            <ReviewSection 
              packageId={packageId}
              reviews={reviews} 
              averageRating={averageRating}
              hasUserReviewed={hasUserReviewed}
              onReviewSubmitted={fetchReviews}
              reviewCount={reviewCount}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetails;

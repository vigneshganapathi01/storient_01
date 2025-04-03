
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

import PackageDetailsHeader from '@/components/package-details/PackageDetailsHeader';
import PackageOverview from '@/components/package-details/PackageOverview';
import PriceSection from '@/components/package-details/PriceSection';
import PackageInfo from '@/components/package-details/PackageInfo';
import ReviewSection from '@/components/package-details/ReviewSection';
import { Review } from '@/components/package-details/ReviewList';
import { fetchTemplateById, fetchTemplateBySlug } from '@/services/templateService';
import { CheckIcon } from 'lucide-react';

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
  
  // Format package name from URL
  const formatPackageName = (id: string) => {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const packageName = packageId ? formatPackageName(packageId) : 'Package';
  
  // Fetch package details and reviews
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
          // Check if packageId is a valid UUID
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (uuidRegex.test(packageId)) {
            templateData = await fetchTemplateById(packageId);
          } else {
            // If not a UUID, assume it's a slug
            templateData = await fetchTemplateBySlug(packageId);
          }
        } catch (e) {
          // If fetching by ID fails, try by slug
          templateData = await fetchTemplateBySlug(packageId);
        }
          
        if (templateData) {
          setPackageDetails(templateData);
          // Set review count from template data if available, otherwise default to 0
          setReviewCount(templateData.review_count || 0);
        }
        
        // Fetch reviews
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

  // Fetch reviews for this package
  const fetchReviews = async () => {
    try {
      if (!packageId) return;
      
      // Try to get the templateId (whether it's a slug or UUID)
      let templateId;
      
      try {
        // Check if packageId is a valid UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(packageId)) {
          templateId = packageId;
        } else {
          // If not a UUID, assume it's a slug and fetch the template
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
      
      // Use the template ID for fetching reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('template_id', templateId);
      
      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
        throw reviewsError;
      }
      
      if (reviewsData) {
        // Get unique user IDs from reviews to fetch their profiles
        const userIds = [...new Set(reviewsData.map(review => review.user_id))];
        
        if (userIds.length > 0) {
          // Fetch profiles for these users
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', userIds);
            
          if (profilesError) throw profilesError;
          
          // Create a map of user IDs to full names for quick lookup
          const userNameMap = new Map();
          profilesData?.forEach(profile => {
            userNameMap.set(profile.id, profile.full_name || 'Anonymous User');
          });
          
          // Combine the reviews with user names
          const formattedReviews = reviewsData.map(review => ({
            id: review.id,
            user_id: review.user_id,
            rating: review.rating,
            review_text: review.review_text,
            created_at: review.created_at,
            user_name: userNameMap.get(review.user_id) || 'Anonymous User',
          }));
          
          setReviews(formattedReviews);
          
          // Calculate average rating
          if (formattedReviews.length > 0) {
            const sum = formattedReviews.reduce((acc, review) => acc + review.rating, 0);
            setAverageRating(sum / formattedReviews.length);
          }
          
          // Check if user has already reviewed
          if (user) {
            const userReview = formattedReviews.find(review => review.user_id === user.id);
            setHasUserReviewed(!!userReview);
          }

          // Update review count
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
            {/* Left side content */}
            <div className="text-white">
              <h1 className="text-6xl font-bold mb-8">
                {packageName}
              </h1>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-blue-500 mt-1 h-5 w-5" />
                  <p>Created by ex-McKinsey & BCG consultants</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-blue-500 mt-1 h-5 w-5" />
                  <p>242 PowerPoint slides & 1 Excel model</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-blue-500 mt-1 h-5 w-5" />
                  <p>1 full-length, real Fortune500 case example</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-medium">
                  Buy now ${packageDetails?.price || '149'}
                </button>
                <button className="border border-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white/10">
                  Download free sample
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <a href="#reviews" className="text-blue-400 hover:underline">
                  {reviewCount > 0 ? `${reviewCount} reviews` : 'No reviews yet'}
                </a>
              </div>
            </div>
            
            {/* Right side content - Image carousel */}
            <div className="bg-white rounded-lg p-5 text-black">
              <div className="relative">
                <h2 className="text-xl font-bold text-blue-800 mb-1">Part 1:</h2>
                <h3 className="text-lg font-bold mb-4">Get a tried-and-tested best-practice guide on structuring consulting proposals with hands-on examples and practical tips</h3>
                
                <p className="mb-4 text-sm">
                  A best-practice guide with hands-on tips and examples on how to creating proposals following the structure used by McKinsey, Bain, and BCG:
                </p>
                
                <div className="bg-white rounded-lg border">
                  <img 
                    src="/lovable-uploads/009021ed-582e-42e5-95b7-28ef8fbb950a.png" 
                    alt="Consulting Template Preview" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                
                <div className="absolute left-0 bottom-1/2 -translate-x-12">
                  <button className="rounded-full bg-white p-2 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>
                </div>
                
                <div className="absolute right-0 bottom-1/2 translate-x-12">
                  <button className="rounded-full bg-white p-2 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </div>
                
                <div className="flex justify-center mt-4 space-x-2">
                  {Array(12).fill(0).map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-2 h-2 rounded-full ${index === 6 ? 'bg-blue-500' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div id="reviews" className="mt-16">
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


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
        
        // Fetch package details
        const { data: templateData, error: templateError } = await supabase
          .from('templates')
          .select('*')
          .eq('id', packageId)
          .maybeSingle();
          
        if (templateError) {
          console.error('Error fetching package details:', templateError);
          toast({
            title: "Error",
            description: "Failed to load package details. Please try again later.",
            variant: "destructive"
          });
        } else if (templateData) {
          setPackageDetails(templateData);
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
      
      // Don't use the URL as the ID, use the actual ID from the database
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('template_id', packageId);
      
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
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <PackageDetailsHeader packageName={packageName} isLoading={isLoading} />
          <PackageOverview />
          <PriceSection 
            price={packageDetails?.price ? packageDetails.price : "129"} 
            packageName={packageName} 
          />
          <PackageInfo />
          <ReviewSection 
            packageId={packageId}
            reviews={reviews} 
            averageRating={averageRating}
            hasUserReviewed={hasUserReviewed}
            onReviewSubmitted={fetchReviews}
            reviewCount={reviewCount}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetails;

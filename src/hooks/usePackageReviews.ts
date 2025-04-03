
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Review } from '@/components/package-details/ReviewList';
import { fetchTemplateById, fetchTemplateBySlug } from '@/services/templateService';

export const usePackageReviews = (packageId: string | undefined) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  
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

  useEffect(() => {
    fetchReviews();
  }, [packageId, user]);
  
  return {
    reviews,
    averageRating,
    hasUserReviewed,
    reviewCount,
    fetchReviews
  };
};

export default usePackageReviews;

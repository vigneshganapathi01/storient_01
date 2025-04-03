
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewList, { Review } from './ReviewList';
import { useAuth } from '@/context/AuthContext';

interface ReviewSectionProps {
  packageId: string | undefined;
  reviews: Review[];
  averageRating: number;
  hasUserReviewed: boolean;
  onReviewSubmitted: () => void;
  reviewCount: number;
}

const ReviewSection = ({ 
  packageId, 
  reviews, 
  averageRating, 
  hasUserReviewed, 
  onReviewSubmitted,
  reviewCount
}: ReviewSectionProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <ReviewList 
          reviews={reviews} 
          averageRating={averageRating} 
          reviewCount={reviewCount}
        />
        
        {!hasUserReviewed && user && (
          <ReviewForm packageId={packageId} onReviewSubmitted={onReviewSubmitted} />
        )}
        
        {!user && (
          <div className="text-center py-4 mb-4 bg-gray-50 rounded-md">
            <p className="text-muted-foreground">
              Please <Button variant="link" onClick={() => navigate('/signin')} className="p-0 h-auto font-medium">sign in</Button> to leave a rating
            </p>
          </div>
        )}
        
        {hasUserReviewed && (
          <div className="text-center py-4 mb-4 bg-gray-50 rounded-md">
            <p className="text-muted-foreground">Thank you for your rating!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewSection;

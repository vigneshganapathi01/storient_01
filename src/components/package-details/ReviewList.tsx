
import React from 'react';
import RatingStars from './RatingStars';

export interface Review {
  id: string;
  user_id: string;
  rating: number;
  created_at: string;
  user_name?: string;
}

interface ReviewListProps {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

const ReviewList = ({ reviews, averageRating, reviewCount }: ReviewListProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Customer Reviews</h3>
        <div className="flex items-center gap-3">
          <div className="flex">
            <RatingStars rating={Math.round(averageRating)} />
          </div>
          <span className="text-sm text-blue-500 font-medium">
            {reviewCount > 0 
              ? `${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'}` 
              : 'No reviews yet'}
          </span>
        </div>
      </div>
      
      {/* Display ratings only */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-3 last:border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    <RatingStars rating={review.rating} />
                  </div>
                  <span className="font-medium">{review.user_name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No reviews yet. Be the first to review this package!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;

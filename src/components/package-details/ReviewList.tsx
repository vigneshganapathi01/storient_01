
import React from 'react';
import RatingStars from './RatingStars';

export interface Review {
  id: string;
  user_id: string;
  rating: number;
  review_text: string;
  created_at: string;
  user_name?: string;
}

interface ReviewListProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewList = ({ reviews, averageRating }: ReviewListProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Customer Reviews</h3>
        <div className="flex items-center">
          <div className="flex mr-2">
            <RatingStars rating={Math.round(averageRating)} />
          </div>
          <span className="text-sm text-muted-foreground">
            {reviews.length > 0 
              ? `${averageRating.toFixed(1)} out of 5 (${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'})` 
              : 'No reviews yet'}
          </span>
        </div>
      </div>
      
      {/* Display reviews */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="flex items-center justify-between mb-2">
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
              <p className="text-muted-foreground">{review.review_text}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reviews yet. Be the first to review this package!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;

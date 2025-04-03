
import React from 'react';
import { StarIcon } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars = ({ rating, interactive = false, onRatingChange }: RatingStarsProps) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-5 w-5 ${
            interactive ? 'cursor-pointer' : ''
          } ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => {
            if (interactive && onRatingChange) {
              onRatingChange(star);
            }
          }}
        />
      ))}
    </div>
  );
};

export default RatingStars;


import React from 'react';
import { CheckIcon } from 'lucide-react';
import RatingStars from './RatingStars';

interface PackageDetailsHeaderProps {
  packageName: string;
  reviewCount: number;
  averageRating: number;
  isLoading?: boolean;
}

const PackageDetailsHeader = ({ 
  packageName, 
  reviewCount, 
  averageRating, 
  isLoading = false 
}: PackageDetailsHeaderProps) => {
  if (isLoading) {
    return <div className="h-20 animate-pulse bg-slate-800 rounded-md"></div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-5xl font-bold mb-8">
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
      
      <div className="flex items-center gap-2">
        <div className="flex">
          <RatingStars rating={Math.round(averageRating)} />
        </div>
        <a href="#reviews" className="text-blue-400 hover:underline">
          {reviewCount > 0 ? `${reviewCount} reviews` : 'No reviews yet'}
        </a>
      </div>
    </div>
  );
};

export default PackageDetailsHeader;

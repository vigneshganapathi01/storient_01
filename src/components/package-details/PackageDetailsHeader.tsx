
import React from 'react';

interface PackageDetailsHeaderProps {
  packageName: string;
  isLoading?: boolean;
}

const PackageDetailsHeader = ({ packageName, isLoading = false }: PackageDetailsHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2 text-brand-blue">Package Details</h1>
      {isLoading ? (
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <h2 className="text-2xl font-semibold mb-6">{packageName}</h2>
      )}
    </div>
  );
};

export default PackageDetailsHeader;

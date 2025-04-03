import React from 'react';

interface PackageDetailsHeaderProps {
  packageName: string;
  isLoading?: boolean;
}

const PackageDetailsHeader = ({ packageName, isLoading = false }: PackageDetailsHeaderProps) => {
  // This component is no longer needed with our new design, but we'll keep it 
  // as a placeholder for backward compatibility
  return null;
};

export default PackageDetailsHeader;

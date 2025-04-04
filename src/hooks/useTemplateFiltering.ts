
import { useMemo } from 'react';
import { packageData, premiumPackages, TemplatePackage, PremiumTemplatePackage } from '@/data/templatePackageData';

interface UseTemplateFilteringProps {
  selectedCategory?: string;
  sortBy?: string;
}

export const useTemplateFiltering = ({ selectedCategory = 'All Categories', sortBy = 'featured' }: UseTemplateFilteringProps) => {
  
  const filteredPackages = useMemo(() => {
    return packageData.filter(pkg => {
      // Filter by category if not "All Categories"
      if (selectedCategory !== 'All Categories' && pkg.category !== selectedCategory) {
        return false;
      }
      
      return true;
    });
  }, [packageData, selectedCategory]);

  const filteredPremiumPackages = useMemo(() => {
    return premiumPackages.filter(pkg => {
      // Filter by category if not "All Categories"
      if (selectedCategory !== 'All Categories' && pkg.category !== selectedCategory) {
        return false;
      }
      
      return true;
    });
  }, [premiumPackages, selectedCategory]);

  // Sort all packages based on the selected sort option
  const sortedPackages = useMemo(() => {
    let allPackages = [...filteredPackages];
    
    switch (sortBy) {
      case 'price-low':
        return allPackages.sort((a, b) => a.price - b.price);
      case 'price-high':
        return allPackages.sort((a, b) => b.price - a.price);
      case 'newest':
        // For demo purposes, we'll just randomize the order when sorting by "newest"
        return allPackages.sort(() => Math.random() - 0.5);
      default:
        // 'featured' or any other option
        return allPackages;
    }
  }, [filteredPackages, sortBy]);

  return {
    sortedPackages,
    filteredPremiumPackages
  };
};

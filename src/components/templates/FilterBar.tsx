
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const FilterBar = ({ selectedCategory, setSelectedCategory, sortBy, setSortBy }: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Categories">All Categories</SelectItem>
          <SelectItem value="Business">Business</SelectItem>
          <SelectItem value="Marketing">Marketing</SelectItem>
          <SelectItem value="Communication">Communication</SelectItem>
          <SelectItem value="Training">Training</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Featured" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;

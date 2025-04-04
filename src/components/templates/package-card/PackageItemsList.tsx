
import React from 'react';
import PackageContent from '../PackageContent';

interface PackageItem {
  title: string;
  description: string;
  templateCount: number;
  slug: string;
}

interface PackageItemsListProps {
  packageItems: PackageItem[];
  backgroundColor: string;
  textColor: string;
  onPackageClick: (packageName: string) => void;
}

const PackageItemsList = ({
  packageItems,
  backgroundColor,
  textColor,
  onPackageClick
}: PackageItemsListProps) => {
  return (
    <div className={`flex-1 p-4 flex flex-col space-y-4 ${backgroundColor} ${textColor === "white" ? "text-white" : ""}`}>
      {packageItems.map((item, idx) => (
        <PackageContent 
          key={idx}
          title={item.title} 
          description={item.description} 
          color="" 
          templateCount={item.templateCount}
          onClick={() => onPackageClick(item.slug)}
        />
      ))}
    </div>
  );
};

export default PackageItemsList;

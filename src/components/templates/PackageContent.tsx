
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PackageContentProps {
  title: string;
  description: string;
  color: string;
  templateCount?: number;
  onClick?: () => void;
}

const PackageContent = ({
  title,
  description,
  color,
  templateCount,
  onClick
}: PackageContentProps) => (
  <div onClick={onClick} className={`${color}`}>
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-sm">{description}</p>
    {templateCount && (
      <div className="mt-2">
        <Badge variant="outline" className="bg-white/50">
          {templateCount} Templates
        </Badge>
      </div>
    )}
  </div>
);

export default PackageContent;

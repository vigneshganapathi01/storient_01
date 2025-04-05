
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PackageInfo = () => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">1) Structure of pack & template details</h3>
            <p className="text-muted-foreground">
              This package contains a structured set of templates designed to help you create
              professional content efficiently. Each template is customizable and follows
              best practices for effective communication.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-2">2) Key Elements of a pack (description)</h3>
            <p className="text-muted-foreground">
              Our templates include carefully crafted sections with placeholder text,
              formatting guidelines, and design elements that help you maintain consistency
              across your communications. The package is designed to save you time while
              ensuring professional results.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageInfo;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PackageOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Messaging section</h3>
          <p className="text-muted-foreground">
            This package includes professionally designed templates to help you craft compelling messages
            that resonate with your audience and drive action.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Video trailer section</h3>
          <div className="bg-gray-100 rounded-md h-48 flex items-center justify-center">
            <p className="text-muted-foreground">Video preview coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageOverview;

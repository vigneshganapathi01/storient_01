
import React from 'react';
import { Package2 } from 'lucide-react';

const EmptyTemplateState = () => {
  return (
    <div className="col-span-full text-center py-12 flex flex-col items-center gap-3">
      <Package2 className="h-12 w-12 text-muted-foreground" />
      <h3 className="text-lg font-medium">No matching templates</h3>
      <p className="text-muted-foreground">No templates match your selected category. Try adjusting your filters.</p>
    </div>
  );
};

export default EmptyTemplateState;

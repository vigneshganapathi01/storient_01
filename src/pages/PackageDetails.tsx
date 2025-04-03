
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

const PackageDetails = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  
  // Format package name from URL
  const formatPackageName = (id: string) => {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const packageName = packageId ? formatPackageName(packageId) : 'Package';
  const packagePrice = "$99"; // In a real app, this would be fetched from a database
  
  const handleBuyNow = () => {
    toast.success(`${packageName} added to cart`);
    navigate('/cart');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-brand-blue">Package Details</h1>
            <h2 className="text-2xl font-semibold mb-6">{packageName}</h2>
          </div>

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

          <Card className="mb-8">
            <CardContent className="p-6 flex justify-between items-center">
              <div className="text-2xl font-bold">{packagePrice}</div>
              <Button 
                className="bg-brand-blue hover:bg-brand-blue/90"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">1) Structure of pack + template details</h3>
                  <p className="text-muted-foreground">
                    This package contains a structured set of templates designed to help you create
                    professional content efficiently. Each template is customizable and follows
                    best practices for effective communication.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">2) Key Elements of a pack (description)</h3>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetails;

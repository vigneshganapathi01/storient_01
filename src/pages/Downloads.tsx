
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Download, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Sample data - In a real app, this would come from the database
const samplePurchases = [
  {
    id: '1',
    type: 'single',
    title: 'Modern Dashboard Template',
    description: 'A clean, responsive dashboard template with dark mode support.',
    purchaseDate: '2023-05-15',
    price: '$49',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    type: 'pack',
    title: 'E-commerce Starter Pack',
    description: 'Complete set of templates for building an online store.',
    purchaseDate: '2023-06-22',
    price: '$129',
    templates: [
      { name: 'Product Page', downloads: 3 },
      { name: 'Checkout Process', downloads: 2 },
      { name: 'User Dashboard', downloads: 5 },
    ],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    type: 'single',
    title: 'Portfolio Template',
    description: 'Showcase your work with this elegant portfolio template.',
    purchaseDate: '2023-07-10',
    price: '$39',
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1974&auto=format&fit=crop'
  }
];

const Downloads: React.FC = () => {
  const { user, isLoading } = useAuth();

  // Redirect to login if not authenticated
  if (!isLoading && !user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <h1 className="text-4xl font-bold mb-6">My Downloads</h1>
          <p className="text-muted-foreground mb-12">
            Access and download your purchased templates and packs.
          </p>

          {samplePurchases.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl mb-2">You haven't purchased any templates yet.</h2>
              <p className="text-muted-foreground mb-6">Browse our collection to find templates that fit your needs.</p>
              <Button onClick={() => window.location.href = '/templates'}>
                Browse Templates
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {samplePurchases.map((purchase) => (
                <Card key={purchase.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={purchase.image} 
                      alt={purchase.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{purchase.title}</CardTitle>
                      <Badge variant={purchase.type === 'pack' ? 'secondary' : 'outline'}>
                        {purchase.type === 'pack' ? 'Pack' : 'Single'}
                      </Badge>
                    </div>
                    <CardDescription>{purchase.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-sm">
                      <p><span className="font-medium">Purchased:</span> {purchase.purchaseDate}</p>
                      <p><span className="font-medium">Price:</span> {purchase.price}</p>
                    </div>
                    
                    {purchase.type === 'pack' && purchase.templates && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Included Templates:</h4>
                        <ul className="text-sm space-y-1">
                          {purchase.templates.map((template, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{template.name}</span>
                              <span className="text-muted-foreground">{template.downloads} downloads</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button className="w-full" size="sm">
                      {purchase.type === 'pack' ? <Package className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
                      {purchase.type === 'pack' ? 'Download Pack' : 'Download Template'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Downloads;

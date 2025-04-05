
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Download, Package, Loader2 } from 'lucide-react';
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
import { supabase } from '@/integrations/supabase/client';
import { PurchaseHistoryItem } from '@/types/purchase';
import { useToast } from '@/hooks/use-toast';

const Downloads: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [purchases, setPurchases] = useState<PurchaseHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Use type assertion to fix TypeScript error
        const { data, error } = await (supabase
          .from('purchase_history' as any)
          .select('*')
          .order('purchase_date', { ascending: false }) as any);
        
        if (error) {
          console.error('Error fetching purchase history:', error);
          toast({
            title: "Error",
            description: "Failed to load purchase history. Please try again.",
            variant: "destructive"
          });
          return;
        }
        
        // Cast the data to the correct type
        setPurchases(data as unknown as PurchaseHistoryItem[]);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchPurchaseHistory();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
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

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : purchases.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl mb-2">You haven't purchased any templates yet.</h2>
              <p className="text-muted-foreground mb-6">Browse our collection to find templates that fit your needs.</p>
              <Button onClick={() => window.location.href = '/templates'}>
                Browse Templates
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchases.map((purchase) => (
                <Card key={purchase.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-video overflow-hidden bg-gray-100 flex items-center justify-center">
                    {purchase.items[0]?.image ? (
                      <img 
                        src={purchase.items[0].image} 
                        alt={purchase.items[0].title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    ) : (
                      <Package className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>
                        {purchase.items.length > 1 
                          ? `${purchase.items.length} Templates` 
                          : purchase.items[0]?.title || "Purchase"}
                      </CardTitle>
                      <Badge variant={purchase.items.length > 1 ? 'secondary' : 'outline'}>
                        {purchase.items.length > 1 ? 'Pack' : 'Single'}
                      </Badge>
                    </div>
                    <CardDescription>
                      {new Date(purchase.purchase_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-sm">
                      <p><span className="font-medium">Status:</span> {purchase.payment_status}</p>
                      <p><span className="font-medium">Total:</span> ${parseFloat(purchase.total_amount.toString()).toFixed(2)}</p>
                    </div>
                    
                    {purchase.items.length > 1 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Included Templates:</h4>
                        <ul className="text-sm space-y-1">
                          {purchase.items.map((item, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{item.title}</span>
                              <span className="text-muted-foreground">
                                ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button className="w-full" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
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

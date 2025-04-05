
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronDown, ShoppingCart, LogIn } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

// Define template pack types
interface TemplatePack {
  id: string; // Using UUID from database
  title: string;
  description: string;
  price: number;
  color: string;
  templateCount?: number;
}

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [pendingPackage, setPendingPackage] = useState<{ name: string, price: number, id: string } | null>(null);
  const [templatePacks, setTemplatePacks] = useState<{[key: string]: TemplatePack[]}>({
    '99': [],
    '149': [],
    '199': [],
    '499': [],
    '999': []
  });
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const {
    addToCart,
    isAuthenticated
  } = useCart();

  // Fetch template packs from database
  useEffect(() => {
    const fetchTemplatePacks = async () => {
      try {
        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Group templates by price
          const grouped = {
            '99': data.filter(item => item.price === 99).map(item => ({
              id: item.id,
              title: item.title,
              description: item.description || '',
              price: item.price,
              color: 'bg-[#f2f2f2]',
              templateCount: Math.floor(Math.random() * 10) + 5, // For demo purposes
            })),
            '149': data.filter(item => item.price === 149).map(item => ({
              id: item.id,
              title: item.title,
              description: item.description || '',
              price: item.price,
              color: 'bg-[#ccebff]',
              templateCount: Math.floor(Math.random() * 10) + 5,
            })),
            '199': data.filter(item => item.price === 199).map(item => ({
              id: item.id,
              title: item.title,
              description: item.description || '',
              price: item.price,
              color: 'bg-[#99d7fe]',
              templateCount: Math.floor(Math.random() * 10) + 10,
            })),
            '499': [{
              id: data.find(item => item.price === 499)?.id || 'storytelling-masterclass',
              title: 'Storytelling Masterclass',
              description: 'Your comprehensive guide to mastering enterprise storytelling, packed with strategies that build credibility and deliver business success.',
              price: 499,
              color: 'bg-[#0074bf]',
              templateCount: 35,
            }],
            '999': [{
              id: data.find(item => item.price === 999)?.id || 'full-access-bundle',
              title: 'Full Access Bundle',
              description: 'Your All-in-One Toolkit for Winning & Growing Future-proof Enterprise Success',
              price: 999,
              color: 'bg-[#002060]',
              templateCount: 100,
            }]
          };
          setTemplatePacks(grouped);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast.error('Failed to load templates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplatePacks();
  }, []);

  const handleAddToCart = async (packageName: string, price: number, templateId: string) => {
    if (!isAuthenticated) {
      setPendingPackage({ name: packageName, price, id: templateId });
      setLoginDialogOpen(true);
      return;
    }

    try {
      await addToCart({
        id: templateId, // Using actual UUID from database
        title: packageName,
        price: price,
        image: '/placeholder.svg'
      });
      toast.success(`${packageName} added to cart!`);
      navigate('/cart');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error(`Failed to add to cart: ${error.message}`);
    }
  };

  const navigateToPackageDetails = (packageId: string) => {
    navigate(`/package-details/${packageId}`);
  };

  const handleLogin = () => {
    setLoginDialogOpen(false);
    navigate('/signin');
  };

  const PackageContent = ({
    title,
    description,
    color,
    templateCount,
    onClick
  }: {
    title: string;
    description: string;
    color: string;
    templateCount?: number;
    onClick?: () => void;
  }) => (
    <div className={`p-4 h-full ${color} rounded-md cursor-pointer hover:shadow-md transition-all`} onClick={onClick}>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm">{description}</p>
      {templateCount && <div className="mt-2">
          <Badge variant="outline" className="bg-white/50">
            {templateCount} Templates
          </Badge>
        </div>}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-brand-blue">Browse Templates</h1>
              <p className="text-muted-foreground">
                Discover our collection of premium templates designed for professionals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0">
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
          </div>

          {/* Template Pricing Table */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-8 border-t pt-6">
            {/* Package 1 - $99 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b bg-[#f2f2f2]">
                <h2 className="text-3xl font-bold text-brand-blue">$99</h2>
                <p className="text-sm text-muted-foreground">per pack</p>
                <p className="text-xs text-muted-foreground">from below list</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                {templatePacks['99'].length > 0 ? (
                  templatePacks['99'].map((pack) => (
                    <PackageContent
                      key={pack.id}
                      title={pack.title} 
                      description={pack.description}
                      color={pack.color}
                      templateCount={pack.templateCount}
                      onClick={() => navigateToPackageDetails(pack.id)}
                    />
                  ))
                ) : (
                  <>
                    <PackageContent 
                      title="Pitches & Proof of Concepts" 
                      description="Turn your ideas into winning pitches that build trust and urgency."
                      color="bg-[#f2f2f2]"
                      templateCount={12}
                    />
                    <PackageContent
                      title="Case Studies"
                      description="Share your results with compelling case study templates designed to highlight impact, ROI, and customer success stories."
                      color="bg-[#f2f2f2]"
                      templateCount={8}
                    />
                  </>
                )}
              </div>
              
              <div className="p-4 mt-auto">
                <Button 
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center"
                  onClick={() => {
                    const pack = templatePacks['99'][0];
                    handleAddToCart(
                      pack?.title || "$99 Package", 
                      99, 
                      pack?.id || "99-package-default-id"
                    );
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Package 2 - $149 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b bg-[#ccebff]">
                <h2 className="text-3xl font-bold text-brand-blue">$149</h2>
                <p className="text-sm text-muted-foreground">per pack</p>
                <p className="text-xs text-muted-foreground">from below list</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                {templatePacks['149'].length > 0 ? (
                  templatePacks['149'].map((pack) => (
                    <PackageContent
                      key={pack.id}
                      title={pack.title} 
                      description={pack.description}
                      color={pack.color}
                      templateCount={pack.templateCount}
                      onClick={() => navigateToPackageDetails(pack.id)}
                    />
                  ))
                ) : (
                  <>
                    <PackageContent 
                      title="Workshops" 
                      description="Facilitate engaging and productive brainstorming sessions."
                      color="bg-[#ccebff]"
                      templateCount={15}
                    />
                    <PackageContent
                      title="Proposals"
                      description="Win pitch-ready deals with proposal templates designed to connect with decision-makers."
                      color="bg-[#ccebff]"
                      templateCount={7}
                    />
                  </>
                )}
              </div>
              
              <div className="p-4 mt-auto">
                <Button 
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center"
                  onClick={() => {
                    const pack = templatePacks['149'][0];
                    handleAddToCart(
                      pack?.title || "$149 Package", 
                      149, 
                      pack?.id || "149-package-default-id"
                    );
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Package 3 - $199 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b bg-[#99d7fe]">
                <h2 className="text-3xl font-bold text-brand-blue">$199</h2>
                <p className="text-sm text-muted-foreground">per pack</p>
                <p className="text-xs text-muted-foreground">from below list</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                {templatePacks['199'].length > 0 ? (
                  templatePacks['199'].map((pack) => (
                    <PackageContent
                      key={pack.id}
                      title={pack.title} 
                      description={pack.description}
                      color={pack.color}
                      templateCount={pack.templateCount}
                      onClick={() => navigateToPackageDetails(pack.id)}
                    />
                  ))
                ) : (
                  <>
                    <PackageContent 
                      title="Business Review Pack" 
                      description="MEPS, QBRs, and EBRs."
                      color="bg-[#99d7fe]"
                      templateCount={18}
                    />
                    <PackageContent
                      title="C-Suite Communication Strategy Pack"
                      description="Craft high-impact C-15s, Newsletter and Readouts that drive decisions."
                      color="bg-[#99d7fe]"
                      templateCount={14}
                    />
                  </>
                )}
              </div>
              
              <div className="p-4 mt-auto">
                <Button 
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center"
                  onClick={() => {
                    const pack = templatePacks['199'][0];
                    handleAddToCart(
                      pack?.title || "$199 Package", 
                      199, 
                      pack?.id || "199-package-default-id"
                    );
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Package 4 - $499 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b bg-[#0074bf]">
                <h2 className="text-3xl font-bold text-white">$499</h2>
                <p className="text-xs text-white/90">Includes an exclusive 1:1</p>
                <p className="text-xs text-white/90">consult with our team</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                <div className="bg-[#0074bf] rounded-md p-6 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-all text-white" onClick={() => navigateToPackageDetails(templatePacks['499'][0]?.id || "storytelling-masterclass")}>
                  <h3 className="font-bold text-xl mb-3">{templatePacks['499'][0]?.title || "Storytelling Masterclass"}</h3>
                  <p className="text-sm mb-4">{templatePacks['499'][0]?.description || "Your comprehensive guide to mastering enterprise storytelling, packed with strategies that build credibility and deliver business success."}</p>
                  <Badge variant="outline" className="bg-white/20 text-white">
                    {templatePacks['499'][0]?.templateCount || 35} Templates
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 mt-auto">
                <Button 
                  className="w-full bg-white text-[#0074bf] hover:bg-white/90 flex items-center justify-center"
                  onClick={() => {
                    const pack = templatePacks['499'][0];
                    handleAddToCart(
                      pack?.title || "Storytelling Masterclass", 
                      499, 
                      pack?.id || "499-package-default-id"
                    );
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Package 5 - $999 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b bg-[#002060]">
                <h2 className="text-3xl font-bold text-white">$999</h2>
                <p className="text-xs text-white/90">All 10 packs with</p>
                <p className="text-xs text-white/90">Lifetime Updates</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                <div className="bg-[#002060] rounded-md p-6 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-all text-white" onClick={() => navigateToPackageDetails(templatePacks['999'][0]?.id || "full-access-bundle")}>
                  <h3 className="font-bold text-xl mb-3">{templatePacks['999'][0]?.title || "Full Access Bundle"}</h3>
                  <p className="text-sm mb-4">{templatePacks['999'][0]?.description || "Your All-in-One Toolkit for Winning & Growing Future-proof Enterprise Success"}</p>
                  <Badge variant="outline" className="bg-white/20 text-white">
                    {templatePacks['999'][0]?.templateCount || 100}+ Templates
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 mt-auto">
                <Button 
                  className="w-full bg-white text-[#002060] hover:bg-white/90 flex items-center justify-center"
                  onClick={() => {
                    const pack = templatePacks['999'][0];
                    handleAddToCart(
                      pack?.title || "Full Access Bundle", 
                      999, 
                      pack?.id || "999-package-default-id"
                    );
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to add items to your cart
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <LogIn className="h-16 w-16 text-brand-blue" />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setLoginDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="mt-2 sm:mt-0 bg-brand-blue" onClick={handleLogin}>
              Login Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Templates;

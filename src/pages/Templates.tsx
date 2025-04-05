
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
import { fetchTemplates } from '@/services/templateService';
import { Card } from '@/components/ui/card';

const PackageContent = ({
  title,
  description,
  color,
  templateCount,
  onClick,
  imageUrl
}: {
  title: string;
  description: string;
  color: string;
  templateCount?: number;
  onClick?: () => void;
  imageUrl?: string;
}) => (
  <div className={`p-4 h-full ${color} rounded-md cursor-pointer hover:shadow-md transition-all`} onClick={onClick}>
    {imageUrl && (
      <div className="flex justify-center mb-3">
        <div className="bg-white/30 rounded-full w-16 h-16 flex items-center justify-center">
          <img src={imageUrl} alt={title} className="w-10 h-10 object-contain" />
        </div>
      </div>
    )}
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-sm">{description}</p>
    {templateCount && <div className="mt-2">
        <Badge variant="outline" className="bg-white/50">
          {templateCount} Templates
        </Badge>
      </div>}
  </div>
);

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [pendingPackage, setPendingPackage] = useState<{ id: string, name: string, price: number } | null>(null);
  const navigate = useNavigate();
  const {
    addToCart,
    isAuthenticated
  } = useCart();

  const handleAddToCart = async (packageId: string, packageName: string, price: number) => {
    if (!isAuthenticated) {
      setPendingPackage({ id: packageId, name: packageName, price });
      setLoginDialogOpen(true);
      return;
    }

    try {
      await addToCart({
        id: packageId,
        title: packageName,
        price: price,
        image: '/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png'
      });
      toast.success(`${packageName} added to cart!`);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  const navigateToPackageDetails = (packageSlug: string) => {
    navigate(`/package-details/${packageSlug}`);
  };

  const handleLogin = () => {
    setLoginDialogOpen(false);
    navigate('/signin');
  };

  return <div className="flex flex-col min-h-screen">
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
                <PackageContent 
                  title="Pitches & Proof of Concepts" 
                  description="Turn your ideas into winning pitches that build trust and urgency." 
                  color="bg-[#f2f2f2]" 
                  templateCount={12} 
                  imageUrl="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png"
                  onClick={() => navigateToPackageDetails("pitches-proof-of-concepts")}
                />
                
                <PackageContent 
                  title="Case Studies" 
                  description="Share your results with compelling case study templates designed to highlight impact, ROI, and customer success stories." 
                  color="bg-[#f2f2f2]" 
                  templateCount={8} 
                  imageUrl="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png"
                  onClick={() => navigateToPackageDetails("case-studies")}
                />
                
                <PackageContent 
                  title="Point of Views" 
                  description="Establish thought leadership with impactful POV templates that empower teams to articulate insights and challenge norms." 
                  color="bg-[#f2f2f2]" 
                  templateCount={10} 
                  imageUrl="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png"
                  onClick={() => navigateToPackageDetails("point-of-views")} 
                />
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center" 
                  onClick={() => handleAddToCart("pitches-proof-of-concepts", "Pitches & Proof of Concepts", 99)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Package 2 - $129 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b bg-[#ccebff]">
                <h2 className="text-3xl font-bold text-brand-blue">$129</h2>
                <p className="text-sm text-muted-foreground">per pack</p>
                <p className="text-xs text-muted-foreground">from below list</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                <PackageContent 
                  title="Workshops" 
                  description="Facilitate engaging and productive brainstorming sessions." 
                  color="bg-[#ccebff]" 
                  templateCount={15} 
                  imageUrl="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png"
                  onClick={() => navigateToPackageDetails("workshops")} 
                />
                
                <PackageContent 
                  title="Proposals" 
                  description="Win pitch-ready deals with proposal templates designed to connect with decision-makers." 
                  color="bg-[#ccebff]" 
                  templateCount={7} 
                  imageUrl="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png"
                  onClick={() => navigateToPackageDetails("proposals")} 
                />
                
                <PackageContent 
                  title="Request for Proposals" 
                  description="Respond confidently to RFPs and RFIs with structured templates designed to precisely address client pain points." 
                  color="bg-[#ccebff]" 
                  templateCount={9} 
                  imageUrl="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png"
                  onClick={() => navigateToPackageDetails("request-for-proposals")} 
                />
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center" 
                  onClick={() => handleAddToCart("workshops", "Workshops", 129)}>
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
                <PackageContent 
                  title="Business Review Pack" 
                  description="MEPS, QBRs, and EBRs." 
                  color="bg-[#99d7fe]" 
                  templateCount={18} 
                  imageUrl="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png"
                  onClick={() => navigateToPackageDetails("business-review-pack")} 
                />
                
                <PackageContent 
                  title="C-Suite Communication Strategy Pack" 
                  description="Craft high-impact C-15s, Newsletter and Readouts that drive decisions." 
                  color="bg-[#99d7fe]" 
                  templateCount={14} 
                  imageUrl="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png"
                  onClick={() => navigateToPackageDetails("c-suite-communication-strategy-pack")} 
                />
                
                <PackageContent 
                  title="The Divergent Deck" 
                  description="Frameworks for Upcoming Training & Communication." 
                  color="bg-[#99d7fe]" 
                  templateCount={20} 
                  imageUrl="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png"
                  onClick={() => navigateToPackageDetails("the-divergent-deck")} 
                />
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center" 
                  onClick={() => handleAddToCart("business-review-pack", "Business Review Pack", 199)}>
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
              
              <div className="flex-1 p-4 flex flex-col">
                <div className="bg-[#0074bf] rounded-md p-6 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-all text-white" onClick={() => navigateToPackageDetails("storytelling-masterclass")}>
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                    <img src="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png" alt="Storytelling Masterclass" className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Storytelling Masterclass</h3>
                  <p className="text-sm mb-4">Your comprehensive guide to mastering enterprise storytelling, packed with strategies that build credibility and deliver business success.</p>
                  <Badge variant="outline" className="bg-white/20 text-white">
                    35 Templates
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-white text-[#0074bf] hover:bg-white/90 flex items-center justify-center" 
                  onClick={() => handleAddToCart("storytelling-masterclass", "Storytelling Masterclass", 499)}>
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
              
              <div className="flex-1 p-4 flex flex-col">
                <div className="bg-[#002060] rounded-md p-6 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-all text-white" onClick={() => navigateToPackageDetails("full-access-bundle")}>
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                    <img src="/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png" alt="Full Access Bundle" className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Full Access Bundle</h3>
                  <p className="text-sm mb-4">Your All-in-One Toolkit for Winning & Growing Future-proof Enterprise Success</p>
                  <Badge variant="outline" className="bg-white/20 text-white">
                    100+ Templates
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-white text-[#002060] hover:bg-white/90 flex items-center justify-center" 
                  onClick={() => handleAddToCart("full-access-bundle", "Full Access Bundle", 999)}>
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
    </div>;
};

export default Templates;


import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronDown, ShoppingCart, LogIn, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { fetchTemplates } from '@/services/templateService';
import { Template } from '@/services/templateService';

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
}) => <div className={`p-4 h-full ${color} rounded-md cursor-pointer hover:shadow-md transition-all`} onClick={onClick}>
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-sm">{description}</p>
    {templateCount && <div className="mt-2">
        <Badge variant="outline" className="bg-white/50">
          {templateCount} Templates
        </Badge>
      </div>}
  </div>;

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [pendingPackage, setPendingPackage] = useState<{ name: string, price: number, id: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  
  const navigate = useNavigate();
  const {
    addToCart,
    isAuthenticated
  } = useCart();

  // Fetch template data
  useEffect(() => {
    const getTemplates = async () => {
      setIsLoading(true);
      try {
        const templatesData = await fetchTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast.error('Failed to load templates');
      } finally {
        setIsLoading(false);
      }
    };
    
    getTemplates();
  }, []);
  
  // Find template by name or create a mock one with valid UUID
  const getTemplateByName = (name: string) => {
    const foundTemplate = templates.find(t => t.title.toLowerCase().includes(name.toLowerCase()));
    if (foundTemplate) {
      return {
        id: foundTemplate.id, // This is a valid UUID from the database
        title: foundTemplate.title,
        price: foundTemplate.price,
        image: foundTemplate.image_url
      };
    }
    
    // If we can't find a matching template, use the first one
    if (templates.length > 0) {
      return {
        id: templates[0].id,
        title: name,
        price: getPackagePrice(name),
        image: '/placeholder.svg'
      };
    }
    
    // Fallback with a generic error message
    toast.error('Template data is not available. Please try again later.');
    return null;
  };
  
  // Helper to get price based on package name
  const getPackagePrice = (packageName: string): number => {
    if (packageName.includes('$99')) return 99;
    if (packageName.includes('$149')) return 149;
    if (packageName.includes('$199')) return 199;
    if (packageName.includes('Storytelling')) return 499;
    if (packageName.includes('Full Access')) return 999;
    return 99; // Default price
  };

  const handleAddToCart = async (packageName: string, price: number) => {
    if (!isAuthenticated) {
      const template = getTemplateByName(packageName);
      if (template) {
        setPendingPackage({ name: packageName, price, id: template.id });
        setLoginDialogOpen(true);
      }
      return;
    }

    try {
      const template = getTemplateByName(packageName);
      if (!template) return;
      
      await addToCart({
        id: template.id, // Using valid UUID from database
        title: packageName,
        price: price,
        image: template.image || '/placeholder.svg'
      });
      
      toast.success(`${packageName} added to cart!`);
      navigate('/cart');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error(`Failed to add to cart: ${error.message}`);
    }
  };

  const navigateToPackageDetails = (packageName: string) => {
    const template = getTemplateByName(packageName);
    if (template) {
      navigate(`/package-details/${packageName.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      toast.error('Package details not available');
    }
  };

  const handleLogin = () => {
    setLoginDialogOpen(false);
    navigate('/signin');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-brand-blue mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading templates...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                <PackageContent title="Pitches & Proof of Concepts" description="Turn your ideas into winning pitches that build trust and urgency." color="bg-[#f2f2f2]" templateCount={12} onClick={() => navigateToPackageDetails("Pitches & Proof of Concepts")} />
                
                <PackageContent title="Case Studies" description="Share your results with compelling case study templates designed to highlight impact, ROI, and customer success stories." color="bg-[#f2f2f2]" templateCount={8} onClick={() => navigateToPackageDetails("Case Studies")} />
                
                <PackageContent title="Point of Views" description="Establish thought leadership with impactful POV templates that empower teams to articulate insights and challenge norms." color="bg-[#f2f2f2]" templateCount={10} onClick={() => navigateToPackageDetails("Point of Views")} />
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center" onClick={() => handleAddToCart("$99 Package", 99)}>
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
                <PackageContent title="Workshops" description="Facilitate engaging and productive brainstorming sessions." color="bg-[#ccebff]" templateCount={15} onClick={() => navigateToPackageDetails("Workshops")} />
                
                <PackageContent title="Proposals" description="Win pitch-ready deals with proposal templates designed to connect with decision-makers." color="bg-[#ccebff]" templateCount={7} onClick={() => navigateToPackageDetails("Proposals")} />
                
                <PackageContent title="Request for Proposals" description="Respond confidently to RFPs and RFIs with structured templates designed to precisely address client pain points." color="bg-[#ccebff]" templateCount={9} onClick={() => navigateToPackageDetails("Request for Proposals")} />
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center" onClick={() => handleAddToCart("$149 Package", 149)}>
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
                <PackageContent title="Business Review Pack" description="MEPS, QBRs, and EBRs." color="bg-[#99d7fe]" templateCount={18} onClick={() => navigateToPackageDetails("Business Review Pack")} />
                
                <PackageContent title="C-Suite Communication Strategy Pack" description="Craft high-impact C-15s, Newsletter and Readouts that drive decisions." color="bg-[#99d7fe]" templateCount={14} onClick={() => navigateToPackageDetails("C-Suite Communication Strategy Pack")} />
                
                <PackageContent title="The Divergent Deck" description="Frameworks for Upcoming Training & Communication." color="bg-[#99d7fe]" templateCount={20} onClick={() => navigateToPackageDetails("The Divergent Deck")} />
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center" onClick={() => handleAddToCart("$199 Package", 199)}>
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
                <div className="bg-[#0074bf] rounded-md p-6 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-all text-white" onClick={() => navigateToPackageDetails("Storytelling Masterclass")}>
                  <h3 className="font-bold text-xl mb-3">Storytelling Masterclass</h3>
                  <p className="text-sm mb-4">Your comprehensive guide to mastering enterprise storytelling, packed with strategies that build credibility and deliver business success.</p>
                  <Badge variant="outline" className="bg-white/20 text-white">
                    35 Templates
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-white text-[#0074bf] hover:bg-white/90 flex items-center justify-center" onClick={() => handleAddToCart("Storytelling Masterclass", 499)}>
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
                <div className="bg-[#002060] rounded-md p-6 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-all text-white" onClick={() => navigateToPackageDetails("Full Access Bundle")}>
                  <h3 className="font-bold text-xl mb-3">Full Access Bundle</h3>
                  <p className="text-sm mb-4">Your All-in-One Toolkit for Winning & Growing Future-proof Enterprise Success</p>
                  <Badge variant="outline" className="bg-white/20 text-white">
                    100+ Templates
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-white text-[#002060] hover:bg-white/90 flex items-center justify-center" onClick={() => handleAddToCart("Full Access Bundle", 999)}>
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

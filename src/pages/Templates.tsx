
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronDown, ShoppingCart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

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
}) => <div onClick={onClick} className="bg-[#f2f2f2]">
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
  const navigate = useNavigate();
  const {
    addToCart
  } = useCart();

  const handleAddToCart = async (packageName: string, price: number) => {
    try {
      await addToCart({
        id: packageName.toLowerCase().replace(/\s+/g, '-'),
        title: packageName,
        price: price,
        image: '/placeholder.svg'
      });
      toast.success(`${packageName} added to cart!`);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  const navigateToPackageDetails = (packageName: string) => {
    navigate(`/package-details/${packageName.toLowerCase().replace(/\s+/g, '-')}`);
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
                <PackageContent title="Field Set of Questions" description="Turn your cards into winning recipes for clear, structured frameworks that build trust and urgency." color="from-blue-50 to-blue-100" templateCount={12} onClick={() => navigateToPackageDetails("Field Set of Questions")} />
                
                <PackageContent title="Case Studies" description="Share your results with compelling case study templates designed to highlight impact, ROI, and customer success stories." color="from-purple-50 to-purple-100" templateCount={8} onClick={() => navigateToPackageDetails("Case Studies")} />
                
                <PackageContent title="Point of Views" description="Establish thought leadership with impactful POV templates that empower teams to articulate insights and challenge norms." color="from-green-50 to-green-100" templateCount={10} onClick={() => navigateToPackageDetails("Point of Views")} />
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
                <PackageContent title="Workshops" description="Facilitate engaging and productive brainstorming sessions." color="from-cyan-50 to-cyan-100" templateCount={15} onClick={() => navigateToPackageDetails("Workshops")} />
                
                <PackageContent title="Proposals" description="Win pitch-ready deals with proposal templates designed to connect with decision-makers." color="from-amber-50 to-amber-100" templateCount={7} onClick={() => navigateToPackageDetails("Proposals")} />
                
                <PackageContent title="Client Proposals" description="Respond confidently to RFPs and RFIs with structured templates designed to precisely address client pain points." color="from-rose-50 to-rose-100" templateCount={9} onClick={() => navigateToPackageDetails("Client Proposals")} />
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
                <PackageContent title="Business Review Pack" description="MEPS, QBRs, and EBRs." color="from-blue-100 to-blue-200" templateCount={18} onClick={() => navigateToPackageDetails("Business Review Pack")} />
                
                <PackageContent title="C-Suite Communication Strategy Pack" description="Craft high-impact C-15s, Newsletter and Readouts that drive decisions." color="from-indigo-100 to-indigo-200" templateCount={14} onClick={() => navigateToPackageDetails("C-Suite Communication Strategy Pack")} />
                
                <PackageContent title="The Divergent Deck" description="Frameworks for Upcoming Training & Communication." color="from-sky-100 to-sky-200" templateCount={20} onClick={() => navigateToPackageDetails("The Divergent Deck")} />
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
                <h2 className="text-3xl font-bold text-zinc-50">$499</h2>
                <p className="text-xs text-muted-foreground">Includes an exclusive 1:1</p>
                <p className="text-xs text-muted-foreground">consult with our team</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-md p-6 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-all" onClick={() => navigateToPackageDetails("Storytelling Masterclass")}>
                  <h3 className="font-bold text-xl text-brand-blue mb-3">Storytelling Masterclass</h3>
                  <p className="text-sm mb-4">Your comprehensive guide to mastering enterprise storytelling, packed with strategies that build credibility and deliver business success.</p>
                  <Badge variant="outline" className="bg-white/50">
                    35 Templates
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 flex items-center justify-center" onClick={() => handleAddToCart("Storytelling Masterclass", 499)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Package 5 - $999 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b bg-[#002060]">
                <h2 className="text-3xl font-bold text-zinc-50">$999</h2>
                <p className="text-xs text-muted-foreground">All 10 packs with</p>
                <p className="text-xs text-muted-foreground">Lifetime Updates</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                <div onClick={() => navigateToPackageDetails("Full Access Bundle")} className="bg-gradient-to-b from-purple-100 to-purple-200 rounded-md p-6 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-all bg-brand-blue">
                  <h3 className="font-bold text-xl mb-3 text-zinc-50">Full Access Bundle</h3>
                  <p className="text-sm mb-4 text-zinc-50">Your All-in-One Toolkit for Winning & Growing Future-proof Enterprise Success</p>
                  <Badge variant="outline" className="bg-white/50">
                    100+ Templates
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 mt-auto">
                <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 flex items-center justify-center" onClick={() => handleAddToCart("Full Access Bundle", 999)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};

export default Templates;

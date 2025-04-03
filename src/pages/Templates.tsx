
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronDown, CreditCard } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PackageContent = ({ title, description, color }: { title: string, description: string, color: string }) => (
  <div className={`p-4 h-full bg-gradient-to-b ${color} rounded-md`}>
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const navigate = useNavigate();
  
  const handleAddToCart = (packageName: string) => {
    toast.success(`${packageName} added to cart`);
  };

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
              <div className="p-4 text-center border-b">
                <h2 className="text-3xl font-bold text-brand-blue">$99</h2>
                <p className="text-sm text-muted-foreground">per pack</p>
                <p className="text-xs text-muted-foreground">from below list</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                <PackageContent 
                  title="Field Set of Questions" 
                  description="Turn your cards into winning recipes for clear, structured frameworks that build trust and urgency."
                  color="from-blue-50 to-blue-100"
                />
                
                <PackageContent 
                  title="Case Studies" 
                  description="Share your results with compelling case study templates designed to highlight impact, ROI, and customer success stories."
                  color="from-purple-50 to-purple-100"
                />
                
                <PackageContent 
                  title="Point of Views" 
                  description="Establish thought leadership with impactful POV templates that empower teams to articulate insights and challenge norms."
                  color="from-green-50 to-green-100"
                />
              </div>
              
              <div className="p-4 mt-auto">
                <Button 
                  className="w-full bg-brand-blue hover:bg-brand-blue/90"
                  onClick={() => handleAddToCart("$99 Package")}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Package 2 - $149 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b">
                <h2 className="text-3xl font-bold text-brand-blue">$149</h2>
                <p className="text-sm text-muted-foreground">per pack</p>
                <p className="text-xs text-muted-foreground">from below list</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                <PackageContent 
                  title="Workshops" 
                  description="Facilitate engaging and productive brainstorming sessions."
                  color="from-cyan-50 to-cyan-100"
                />
                
                <PackageContent 
                  title="Proposals" 
                  description="Win pitch-ready deals with proposal templates designed to connect with decision-makers."
                  color="from-amber-50 to-amber-100"
                />
                
                <PackageContent 
                  title="Client Proposals" 
                  description="Respond confidently to RFPs and RFIs with structured templates designed to precisely address client pain points."
                  color="from-rose-50 to-rose-100"
                />
              </div>
              
              <div className="p-4 mt-auto">
                <Button 
                  className="w-full bg-brand-blue hover:bg-brand-blue/90"
                  onClick={() => handleAddToCart("$149 Package")}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Package 3 - $199 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b">
                <h2 className="text-3xl font-bold text-brand-blue">$199</h2>
                <p className="text-sm text-muted-foreground">per pack</p>
                <p className="text-xs text-muted-foreground">from below list</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4">
                <PackageContent 
                  title="Business Review Pack" 
                  description="MEPS, QBRs, and EBRs."
                  color="from-blue-100 to-blue-200"
                />
                
                <PackageContent 
                  title="C-Suite Communication Strategy Pack" 
                  description="Craft high-impact C-15s, Newsletter and Readouts that drive decisions."
                  color="from-indigo-100 to-indigo-200"
                />
                
                <PackageContent 
                  title="The Divergent Deck" 
                  description="Frameworks for Upcoming Training & Communication."
                  color="from-sky-100 to-sky-200"
                />
              </div>
              
              <div className="p-4 mt-auto">
                <Button 
                  className="w-full bg-brand-blue hover:bg-brand-blue/90"
                  onClick={() => handleAddToCart("$199 Package")}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Package 4 - $499 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b">
                <h2 className="text-3xl font-bold text-brand-blue">$499</h2>
                <p className="text-xs text-muted-foreground">Includes an exclusive 1:1</p>
                <p className="text-xs text-muted-foreground">consult with our team</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-md">
                <h3 className="font-bold text-xl text-center text-brand-blue">Storytelling Masterclass</h3>
                <p className="text-sm text-center">Your comprehensive guide to mastering enterprise storytelling, packed with strategies that build credibility and deliver business success.</p>
              </div>
              
              <div className="p-4 mt-auto">
                <Button 
                  className="w-full bg-brand-purple hover:bg-brand-purple/90"
                  onClick={() => handleAddToCart("Storytelling Masterclass")}
                >
                  Flagship
                </Button>
              </div>
            </div>
            
            {/* Package 5 - $999 */}
            <div className="border rounded-md flex flex-col">
              <div className="p-4 text-center border-b">
                <h2 className="text-3xl font-bold text-brand-blue">$999</h2>
                <p className="text-xs text-muted-foreground">All 10 packs with</p>
                <p className="text-xs text-muted-foreground">Lifetime Updates</p>
              </div>
              
              <div className="flex-1 p-4 flex flex-col space-y-4 bg-gradient-to-b from-purple-100 to-purple-200 rounded-md">
                <h3 className="font-bold text-xl text-center text-brand-blue">Full Access Bundle</h3>
                <p className="text-sm text-center">Your All-in-One Toolkit for Winning & Growing Future-proof Enterprise Success</p>
              </div>
              
              <div className="p-4 mt-auto">
                <Button 
                  className="w-full bg-brand-purple hover:bg-brand-purple/90"
                  onClick={() => handleAddToCart("Full Access Bundle")}
                >
                  Best Value
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;

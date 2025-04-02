
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Filter, Check, Eye, CreditCard } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const sampleTemplates = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    title: 'Modern Dashboard',
    price: 49,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    category: 'Admin',
    featured: true,
    type: 'React'
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    title: 'E-commerce Bundle',
    price: 129,
    discountPrice: 99,
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
    category: 'E-commerce',
    featured: true,
    type: 'React',
    isPack: true
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    title: 'Portfolio Template',
    price: 39,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1974&auto=format&fit=crop',
    category: 'Portfolio',
    featured: false,
    type: 'HTML'
  },
  {
    id: "423e4567-e89b-12d3-a456-426614174003",
    title: 'Blog Theme',
    price: 45,
    discountPrice: 35,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
    category: 'Blog',
    featured: false,
    type: 'WordPress'
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174004",
    title: 'Corporate Site',
    price: 59,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    category: 'Business',
    featured: false,
    type: 'HTML'
  },
  {
    id: "623e4567-e89b-12d3-a456-426614174005",
    title: 'Landing Page Pack',
    price: 79,
    discountPrice: 59,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    category: 'Landing',
    featured: true,
    type: 'HTML',
    isPack: true
  },
  {
    id: "723e4567-e89b-12d3-a456-426614174006",
    title: 'SaaS Dashboard',
    price: 69,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop',
    category: 'Admin',
    featured: false,
    type: 'React'
  },
  {
    id: "823e4567-e89b-12d3-a456-426614174007",
    title: 'Mobile App UI Kit',
    price: 89,
    discountPrice: 75,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    category: 'UI Kit',
    featured: true,
    type: 'Figma',
    isPack: true
  },
  {
    id: "923e4567-e89b-12d3-a456-426614174008",
    title: 'Restaurant Website',
    price: 49,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    category: 'Business',
    featured: false,
    type: 'WordPress'
  }
];

const categories = [
  'All Categories',
  'Admin',
  'E-commerce',
  'Portfolio',
  'Blog',
  'Business',
  'Landing',
  'UI Kit'
];

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const { addToCart } = useCart();

  const filteredTemplates = sampleTemplates
    .filter(template => selectedCategory === 'All Categories' || template.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'featured') {
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      } else if (sortBy === 'price-low') {
        const aPrice = a.discountPrice || a.price;
        const bPrice = b.discountPrice || b.price;
        return aPrice - bPrice;
      } else if (sortBy === 'price-high') {
        const aPrice = a.discountPrice || a.price;
        const bPrice = b.discountPrice || b.price;
        return bPrice - aPrice;
      } else if (sortBy === 'newest') {
        return b.id.localeCompare(a.id);
      }
      return 0;
    });

  const handleAddToCart = (template: any) => {
    addToCart({
      id: template.id,
      title: template.title,
      price: template.price,
      discountPrice: template.discountPrice,
      image: template.image,
      type: template.type,
      isPack: template.isPack,
    });
  };

  const handleBuyNow = (template: any) => {
    setSelectedTemplate(template);
    setShowPaymentDialog(true);
  };

  const handleConfirmOrder = () => {
    toast.success('Order confirmed! Thank you for your purchase.');
    setShowPaymentDialog(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-brand-blue">Browse Templates</h1>
              <p className="text-muted-foreground">
                Discover our collection of premium templates designed for professionals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  {template.featured && (
                    <Badge className="absolute top-3 left-3 bg-brand-purple text-white">
                      Featured
                    </Badge>
                  )}
                  {template.isPack && (
                    <Badge className="absolute top-3 right-3 bg-secondary">
                      Pack
                    </Badge>
                  )}
                </div>
                <CardContent className="flex-grow p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{template.title}</h3>
                    <Badge variant="outline">{template.type}</Badge>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <div className="space-x-2">
                        {template.discountPrice ? (
                          <>
                            <span className="text-2xl font-bold text-brand-blue">${template.discountPrice}</span>
                            <span className="text-lg text-muted-foreground line-through">${template.price}</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-brand-blue">${template.price}</span>
                        )}
                      </div>
                    </div>
                    <Badge>{template.category}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 px-5 pb-5">
                  <div className="w-full flex gap-2">
                    <Button 
                      className="flex-1 bg-brand-purple hover:bg-brand-purple/90"
                      onClick={() => handleBuyNow(template)}
                    >
                      <CreditCard className="h-4 w-4 mr-2" /> Buy Now
                    </Button>
                    <Button className="flex-1 bg-brand-blue hover:bg-brand-blue/90">
                      <Eye className="h-4 w-4 mr-2" /> Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-1 border-brand-lightBlue text-brand-lightBlue hover:bg-brand-lightBlue hover:text-white"
                      onClick={() => handleAddToCart(template)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Demo Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Review your order details below.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <img src={selectedTemplate.image} alt={selectedTemplate.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedTemplate.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    {selectedTemplate.isPack && <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs mr-2">Pack</span>}
                    {selectedTemplate.type}
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Price:</span>
                  <span>${selectedTemplate.price.toFixed(2)}</span>
                </div>
                {selectedTemplate.discountPrice && (
                  <div className="flex justify-between text-sm text-brand-purple">
                    <span>Discount:</span>
                    <span>-${(selectedTemplate.price - selectedTemplate.discountPrice).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2">
                  <span>Total:</span>
                  <span className="text-brand-blue">
                    ${(selectedTemplate.discountPrice || selectedTemplate.price).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md mt-4">
                <p className="text-center font-medium">Demo Payment - Payment Gateway Coming Soon</p>
                <p className="text-center text-sm text-muted-foreground mt-1">This is a demonstration only. No actual payment will be processed.</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
            <Button 
              className="bg-brand-blue hover:bg-brand-blue/90"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Templates;

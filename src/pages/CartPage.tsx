
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBrowseTemplates = () => {
    navigate('/templates');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-16 pb-16 md:pb-24">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8">Your Cart</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-10 md:p-16 text-center animate-fade-in">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl md:text-2xl font-bold mb-4">Cart Feature Currently Unavailable</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The cart functionality has been temporarily removed. Please browse our templates 
              and contact us directly for purchases.
            </p>
            <Button 
              className="bg-brand-blue hover:bg-brand-blue/90 transition-all"
              onClick={handleBrowseTemplates}
            >
              Browse Templates
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;

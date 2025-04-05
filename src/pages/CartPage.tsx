
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import CartItemDisplay from '@/components/cart/CartItemDisplay';
import OrderSummary from '@/components/cart/OrderSummary';
import LoginRequired from '@/components/cart/LoginRequired';

const CartPage: React.FC = () => {
  const { totalItems, total, subtotal, isLoading, fetchCartItems, isAuthenticated, applyPromoCode, items, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  
  // Fetch cart items when page loads
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      navigate('/signin');
      return;
    }
    
    if (totalItems === 0) {
      toast.error("Your cart is empty. Please add items before checkout.");
      return;
    }
    
    navigate('/payment', { state: { price: total, packageName: `Cart (${totalItems} items)` } });
  };

  const handleContinueShopping = () => {
    navigate('/templates');
  };

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    applyPromoCode(promoCode);
    setPromoCode('');
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleUpdateItemQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24">
          <h1 className="text-3xl font-bold text-[#002060] mb-8">Shopping Cart</h1>
          
          {!isAuthenticated ? (
            <LoginRequired />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <CartItemDisplay 
                items={items}
                isLoading={isLoading}
                handleContinueShopping={handleContinueShopping}
                handleRemoveItem={handleRemoveItem}
                handleUpdateItemQuantity={handleUpdateItemQuantity}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                handleApplyPromoCode={handleApplyPromoCode}
                clearCart={clearCart}
              />
              
              <div className="lg:col-span-1">
                <OrderSummary
                  isLoading={isLoading}
                  totalItems={totalItems}
                  subtotal={subtotal}
                  total={total}
                  handleCheckout={handleCheckout}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;

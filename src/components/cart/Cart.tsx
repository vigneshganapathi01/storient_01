
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartLoading from './CartLoading';
import EmptyCartState from './EmptyCartState';
import CartError from './CartError';
import CartMain from './CartMain';
import CartSummary from './CartSummary';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    subtotal,
    total,
    applyPromoCode,
    isLoading,
    fetchCartItems,
    isAuthenticated 
  } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  // Ensure cart items are loaded
  useEffect(() => {
    try {
      fetchCartItems();
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  }, [fetchCartItems]);

  const handleRemoveItem = async (id: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to modify your cart");
      navigate('/signin');
      return;
    }
    await removeFromCart(id);
  };

  const handleUpdateQuantity = async (id: string, currentQuantity: number, amount: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to modify your cart");
      navigate('/signin');
      return;
    }
    const newQuantity = Math.max(1, currentQuantity + amount);
    await updateQuantity(id, newQuantity);
  };

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    applyPromoCode(promoCode);
    setPromoCode('');
  };

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

  // Error state
  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-24">
        <h1 className="text-3xl font-bold mb-8 text-[#002060]">Shopping Cart</h1>
        <CartError retry={() => {
          fetchCartItems();
          setIsError(false);
        }} />
      </div>
    );
  }

  if (isLoading) {
    return <CartLoading />;
  }

  if (!isAuthenticated || items.length === 0) {
    return <EmptyCartState isAuthenticated={isAuthenticated} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-16">
      <h1 className="text-3xl font-bold mb-8 text-[#002060]">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CartMain
          items={items}
          totalItems={totalItems}
          handleUpdateQuantity={handleUpdateQuantity}
          handleRemoveItem={handleRemoveItem}
          clearCart={clearCart}
          handleContinueShopping={handleContinueShopping}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          handleApplyPromoCode={handleApplyPromoCode}
        />
        
        <div className="lg:col-span-1">
          <CartSummary
            totalItems={totalItems}
            subtotal={subtotal}
            total={total}
            handleCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;

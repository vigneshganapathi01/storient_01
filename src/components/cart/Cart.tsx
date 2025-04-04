
import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import CartItem from './CartItem';
import CartActions from './CartActions';
import EmptyCart from './EmptyCart';
import LoadingCart from './LoadingCart';

const Cart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    total, 
    isLoading,
    fetchCartItems 
  } = useCart();
  
  const navigate = useNavigate();

  // Ensure cart items are loaded
  useEffect(() => {
    // Force a refresh of cart items when component mounts
    fetchCartItems();
  }, []);

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    navigate('/payment', { state: { price: total, packageName: `Cart (${totalItems} items)` } });
  };

  const handleContinueShopping = () => {
    navigate('/templates');
  };

  if (isLoading) {
    return <LoadingCart />;
  }

  if (items.length === 0) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  return (
    <Card className="border border-gray-200 bg-white">
      <CardContent className="p-0">
        {items.map((item) => (
          <CartItem 
            key={item.id}
            item={item}
            onRemove={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
        
        <div className="p-6">
          <CartActions 
            onCheckout={handleCheckout}
            onContinueShopping={handleContinueShopping}
            onClearCart={clearCart}
            isEmpty={items.length === 0}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;

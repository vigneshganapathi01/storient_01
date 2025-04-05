
import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import CartLoading from './CartLoading';
import EmptyCartState from './EmptyCartState';
import CartItemList from './CartItemList';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    isLoading,
    fetchCartItems,
    isAuthenticated 
  } = useCart();
  
  const navigate = useNavigate();

  // Ensure cart items are loaded
  useEffect(() => {
    fetchCartItems();
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

  if (isLoading) {
    return <CartLoading />;
  }

  if (!isAuthenticated || items.length === 0) {
    return <EmptyCartState isAuthenticated={isAuthenticated} />;
  }

  return (
    <Card className="shadow-none border-0">
      <div className="p-0">
        <CartItemList 
          items={items}
          totalItems={totalItems}
          handleUpdateQuantity={handleUpdateQuantity}
          handleRemoveItem={handleRemoveItem}
          clearCart={clearCart}
        />
      </div>
    </Card>
  );
};

export default Cart;

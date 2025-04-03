import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { addToCartDB } from '@/services/templateService';

// Define the cart item type
interface CartItem {
  id: string;
  title: string;
  price: number;
  discountPrice?: number | null;
  image?: string;
  quantity: number;
  type?: string;
  isPack?: boolean;
}

interface CartContextProps {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
  applyPromoCode: (code: string) => void;
  promoCode: string | null;
  promoDiscount: number;
  isLoading: boolean;
  fetchCartItems: () => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.discountPrice || item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);
  const discount = items.reduce((sum, item) => {
    if (item.discountPrice && item.price > item.discountPrice) {
      return sum + ((item.price - item.discountPrice) * item.quantity);
    }
    return sum;
  }, 0);
  const total = subtotal - promoDiscount;

  // Load cart from Supabase when user logs in
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchCartItems();
      } else {
        // If no user but we had previous items, keep them in local state
        // They'll be synced when user logs in
        setIsLoading(false);
      }
    }
  }, [user, authLoading]);

  // Fetch cart items from Supabase
  const fetchCartItems = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      console.log("Fetching cart items for user:", user.id);
      
      // First get the cart items
      const { data: cartItems, error: cartError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);
      
      if (cartError) throw cartError;
      
      console.log("Cart items fetched:", cartItems);
      
      // If we got cart items, fetch the related template details for each
      if (cartItems && cartItems.length > 0) {
        const cartItemsWithTemplates: CartItem[] = [];
        
        // For each cart item, get the template details
        for (const item of cartItems) {
          console.log("Fetching template details for:", item.template_id);
          
          const { data: template, error: templateError } = await supabase
            .from('templates')
            .select('*')
            .eq('id', item.template_id)
            .single();
          
          if (templateError) {
            console.error('Error fetching template:', templateError);
            continue; // Skip this item if there's an error
          }
          
          console.log("Template data:", template);
          
          if (template) {
            // Transform data to match CartItem interface
            cartItemsWithTemplates.push({
              id: item.template_id,
              title: template.title,
              price: template.price,
              discountPrice: template.discount_percentage 
                ? Number((template.price * (1 - template.discount_percentage / 100)).toFixed(2))
                : null,
              image: template.image_url,
              quantity: item.quantity || 1,
              type: template.category,
              isPack: template.is_pack,
            });
          }
        }
        
        console.log("Final cart items with details:", cartItemsWithTemplates);
        setItems(cartItemsWithTemplates);
      } else {
        setItems([]);
      }
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      toast.error(`Failed to load cart: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    // If user is not logged in, redirect to sign in page
    if (!user) {
      // Store the item in session storage to add after sign in
      sessionStorage.setItem('pendingCartItem', JSON.stringify(item));
      
      // Redirect to sign in page
      toast.info("Please sign in to add items to your cart");
      navigate('/signin', { state: { returnTo: window.location.pathname } });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Check if item already exists in cart
      const existingItemIndex = items.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const newQuantity = items[existingItemIndex].quantity + 1;
        await updateQuantity(item.id, newQuantity);
        
        toast.success(`${item.title} quantity updated in cart!`);
      } else {
        // Otherwise add new item
        const newItem = { ...item, quantity: 1 };
        
        // Add item to database
        await addToCartDB(user.id, item.id);
        
        // Update local state
        setItems(prev => [...prev, newItem]);
        
        toast.success(`${item.title} added to cart!`);
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error(`Failed to add item to cart: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Remove from local state
      setItems(prev => prev.filter(item => item.id !== itemId));
      
      // Remove from database
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('template_id', itemId);
      
      if (error) throw error;
      
      toast.success('Item removed from cart');
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      toast.error(`Failed to remove item: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return;
    
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Update local state
      setItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
      
      // Update in database
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('template_id', itemId);
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast.error(`Failed to update quantity: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Clear local state
      setItems([]);
      
      // Clear from database
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setPromoCode(null);
      setPromoDiscount(0);
      
      toast.success('Cart cleared');
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast.error(`Failed to clear cart: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply promo code
  const applyPromoCode = (code: string) => {
    // Simple promo code implementation - in a real app you'd validate against a database
    const validPromos: Record<string, number> = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'TEMPLATE50': 50
    };
    
    if (code in validPromos) {
      setPromoCode(code);
      const discountAmount = (subtotal * validPromos[code]) / 100;
      setPromoDiscount(Number(discountAmount.toFixed(2)));
      toast.success(`Promo code applied! You saved $${discountAmount.toFixed(2)}`);
    } else {
      toast.error('Invalid promo code');
    }
  };

  // Check for pending cart item after login
  useEffect(() => {
    const handlePendingCartItem = async () => {
      const pendingItem = sessionStorage.getItem('pendingCartItem');
      
      if (user && pendingItem) {
        try {
          const item = JSON.parse(pendingItem);
          await addToCart(item);
          sessionStorage.removeItem('pendingCartItem');
        } catch (error) {
          console.error('Error adding pending item to cart:', error);
        }
      }
    };
    
    handlePendingCartItem();
  }, [user]);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      discount,
      total,
      applyPromoCode,
      promoCode,
      promoDiscount,
      isLoading,
      fetchCartItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

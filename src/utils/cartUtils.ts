
import { CartItem } from '@/types/cart';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { fetchTemplateById } from '@/services/templateService';

// Calculate totals from cart items
export const calculateCartTotals = (items: CartItem[]) => {
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

  return { totalItems, subtotal, discount };
};

// Fetch cart items from Supabase and return populated cart items
export const fetchCartItemsFromDB = async (userId: string): Promise<CartItem[]> => {
  if (!userId) {
    console.log("No user ID provided, returning empty cart");
    return [];
  }

  try {
    console.log("Fetching cart items for user:", userId);
    
    // First get the cart items
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);
    
    if (cartError) {
      console.error('Error fetching cart items:', cartError);
      throw cartError;
    }
    
    console.log("Cart items fetched:", cartItems);
    
    // If we got cart items, fetch the related template details for each
    if (cartItems && cartItems.length > 0) {
      const cartItemsWithTemplates: CartItem[] = [];
      
      // For each cart item, get the template details
      for (const item of cartItems) {
        try {
          const template = await fetchTemplateById(item.template_id);
          
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
        } catch (err) {
          console.error(`Error fetching template ${item.template_id}:`, err);
        }
      }
      
      console.log("Final cart items with details:", cartItemsWithTemplates);
      return cartItemsWithTemplates;
    }
    
    return [];
  } catch (error: any) {
    console.error('Error fetching cart:', error);
    toast.error(`Failed to load cart: ${error.message}`);
    return [];
  }
};

// Handle promo code application
export const handlePromoCode = (code: string, subtotal: number): { isValid: boolean; discount: number } => {
  // Simple promo code implementation - in a real app you'd validate against a database
  const validPromos: Record<string, number> = {
    'WELCOME10': 10,
    'SAVE20': 20,
    'TEMPLATE50': 50
  };
  
  if (code in validPromos) {
    const discountAmount = (subtotal * validPromos[code]) / 100;
    return { 
      isValid: true, 
      discount: Number(discountAmount.toFixed(2)) 
    };
  }
  
  return { isValid: false, discount: 0 };
};

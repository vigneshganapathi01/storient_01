
import { useState } from 'react';
import { CartItem } from '@/types/cart';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { fetchTemplateById } from '@/services/templateService';

export const useFetchCartItems = (user: any, setIsLoading: (loading: boolean) => void) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Fetch cart items from Supabase
  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      if (user) {
        console.log("Fetching cart items for user:", user.id);
        
        try {
          // First get the cart items
          const { data: cartItems, error: cartError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', user.id);
          
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
                    addedAt: item.created_at,
                    templateId: template.id
                  });
                }
              } catch (err) {
                console.error(`Error fetching template ${item.template_id}:`, err);
              }
            }
            
            console.log("Final cart items with details:", cartItemsWithTemplates);
            setItems(cartItemsWithTemplates);
          } else {
            setItems([]);
          }
        } catch (innerError: any) {
          console.error('Error fetching cart items:', innerError);
          // Only show toast for non-network errors as network errors are handled at the component level
          if (innerError.message.indexOf('Failed to fetch') === -1) {
            toast.error(`Failed to load cart: ${innerError.message}`);
          }
          throw innerError;
        }
      } else {
        // If user is not logged in, don't show any cart items
        setItems([]);
        console.log("User not logged in, cart is empty");
      }
    } catch (error: any) {
      console.error('Error in fetchCartItems:', error);
      // Reset items to prevent displaying stale data
      setItems([]);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    items,
    setItems,
    fetchCartItems
  };
};

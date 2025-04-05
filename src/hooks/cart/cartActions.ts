import { CartItem } from '@/types/cart';
import { toast } from 'sonner';
import { 
  addToCartDB, 
  removeFromCartDB, 
  updateCartItemQuantityDB, 
  clearCartDB, 
  fetchCartItemsFromDB 
} from './cartDB';

/**
 * Fetches cart items and updates the state
 */
export const fetchCartItems = async (
  user: any, 
  setItems: (items: CartItem[]) => void,
  setIsLoading: (loading: boolean) => void
): Promise<void> => {
  if (!user) {
    setItems([]);
    return;
  }

  setIsLoading(true);
  try {
    const cartItems = await fetchCartItemsFromDB(user.id);
    setItems(cartItems);
  } catch (error: any) {
    console.error('Error in fetchCartItems:', error);
    toast.error(`Failed to load cart: ${error.message}`);
    // Reset items to prevent displaying stale data
    setItems([]);
  } finally {
    setIsLoading(false);
  }
};

/**
 * Adds an item to the cart
 */
export const addItemToCart = async (
  user: any, 
  item: Omit<CartItem, 'quantity'>, 
  items: CartItem[],
  setItems: (items: CartItem[]) => void,
  setIsLoading: (loading: boolean) => void,
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
): Promise<void> => {
  try {
    setIsLoading(true);
    
    if (!user) {
      toast.error("Please log in to add items to your cart");
      return;
    }
    
    // Validate UUID format - this should be a valid UUID from the database
    if (!item.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {
      console.error('Invalid UUID format for template ID:', item.id);
      toast.error(`Failed to add item to cart: invalid template ID format`);
      return;
    }
    
    // Check if item already exists in cart
    const existingItemIndex = items.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const newQuantity = items[existingItemIndex].quantity + 1;
      await updateQuantity(item.id, newQuantity);
      
      toast.success(`${item.title} quantity updated in cart!`);
    } else {
      // Otherwise add new item
      const newItem: CartItem = { ...item, quantity: 1, addedAt: new Date().toISOString() };
      
      // Add item to database since user is logged in
      await addToCartDB(user.id, item.id, item.price);
      
      // Update local state
      setItems([...items, newItem]);
      
      toast.success(`${item.title} added to cart!`);
    }
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    toast.error(`Failed to add item to cart: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};

/**
 * Removes an item from the cart
 */
export const removeItemFromCart = async (
  user: any, 
  itemId: string, 
  items: CartItem[],
  setItems: (items: CartItem[]) => void,
  setIsLoading: (loading: boolean) => void,
  fetchCartItems: () => Promise<void>
): Promise<void> => {
  try {
    setIsLoading(true);
    
    if (!user) {
      toast.error("Please log in to remove items from your cart");
      return;
    }
    
    // Remove from local state
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    
    // Remove from database since user is logged in
    await removeFromCartDB(user.id, itemId);
    
    toast.success('Item removed from cart');
  } catch (error: any) {
    console.error('Error removing from cart:', error);
    toast.error(`Failed to remove item: ${error.message}`);
    // Refresh cart items if there was an error
    fetchCartItems();
  } finally {
    setIsLoading(false);
  }
};

/**
 * Updates the quantity of an item in the cart
 */
export const updateItemQuantity = async (
  user: any, 
  itemId: string, 
  quantity: number, 
  items: CartItem[],
  setItems: (items: CartItem[]) => void,
  setIsLoading: (loading: boolean) => void,
  fetchCartItems: () => Promise<void>,
  removeFromCart: (itemId: string) => Promise<void>
): Promise<void> => {
  if (quantity < 1) {
    await removeFromCart(itemId);
    return;
  }
  
  try {
    setIsLoading(true);
    
    if (!user) {
      toast.error("Please log in to update item quantities");
      return;
    }
    
    // Find the item to get its price
    const item = items.find(item => item.id === itemId);
    if (!item) {
      toast.error("Item not found");
      return;
    }
    
    // Update local state
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    setItems(updatedItems);
    
    // Calculate the total price for this item
    const itemPrice = item.discountPrice || item.price;
    
    // Update in database since user is logged in
    await updateCartItemQuantityDB(user.id, itemId, quantity, itemPrice);
  } catch (error: any) {
    console.error('Error updating quantity:', error);
    toast.error(`Failed to update quantity: ${error.message}`);
    // Refresh cart items if there was an error
    fetchCartItems();
  } finally {
    setIsLoading(false);
  }
};

/**
 * Clears the entire cart
 */
export const clearAllCartItems = async (
  user: any,
  setItems: (items: CartItem[]) => void,
  setIsLoading: (loading: boolean) => void,
  fetchCartItems: () => Promise<void>
): Promise<void> => {
  try {
    setIsLoading(true);
    
    if (!user) {
      toast.error("Please log in to clear your cart");
      return;
    }
    
    // Clear local state
    setItems([]);
    
    // Clear from database since user is logged in
    await clearCartDB(user.id);
    
    toast.success('Cart cleared');
  } catch (error: any) {
    console.error('Error clearing cart:', error);
    toast.error(`Failed to clear cart: ${error.message}`);
    // Refresh cart items if there was an error
    fetchCartItems();
  } finally {
    setIsLoading(false);
  }
};

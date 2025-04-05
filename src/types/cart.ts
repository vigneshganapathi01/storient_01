
// Define cart-related types
export interface CartItem {
  id: string;
  title: string;
  price: number;
  discountPrice?: number | null;
  image?: string;
  quantity: number;
  type?: string;
  isPack?: boolean;
  templateId?: string; // Added for database reference
  addedAt?: string; // Timestamp when added
}

export interface CartContextProps {
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
  isAuthenticated: boolean;
}

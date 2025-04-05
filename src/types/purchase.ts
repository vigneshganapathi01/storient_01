
import { CartItem } from './cart';

export interface PurchaseHistoryItem {
  id: string;
  items: CartItem[];
  total_amount: number;
  purchase_date: string;
  payment_status: string;
}

export interface UserCartItem {
  id?: string;
  user_id: string;
  template_id: string;
  quantity: number;
  price_per_item: number;
  total_price: number;
  created_at?: string;
  updated_at?: string;
}

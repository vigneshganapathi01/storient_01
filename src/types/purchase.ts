
import { CartItem } from './cart';

export interface PurchaseHistoryItem {
  id: string;
  items: CartItem[];
  total_amount: number;
  purchase_date: string;
  payment_status: string;
}

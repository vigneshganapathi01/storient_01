
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XCircle, Loader2, CreditCard, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Cart: React.FC = () => {
  const { 
    items, 
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
  } = useCart();
  
  const [promoInput, setPromoInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
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

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromoCode(promoInput.trim());
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setShowPaymentDialog(true);
  };

  const handleConfirmOrder = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      toast.success('Checkout successful! Thank you for your purchase.');
      clearCart();
      setIsCheckingOut(false);
      setShowPaymentDialog(false);
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate('/templates');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
        <span className="ml-2 text-lg">Loading your cart...</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">Browse our templates and add some to your cart!</p>
        <Button 
          className="bg-brand-blue hover:bg-brand-blue/90" 
          onClick={handleContinueShopping}
        >
          Explore Templates
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6 text-brand-blue">Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h2>
      
      <div className="space-y-6 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              {item.image && (
                <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <div className="text-sm text-muted-foreground">
                  {item.isPack && <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs mr-2">Pack</span>}
                  {item.type && <span>{item.type}</span>}
                </div>
                <div className="mt-1">
                  {item.discountPrice ? (
                    <div className="flex items-center">
                      <span className="font-semibold text-brand-blue">${item.discountPrice.toFixed(2)}</span>
                      <span className="text-muted-foreground line-through text-sm ml-2">${item.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="font-semibold text-brand-blue">${item.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >-</Button>
                <Input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="h-8 w-12 text-center rounded-none text-sm" 
                  min="1"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >+</Button>
              </div>
              
              <button 
                onClick={() => handleRemoveItem(item.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove item"
              >
                <XCircle size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <div className="flex items-center">
          <Input
            placeholder="Enter promo code"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            className="rounded-r-none"
          />
          <Button 
            className="rounded-l-none bg-brand-lightBlue hover:bg-brand-lightBlue/90"
            onClick={handleApplyPromo}
          >
            Apply
          </Button>
        </div>
        {promoCode && (
          <div className="mt-2 text-sm text-brand-purple">
            Promo code {promoCode} applied!
          </div>
        )}
      </div>
      
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Item Discounts:</span>
            <span className="text-brand-purple">-${discount.toFixed(2)}</span>
          </div>
        )}
        {promoDiscount > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Promo Discount:</span>
            <span className="text-brand-purple">-${promoDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Order Total:</span>
          <span className="text-brand-blue">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col gap-3">
        <Button 
          className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-6 text-lg"
          onClick={handleCheckout}
          disabled={isCheckingOut}
        >
          Proceed to Checkout ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </Button>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 text-muted-foreground"
            onClick={handleContinueShopping}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 text-muted-foreground"
            onClick={() => clearCart()}
            disabled={isCheckingOut}
          >
            Clear Cart
          </Button>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Review your order details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 pb-3 border-b">
                  <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <div className="flex justify-between mt-1">
                      <div className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </div>
                      <div className="text-sm font-medium">
                        ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-brand-purple">
                  <span>Item Discounts:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              {promoDiscount > 0 && (
                <div className="flex justify-between text-sm text-brand-purple">
                  <span>Promo ({promoCode}):</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>Order Total:</span>
                <span className="text-brand-blue">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="text-center font-medium">Demo Payment - Payment Gateway Coming Soon</p>
              <p className="text-center text-sm text-muted-foreground mt-1">This is a demonstration only. No actual payment will be processed.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
            <Button 
              className="bg-brand-blue hover:bg-brand-blue/90"
              onClick={handleConfirmOrder}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Place Your Order
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;

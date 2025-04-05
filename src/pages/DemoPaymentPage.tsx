
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { CreditCard, Smartphone, QrCode, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';

type PaymentMethod = 'card' | 'upi' | 'qr';

interface PaymentFormData {
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvv?: string;
  upiId?: string;
}

const DemoPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, clearCart, total } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Get data from location state or use defaults
  const { packageName = "Package", price = 149 } = (location.state as { packageName: string; price: number }) || {};

  // Check if user directly accessed this page without going through checkout
  useEffect(() => {
    if (!location.state && items.length === 0) {
      toast({
        title: "Invalid Access",
        description: "Please select items before proceeding to payment",
        variant: "destructive"
      });
      navigate('/templates');
    }
  }, [location.state, items.length]);

  const form = useForm<PaymentFormData>({
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: '',
      upiId: '',
    },
  });

  const processPayment = async (data: PaymentFormData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    toast({
      title: "Processing payment",
      description: "Please wait while we process your payment",
    });
    
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to complete the purchase");
      }

      // Convert items to a format suitable for JSON storage
      const itemsForDB = items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        discountPrice: item.discountPrice,
        image: item.image,
        quantity: item.quantity,
        type: item.type,
        isPack: item.isPack,
        templateId: item.templateId,
        addedAt: item.addedAt
      }));

      // Create purchase history record
      const { error: purchaseError } = await supabase.rpc('create_purchase_history', {
        p_user_id: user.id,
        p_items: itemsForDB,
        p_total_amount: price || total,
        p_purchase_date: new Date().toISOString(),
        p_payment_status: 'completed'
      });

      if (purchaseError) {
        throw purchaseError;
      }
      
      // Pass cart items and total to the thank you page
      navigate('/thank-you', { 
        state: { 
          packageName: packageName || `Cart (${items.length} items)`, 
          price: price || total,
          items: items,
          totalAmount: price || total
        } 
      });
      
      // Clear the cart if payment is successful
      await clearCart();
      
    } catch (error: any) {
      console.error('Payment processing error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "There was an error processing your payment",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const isFromCart = packageName?.includes('Cart') || items.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-slate-950 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Purchase</h1>
            <p className="text-gray-400">{packageName || `Cart (${items.length} items)`} - ${(price || total).toFixed(2)}</p>
          </div>
          
          {isFromCart && items.length > 0 && (
            <Card className="w-full mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center pb-2 border-b">
                      <div className="flex items-center gap-2">
                        {item.image && (
                          <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">${((item.discountPrice || item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold pt-2">
                    <span>Total</span>
                    <span className="text-blue-600">${(price || total).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Payment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Card</span>
                  </TabsTrigger>
                  <TabsTrigger value="upi" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <span>UPI</span>
                  </TabsTrigger>
                  <TabsTrigger value="qr" className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    <span>QR Code</span>
                  </TabsTrigger>
                </TabsList>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(processPayment)} className="space-y-4">
                    <TabsContent value="card">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="1234 5678 9012 3456" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" type="password" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="upi">
                      <FormField
                        control={form.control}
                        name="upiId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UPI ID</FormLabel>
                            <FormControl>
                              <Input placeholder="name@upi" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="qr">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                          <div className="bg-white p-4 rounded">
                            <img 
                              src="/placeholder.svg" 
                              alt="QR Code" 
                              className="w-64 h-64 mx-auto"
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Scan this QR code with your payment app</p>
                      </div>
                    </TabsContent>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : `Pay $${(price || total).toFixed(2)}`}
                      </Button>
                    </div>
                  </form>
                </Form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DemoPaymentPage;


import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Check, Download, ChevronRight, ChevronLeft, Play, File, FileText, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'curated' | 'bonus'>('curated');
  
  // Get data from location state or use defaults
  const { packageName = "Package", items = [], totalAmount = 0 } = 
    (location.state as { packageName: string; items: any[]; totalAmount: number }) || {};
  
  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  // Record purchase in database
  useEffect(() => {
    const recordPurchase = async () => {
      if (!user || !items.length || !location.state) return;
      
      try {
        // Using the raw query method to bypass TypeScript type issues
        const { error } = await supabase.rpc('create_purchase_history', {
          p_user_id: user.id,
          p_items: items,
          p_total_amount: totalAmount
        }).single();
        
        if (error) {
          console.error('Error creating purchase history with RPC:', error);
          
          // Fallback to direct insert
          const { error: insertError } = await supabase.from('purchase_history' as any)
            .insert({
              user_id: user.id,
              items: items,
              total_amount: totalAmount,
              payment_status: 'completed'
            } as any);
            
          if (insertError) {
            console.error('Error with fallback purchase history creation:', insertError);
            toast({
              title: "Error",
              description: "Failed to record your purchase. Please contact support.",
              variant: "destructive"
            });
          }
        }
      } catch (error) {
        console.error('Error recording purchase:', error);
      }
    };
    
    recordPurchase();
  }, [user, items, location.state, totalAmount]);

  // Redirect if no state data
  useEffect(() => {
    if (!location.state) {
      toast({
        title: "Error",
        description: "Invalid access. Redirecting to homepage.",
        variant: "destructive"
      });
      setTimeout(() => navigate('/'), 3000);
    }
  }, [location.state]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
  };

  // Sample content items - in a real app, this would come from the backend
  const curatedContent = [
    { icon: <FileText className="h-5 w-5 text-blue-500" />, title: "Consulting Proposal Guide", description: "Best practices for structuring proposals", size: "15MB" },
    { icon: <File className="h-5 w-5 text-blue-500" />, title: "PowerPoint Template Pack", description: "242 slides with professional layouts", size: "25MB" },
    { icon: <Database className="h-5 w-5 text-blue-500" />, title: "Excel Financial Model", description: "Complete modeling toolkit", size: "8MB" }
  ];

  const bonusContent = [
    { icon: <FileText className="h-5 w-5 text-green-500" />, title: "Case Study: Fortune 500", description: "Real-world implementation example", size: "12MB" },
    { icon: <File className="h-5 w-5 text-green-500" />, title: "Client Presentation Template", description: "Ready-to-use presentation format", size: "10MB" }
  ];

  const currentContent = selectedTab === 'curated' ? curatedContent : bonusContent;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {packageName}
              </h1>
              
              <div className="text-xl md:text-2xl text-white mb-8">
                <p>
                  Thank you for purchasing from Storient! Your template is ready to use
                  —wishing you success in your projects.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/downloads')}
                >
                  <Download className="h-5 w-5" />
                  View Downloads
                </Button>
                
                <Card className="border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <button 
                        className={`text-lg font-medium pb-2 border-b-2 ${selectedTab === 'curated' ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}
                        onClick={() => setSelectedTab('curated')}
                      >
                        Curated Content
                      </button>
                      <span className="text-lg">+</span>
                      <button 
                        className={`text-lg font-medium pb-2 border-b-2 ${selectedTab === 'bonus' ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}
                        onClick={() => setSelectedTab('bonus')}
                      >
                        Bonus content
                      </button>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      {currentContent.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-gray-400">{item.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">{item.size}</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex items-center space-x-6 text-white">
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Premium support</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <img 
                      src="/lovable-uploads/ff9ae1db-3c11-45a4-b4a0-8b691c330e1c.png"
                      alt="Template preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-blue-600 rounded-full p-3">
                        <Play fill="white" className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="aspect-video">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
              
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 text-white"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;


import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { StarIcon, ShoppingCart } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Define the schema for the review form
const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(5, 'Review must be at least 5 characters').max(500, 'Review must be less than 500 characters'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

// Define the Review type
interface Review {
  id: string;
  user_id: string;
  rating: number;
  review_text: string;
  created_at: string;
  user_name?: string;
}

const PackageDetails = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [packageDetails, setPackageDetails] = useState<any>(null);
  
  // Format package name from URL
  const formatPackageName = (id: string) => {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const packageName = packageId ? formatPackageName(packageId) : 'Package';
  
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      reviewText: '',
    },
  });

  // Fetch package details
  const fetchPackageDetails = async () => {
    try {
      if (!packageId) return;
      
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', packageId)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setPackageDetails(data);
      }
    } catch (error) {
      console.error('Error fetching package details:', error);
      toast({
        title: "Error",
        description: "Failed to load package details",
        variant: "destructive"
      });
    }
  };

  // Fetch reviews for this package
  const fetchReviews = async () => {
    try {
      // Fetch reviews for this package
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('template_id', packageId);
      
      if (reviewsError) throw reviewsError;
      
      if (reviewsData) {
        // Get unique user IDs from reviews to fetch their profiles
        const userIds = [...new Set(reviewsData.map(review => review.user_id))];
        
        // Fetch profiles for these users
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);
          
        if (profilesError) throw profilesError;
        
        // Create a map of user IDs to full names for quick lookup
        const userNameMap = new Map();
        profilesData?.forEach(profile => {
          userNameMap.set(profile.id, profile.full_name || 'Anonymous User');
        });
        
        // Combine the reviews with user names
        const formattedReviews = reviewsData.map(review => ({
          id: review.id,
          user_id: review.user_id,
          rating: review.rating,
          review_text: review.review_text,
          created_at: review.created_at,
          user_name: userNameMap.get(review.user_id) || 'Anonymous User',
        }));
        
        setReviews(formattedReviews);
        
        // Calculate average rating
        if (formattedReviews.length > 0) {
          const sum = formattedReviews.reduce((acc, review) => acc + review.rating, 0);
          setAverageRating(sum / formattedReviews.length);
        }
        
        // Check if user has already reviewed
        if (user) {
          const userReview = formattedReviews.find(review => review.user_id === user.id);
          setHasUserReviewed(!!userReview);
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive"
      });
    }
  };
  
  useEffect(() => {
    fetchPackageDetails();
    fetchReviews();
  }, [packageId, user]);
  
  const handleBuyNow = () => {
    toast({
      title: "Added to cart",
      description: `${packageName} has been added to your cart`,
    });
    navigate('/cart');
  };
  
  const onSubmitReview = async (values: ReviewFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a review",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          template_id: packageId,
          rating: values.rating,
          review_text: values.reviewText,
        });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Review submitted successfully",
      });
      
      form.reset();
      fetchReviews(); // Refresh reviews
      setHasUserReviewed(true);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <StarIcon 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };
  
  const handleRatingClick = (rating: number) => {
    form.setValue('rating', rating);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-brand-blue">Package Details</h1>
            <h2 className="text-2xl font-semibold mb-6">{packageName}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Messaging section</h3>
                <p className="text-muted-foreground">
                  This package includes professionally designed templates to help you craft compelling messages
                  that resonate with your audience and drive action.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Video trailer section</h3>
                <div className="bg-gray-100 rounded-md h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">Video preview coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6 flex justify-between items-center">
              <div className="text-2xl font-bold">{packageDetails?.price ? `$${packageDetails.price}` : "$99"}</div>
              <Button 
                className="bg-brand-blue hover:bg-brand-blue/90 flex items-center gap-2"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="h-5 w-5" />
                Buy Now
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">1) Structure of pack + template details</h3>
                  <p className="text-muted-foreground">
                    This package contains a structured set of templates designed to help you create
                    professional content efficiently. Each template is customizable and follows
                    best practices for effective communication.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">2) Key Elements of a pack (description)</h3>
                  <p className="text-muted-foreground">
                    Our templates include carefully crafted sections with placeholder text,
                    formatting guidelines, and design elements that help you maintain consistency
                    across your communications. The package is designed to save you time while
                    ensuring professional results.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Reviews and Ratings Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Customer Reviews</h3>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {reviews.length > 0 
                      ? `${averageRating.toFixed(1)} out of 5 (${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'})` 
                      : 'No reviews yet'}
                  </span>
                </div>
              </div>
              
              {!hasUserReviewed && user && (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-4 mb-8 border rounded-md p-4">
                    <h4 className="font-medium">Write a Review</h4>
                    
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating</FormLabel>
                          <FormControl>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                  key={star}
                                  className={`h-6 w-6 cursor-pointer ${
                                    star <= field.value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                  }`}
                                  onClick={() => handleRatingClick(star)}
                                />
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="reviewText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Review</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share your experience with this template..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="bg-brand-blue hover:bg-brand-blue/90"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </form>
                </Form>
              )}
              
              {!user && (
                <div className="text-center py-4 mb-4 bg-gray-50 rounded-md">
                  <p className="text-muted-foreground">Please <Button variant="link" onClick={() => navigate('/signin')} className="p-0 h-auto font-medium">sign in</Button> to leave a review</p>
                </div>
              )}
              
              {hasUserReviewed && (
                <div className="text-center py-4 mb-4 bg-gray-50 rounded-md">
                  <p className="text-muted-foreground">Thank you for your review!</p>
                </div>
              )}
              
              {/* Display reviews */}
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {renderStars(review.rating)}
                          </div>
                          <span className="font-medium">{review.user_name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.review_text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this package!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetails;

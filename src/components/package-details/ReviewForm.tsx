
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import RatingStars from './RatingStars';
import { useAuth } from '@/context/AuthContext';
import { fetchTemplateById, fetchTemplateBySlug } from '@/services/templateService';

// Define the schema for the review form
const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(5, 'Review must be at least 5 characters').max(500, 'Review must be less than 500 characters'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  packageId: string | undefined;
  onReviewSubmitted: () => void;
}

const ReviewForm = ({ packageId, onReviewSubmitted }: ReviewFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      reviewText: '',
    },
  });

  const handleRatingClick = (rating: number) => {
    form.setValue('rating', rating);
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
    
    if (!packageId) {
      toast({
        title: "Error",
        description: "Package ID is missing",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Try first with a UUID (if the packageId is a UUID)
      let templateData = null;
      
      try {
        // Check if packageId is a valid UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(packageId)) {
          templateData = await fetchTemplateById(packageId);
        } else {
          // If not a UUID, assume it's a slug
          templateData = await fetchTemplateBySlug(packageId);
        }
      } catch (e) {
        // If fetching by ID fails, try by slug
        templateData = await fetchTemplateBySlug(packageId);
      }
      
      if (!templateData) {
        throw new Error('Template not found');
      }
      
      // Use the template's ID from the database for the review
      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          template_id: templateData.id,
          rating: values.rating,
          review_text: values.reviewText,
        });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Review submitted successfully",
      });
      
      form.reset();
      onReviewSubmitted(); // Refresh reviews
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit review. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                <RatingStars 
                  rating={field.value} 
                  interactive={true} 
                  onRatingChange={handleRatingClick} 
                />
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
  );
};

export default ReviewForm;

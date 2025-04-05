import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import PackageHeader from '@/components/package-details/PackageHeader';
import ReviewSection from '@/components/package-details/ReviewSection';
import PackageInfo from '@/components/package-details/PackageInfo';
import usePackageReviews from '@/hooks/usePackageReviews';
import { fetchTemplateById, fetchTemplateBySlug } from '@/services/templateService';
const packageSlides = [{
  title: "Part 1:",
  subtitle: "Get a tried-and-tested best-practice guide on structuring consulting proposals with hands-on examples and practical tips",
  description: "A best-practice guide with hands-on tips and examples on how to creating proposals following the structure used by McKinsey, Bain, and BCG:",
  image: "/lovable-uploads/009021ed-582e-42e5-95b7-28ef8fbb950a.png"
}, {
  title: "Part 2:",
  subtitle: "Use our PowerPoint templates to create professional slides",
  description: "Professional PowerPoint templates with charts, diagrams, and layouts used by top consulting firms:",
  image: "/lovable-uploads/009021ed-582e-42e5-95b7-28ef8fbb950a.png"
}, {
  title: "Part 3:",
  subtitle: "Learn from real-world examples",
  description: "Study real Fortune 500 case examples to understand how consultants structure their proposals:",
  image: "/lovable-uploads/009021ed-582e-42e5-95b7-28ef8fbb950a.png"
}];
const PackageDetails = () => {
  const {
    packageId
  } = useParams();
  const {
    toast: toastNotification
  } = useToast();
  const navigate = useNavigate();
  const {
    addToCart
  } = useCart();
  const [packageDetails, setPackageDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    reviews,
    averageRating,
    hasUserReviewed,
    reviewCount,
    fetchReviews
  } = usePackageReviews(packageId);
  const formatPackageName = (id: string) => {
    return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  const packageName = packageId ? formatPackageName(packageId) : 'Package';
  const handleAddToCart = async () => {
    try {
      await addToCart({
        id: packageId || '',
        title: packageName,
        price: packageDetails?.price || 149,
        image: packageSlides[0]?.image || '/placeholder.svg'
      });
      toast(`${packageName} added to cart!`);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast(`Failed to add item to cart. Please try again.`, {
        style: {
          backgroundColor: 'red',
          color: 'white'
        }
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!packageId) {
          setIsLoading(false);
          return;
        }
        let templateData = null;
        try {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (uuidRegex.test(packageId)) {
            templateData = await fetchTemplateById(packageId);
          } else {
            templateData = await fetchTemplateBySlug(packageId);
          }
        } catch (e) {
          templateData = await fetchTemplateBySlug(packageId);
        }
        if (templateData) {
          setPackageDetails(templateData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toastNotification({
          title: "Error",
          description: "Failed to load data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [packageId]);
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-slate-950">
        <div className="max-container pt-32 pb-20 bg-brand-blue">
          <PackageHeader packageName={packageName} packageId={packageId || ''} reviewCount={reviewCount} averageRating={averageRating} price={packageDetails?.price || 149} isLoading={isLoading} slides={packageSlides} />
          
          <div className="mt-16">
            <PackageInfo />
          </div>
          
          <div id="reviews" className="mt-8">
            <ReviewSection packageId={packageId} reviews={reviews} averageRating={averageRating} hasUserReviewed={hasUserReviewed} onReviewSubmitted={fetchReviews} reviewCount={reviewCount} />
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default PackageDetails;

import React, { useMemo } from 'react';
import PackageCard from './PackageCard';
import PremiumPackageCard from './PremiumPackageCard';

interface TemplateGridProps {
  handleAddToCart: (packageName: string, price: number) => void;
  navigateToPackageDetails: (packageName: string) => void;
  selectedCategory?: string;
  priceRange?: [number, number];
  sortBy?: string;
}

const TemplateGrid = ({ 
  handleAddToCart, 
  navigateToPackageDetails,
  selectedCategory = 'All Categories',
  priceRange = [0, 999],
  sortBy = 'featured'
}: TemplateGridProps) => {
  const packageData = [
    {
      price: 99,
      priceText: "per pack",
      backgroundColor: "bg-[#f2f2f2]",
      headerBackground: "bg-[#f2f2f2]",
      textColor: "black",
      category: "Business",
      items: [
        {
          title: "Pitches & Proof of Concepts",
          description: "Turn your ideas into winning pitches with clear, structured frameworks that build trust and urgency.",
          templateCount: 12,
          slug: "Pitches and Proof of Concepts",
          category: "Business"
        },
        {
          title: "Case Studies",
          description: "Prove your worth with compelling case study templates designed to highlight impact, ROI, and customer success stories.",
          templateCount: 8,
          slug: "Case Studies",
          category: "Marketing"
        },
        {
          title: "Point of Views",
          description: "Establish thought leadership with impactful POV templates that simplify complex topics, articulate insights and challenge norms.",
          templateCount: 10,
          slug: "Point of Views",
          category: "Communication"
        }
      ]
    },
    {
      price: 149,
      priceText: "per pack",
      backgroundColor: "bg-[#ccebff]",
      headerBackground: "bg-[#ccebff]",
      textColor: "black",
      category: "Marketing",
      items: [
        {
          title: "Workshops",
          description: "Facilitate engaging and productive brainstorming sessions.",
          templateCount: 15,
          slug: "Workshops",
          category: "Training"
        },
        {
          title: "Proposals",
          description: "Win high-value deals with proposal templates designed to connect with decision-makers.",
          templateCount: 7,
          slug: "Proposals",
          category: "Business"
        },
        {
          title: "Request for Proposals",
          description: "Respond confidently to RFPs and RFIs with structured templates that demonstrate expertise, address client pain points.",
          templateCount: 9,
          slug: "Request for Proposals",
          category: "Marketing"
        }
      ]
    },
    {
      price: 199,
      priceText: "per pack",
      backgroundColor: "bg-[#99d7fe]",
      headerBackground: "bg-[#99d7fe]",
      textColor: "black",
      category: "Communication",
      items: [
        {
          title: "Business Review Pack",
          description: "(MBR, QBR, SBR, ABR)",
          templateCount: 18,
          slug: "Business Review Pack",
          category: "Business"
        },
        {
          title: "C-Suite Communication Strategy Pack",
          description: "Craft high-impact C-15s, Newsletter and Readouts that drive decisions.",
          templateCount: 14,
          slug: "C-Suite Communication Strategy Pack",
          category: "Communication"
        },
        {
          title: "The Divergent Deck",
          description: "Frameworks for Uncommon Thinking & Communication.",
          templateCount: 20,
          slug: "The Divergent Deck",
          category: "Training"
        }
      ]
    }
  ];

  const premiumPackages = [
    {
      price: 499,
      title: "Storytelling Masterclass",
      description: "Your comprehensive guide to mastering enterprise storytelling, Packed with strategies and templates for high-stakes business contexts.",
      templateCount: 35,
      backgroundColor: "bg-[#0074bf]",
      category: "Training",
      consultText: "consult with our team"
    },
    {
      price: 999,
      title: "Full Access Bundle",
      description: "Your All-in-One Toolkit for Winning & Growing Fortune 2000 Enterprise Accounts",
      templateCount: 100,
      backgroundColor: "bg-[#002060]",
      category: "Business",
      lifetimeUpdates: true
    }
  ];

  const filteredPackages = useMemo(() => {
    return packageData.filter(pkg => {
      // Filter by price range
      if (pkg.price < priceRange[0] || pkg.price > priceRange[1]) {
        return false;
      }
      
      // Filter by category if not "All Categories"
      if (selectedCategory !== 'All Categories' && pkg.category !== selectedCategory) {
        return false;
      }
      
      return true;
    });
  }, [packageData, selectedCategory, priceRange]);

  const filteredPremiumPackages = useMemo(() => {
    return premiumPackages.filter(pkg => {
      // Filter by price range
      if (pkg.price < priceRange[0] || pkg.price > priceRange[1]) {
        return false;
      }
      
      // Filter by category if not "All Categories"
      if (selectedCategory !== 'All Categories' && pkg.category !== selectedCategory) {
        return false;
      }
      
      return true;
    });
  }, [premiumPackages, selectedCategory, priceRange]);

  // Sort all packages based on the selected sort option
  const sortedPackages = useMemo(() => {
    let allPackages = [...filteredPackages];
    
    switch (sortBy) {
      case 'price-low':
        return allPackages.sort((a, b) => a.price - b.price);
      case 'price-high':
        return allPackages.sort((a, b) => b.price - a.price);
      case 'newest':
        // For demo purposes, we'll just randomize the order when sorting by "newest"
        return allPackages.sort(() => Math.random() - 0.5);
      default:
        // 'featured' or any other option
        return allPackages;
    }
  }, [filteredPackages, sortBy]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-8 border-t pt-6">
      {sortedPackages.map((pkg, idx) => (
        <PackageCard 
          key={idx}
          price={pkg.price}
          priceText={pkg.priceText}
          backgroundColor={pkg.backgroundColor}
          headerBackground={pkg.headerBackground}
          textColor={pkg.textColor}
          packageItems={pkg.items}
          onAddToCart={handleAddToCart}
          onPackageClick={navigateToPackageDetails}
        />
      ))}
      
      {/* Premium Package Cards */}
      {filteredPremiumPackages.map((pkg, idx) => (
        <PremiumPackageCard
          key={`premium-${idx}`}
          price={pkg.price}
          title={pkg.title}
          description={pkg.description}
          templateCount={pkg.templateCount}
          backgroundColor={pkg.backgroundColor}
          onAddToCart={handleAddToCart}
          onPackageClick={navigateToPackageDetails}
          consultText={pkg.consultText}
          lifetimeUpdates={pkg.lifetimeUpdates}
        />
      ))}
      
      {filteredPackages.length === 0 && filteredPremiumPackages.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-lg text-muted-foreground">No templates match your filters. Try adjusting your price range or category.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateGrid;

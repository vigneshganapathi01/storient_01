
import React from 'react';
import PackageCard from './PackageCard';
import PremiumPackageCard from './PremiumPackageCard';

interface TemplateGridProps {
  handleAddToCart: (packageName: string, price: number) => void;
  navigateToPackageDetails: (packageName: string) => void;
}

const TemplateGrid = ({ handleAddToCart, navigateToPackageDetails }: TemplateGridProps) => {
  const packageData = [
    {
      price: 99,
      priceText: "per pack",
      backgroundColor: "bg-[#f2f2f2]",
      headerBackground: "bg-[#f2f2f2]",
      textColor: "black",
      items: [
        {
          title: "Pitches & Proof of Concepts",
          description: "Turn your ideas into winning pitches with clear, structured frameworks that build trust and urgency.",
          templateCount: 12,
          slug: "Pitches and Proof of Concepts"
        },
        {
          title: "Case Studies",
          description: "Prove your worth with compelling case study templates designed to highlight impact, ROI, and customer success stories.",
          templateCount: 8,
          slug: "Case Studies"
        },
        {
          title: "Point of Views",
          description: "Establish thought leadership with impactful POV templates that simplify complex topics, articulate insights and challenge norms.",
          templateCount: 10,
          slug: "Point of Views"
        }
      ]
    },
    {
      price: 149,
      priceText: "per pack",
      backgroundColor: "bg-[#ccebff]",
      headerBackground: "bg-[#ccebff]",
      textColor: "black",
      items: [
        {
          title: "Workshops",
          description: "Facilitate engaging and productive brainstorming sessions.",
          templateCount: 15,
          slug: "Workshops"
        },
        {
          title: "Proposals",
          description: "Win high-value deals with proposal templates designed to connect with decision-makers.",
          templateCount: 7,
          slug: "Proposals"
        },
        {
          title: "Request for Proposals",
          description: "Respond confidently to RFPs and RFIs with structured templates that demonstrate expertise, address client pain points.",
          templateCount: 9,
          slug: "Request for Proposals"
        }
      ]
    },
    {
      price: 199,
      priceText: "per pack",
      backgroundColor: "bg-[#99d7fe]",
      headerBackground: "bg-[#99d7fe]",
      textColor: "black",
      items: [
        {
          title: "Business Review Pack",
          description: "(MBR, QBR, SBR, ABR)",
          templateCount: 18,
          slug: "Business Review Pack"
        },
        {
          title: "C-Suite Communication Strategy Pack",
          description: "Craft high-impact C-15s, Newsletter and Readouts that drive decisions.",
          templateCount: 14,
          slug: "C-Suite Communication Strategy Pack"
        },
        {
          title: "The Divergent Deck",
          description: "Frameworks for Uncommon Thinking & Communication.",
          templateCount: 20,
          slug: "The Divergent Deck"
        }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-8 border-t pt-6">
      {packageData.map((pkg, idx) => (
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
      <PremiumPackageCard
        price={499}
        title="Storytelling Masterclass"
        description="Your comprehensive guide to mastering enterprise storytelling, Packed with strategies and templates for high-stakes business contexts."
        templateCount={35}
        backgroundColor="bg-[#0074bf]"
        onAddToCart={handleAddToCart}
        onPackageClick={navigateToPackageDetails}
        consultText="consult with our team"
      />
      
      <PremiumPackageCard
        price={999}
        title="Full Access Bundle"
        description="Your All-in-One Toolkit for Winning & Growing Fortune 2000 Enterprise Accounts"
        templateCount={100}
        backgroundColor="bg-[#002060]"
        onAddToCart={handleAddToCart}
        onPackageClick={navigateToPackageDetails}
        lifetimeUpdates={true}
      />
    </div>
  );
};

export default TemplateGrid;

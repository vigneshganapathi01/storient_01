
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { PackageCard } from './PackageCard';

interface TemplatePackagesProps {
  onAddToCart: (packageId: string, packageName: string, price: number) => void;
}

const TemplatePackages = ({ onAddToCart }: TemplatePackagesProps) => {
  const navigate = useNavigate();

  const navigateToPackageDetails = (packageSlug: string) => {
    navigate(`/package-details/${packageSlug}`);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-8 border-t pt-6">
      {/* Package 1 - $99 */}
      <PackageCard
        price={99}
        priceColor="bg-[#f2f2f2]"
        subtitle="per pack"
        subtitle2="from below list"
        items={[
          {
            title: "Pitches & Proof of Concepts",
            description: "Turn your ideas into winning pitches that build trust and urgency.",
            color: "bg-[#f2f2f2]",
            templateCount: 12,
            imageUrl: "/uploads/template/poc.png",
            onClick: () => navigateToPackageDetails("pitches-proof-of-concepts")
          },
          {
            title: "Case Studies",
            description: "Share your results with compelling case study templates designed to highlight impact, ROI, and customer success stories.",
            color: "bg-[#f2f2f2]",
            templateCount: 8,
            imageUrl: "/uploads/template/case-study.png",
            onClick: () => navigateToPackageDetails("case-studies")
          },
          {
            title: "Point of Views",
            description: "Establish thought leadership with impactful POV templates that empower teams to articulate insights and challenge norms.",
            color: "bg-[#f2f2f2]",
            templateCount: 10,
            imageUrl: "/uploads/template/3d-view.png",
            onClick: () => navigateToPackageDetails("point-of-views")
          }
        ]}
        onAddToCart={() => onAddToCart("pitches-proof-of-concepts", "Pitches & Proof of Concepts", 99)}
      />

      {/* Package 2 - $129 */}
      <PackageCard
        price={129}
        priceColor="bg-[#ccebff]"
        subtitle="per pack"
        subtitle2="from below list"
        items={[
          {
            title: "Workshops",
            description: "Facilitate engaging and productive brainstorming sessions.",
            color: "bg-[#ccebff]",
            templateCount: 15,
            imageUrl: "/uploads/template/workshop.png",
            onClick: () => navigateToPackageDetails("workshops")
          },
          {
            title: "Proposals",
            description: "Win pitch-ready deals with proposal templates designed to connect with decision-makers.",
            color: "bg-[#ccebff]",
            templateCount: 7,
            imageUrl: "/uploads/template/business-proposal.png",
            onClick: () => navigateToPackageDetails("proposals")
          },
          {
            title: "Request for Proposals",
            description: "Respond confidently to RFPs and RFIs with structured templates designed to precisely address client pain points.",
            color: "bg-[#ccebff]",
            templateCount: 9,
            imageUrl: "/uploads/template/request-for-proposal.png",
            onClick: () => navigateToPackageDetails("request-for-proposals")
          }
        ]}
        onAddToCart={() => onAddToCart("workshops", "Workshops", 129)}
      />

      {/* Package 3 - $199 */}
      <PackageCard
        price={199}
        priceColor="bg-[#99d7fe]"
        subtitle="per pack"
        subtitle2="from below list"
        items={[
          {
            title: "Business Review Pack",
            description: "MEPS, QBRs, and EBRs.",
            color: "bg-[#99d7fe]",
            templateCount: 18,
            imageUrl: "/uploads/template/review.png",
            onClick: () => navigateToPackageDetails("business-review-pack")
          },
          {
            title: "C-Suite Communication Strategy Pack",
            description: "Craft high-impact C-15s, Newsletter and Readouts that drive decisions.",
            color: "bg-[#99d7fe]",
            templateCount: 14,
            imageUrl: "/uploads/template/communication.png",
            onClick: () => navigateToPackageDetails("c-suite-communication-strategy-pack")
          },
          {
            title: "The Divergent Deck",
            description: "Frameworks for Upcoming Training & Communication.",
            color: "bg-[#99d7fe]",
            templateCount: 20,
            imageUrl: "/uploads/template/divergent.png",
            onClick: () => navigateToPackageDetails("the-divergent-deck")
          }
        ]}
        onAddToCart={() => onAddToCart("business-review-pack", "Business Review Pack", 199)}
      />

      {/* Package 4 - $499 */}
      <PackageCard
        price={499}
        priceColor="bg-[#0074bf]"
        subtitle="Includes an exclusive 1:1"
        subtitle2="consult with our team"
        singlePackage={{
          title: "Storytelling Masterclass",
          description: "Your comprehensive guide to mastering enterprise storytelling, packed with strategies that build credibility and deliver business success.",
          templateCount: 35,
          imageUrl: "/uploads/template/Storytelling Masterclass.png",
          onClick: () => navigateToPackageDetails("storytelling-masterclass")
        }}
        onAddToCart={() => onAddToCart("storytelling-masterclass", "Storytelling Masterclass", 499)}
        buttonClass="bg-white text-[#0074bf] hover:bg-white/90"
      />

      {/* Package 5 - $999 */}
      <PackageCard
        price={999}
        priceColor="bg-[#002060]"
        subtitle="All 10 packs with"
        subtitle2="Lifetime Updates"
        singlePackage={{
          title: "Full Access Bundle",
          description: "Your All-in-One Toolkit for Winning & Growing Future-proof Enterprise Success",
          templateCount: 100,
          imageUrl: "/uploads/template/access.png",
          onClick: () => navigateToPackageDetails("full-access-bundle")
        }}
        onAddToCart={() => onAddToCart("full-access-bundle", "Full Access Bundle", 999)}
        buttonClass="bg-white text-[#002060] hover:bg-white/90"
      />
    </div>
  );
};

export default TemplatePackages;

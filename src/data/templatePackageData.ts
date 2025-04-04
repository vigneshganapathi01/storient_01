
export interface TemplatePackageItem {
  title: string;
  description: string;
  templateCount: number;
  slug: string;
  category: string;
}

export interface TemplatePackage {
  price: number;
  priceText: string;
  backgroundColor: string;
  headerBackground: string;
  textColor: string;
  category: string;
  items: TemplatePackageItem[];
}

export interface PremiumTemplatePackage {
  price: number;
  title: string;
  description: string;
  templateCount: number;
  backgroundColor: string;
  category: string;
  consultText?: string;
  lifetimeUpdates?: boolean;
}

export const packageData: TemplatePackage[] = [
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

export const premiumPackages: PremiumTemplatePackage[] = [
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

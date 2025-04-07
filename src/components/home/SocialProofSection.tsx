import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Trophy, Shield, Users, Clock } from 'lucide-react';

const SocialProofSection: React.FC = () => {
  // Sample array of company logos
  const companyLogos = [
    { name: "nike", logoUrl: "/uploads/company_logo/nike.png", alt: "nike logo" },
    { name: "eclerx", logoUrl: "/uploads/company_logo/eclerx.png", alt: "eclerx logo" },
    { name: "bank", logoUrl: "/uploads/company_logo/bank.png", alt: "bank logo" },
    { name: "boa", logoUrl: "/uploads/company_logo/BOA.png", alt: "boa logo" },
    { name: "cognizant", logoUrl: "/uploads/company_logo/cognizant.png", alt: "Cognizant logo" },
    { name: "supergas", logoUrl: "/uploads/company_logo/supergas.png", alt: "supergas logo" },
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="max-container">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Users className="h-10 w-10 text-brand-purple mb-3" />
            <p className="text-3xl font-bold text-foreground">25,000+</p>
            <p className="text-muted-foreground">Happy Users</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Shield className="h-10 w-10 text-brand-purple mb-3" />
            <p className="text-3xl font-bold text-foreground">1,200+</p>
            <p className="text-muted-foreground">Premium Templates</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Trophy className="h-10 w-10 text-brand-purple mb-3" />
            <p className="text-3xl font-bold text-foreground">250+</p>
            <p className="text-muted-foreground">Design Awards</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Clock className="h-10 w-10 text-brand-purple mb-3" />
            <p className="text-3xl font-bold text-foreground">40,000+</p>
            <p className="text-muted-foreground">Hours Saved</p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="text-center mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="py-2 px-4 text-sm rounded-full">
              <Shield className="h-4 w-4 mr-2" />
              Secure Payment
            </Badge>
            <Badge variant="secondary" className="py-2 px-4 text-sm rounded-full">
              <Clock className="h-4 w-4 mr-2" />
              24/7 Support
            </Badge>
            <Badge variant="secondary" className="py-2 px-4 text-sm rounded-full">
              100% Money-back Guarantee
            </Badge>
            <Badge variant="secondary" className="py-2 px-4 text-sm rounded-full">
              <Trophy className="h-4 w-4 mr-2" />
              Award Winning
            </Badge>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="text-center">
          <h3 className="text-muted-foreground mb-6">Trusted by companies worldwide</h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {companyLogos.map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={company.logoUrl}
                  alt={company.alt}
                  className="h-8 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
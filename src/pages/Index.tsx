
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import SocialProofSection from '@/components/home/SocialProofSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <SocialProofSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

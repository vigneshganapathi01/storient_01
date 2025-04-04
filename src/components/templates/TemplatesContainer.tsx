
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface TemplatesContainerProps {
  children: React.ReactNode;
}

const TemplatesContainer = ({ children }: TemplatesContainerProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TemplatesContainer;

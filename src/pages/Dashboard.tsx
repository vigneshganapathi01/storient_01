
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import UserDashboard from '@/components/dashboard/UserDashboard';
import Footer from '@/components/layout/Footer';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <UserDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

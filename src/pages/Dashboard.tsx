
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import UserDashboard from '@/components/dashboard/UserDashboard';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();

  // Redirect to login if not authenticated
  if (!isLoading && !user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/*" element={<UserDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

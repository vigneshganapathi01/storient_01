
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import PackageDetails from "./pages/PackageDetails";
import Blog from "./pages/Blog";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import DemoPaymentPage from "./pages/DemoPaymentPage";
import ThankYouPage from "./pages/ThankYouPage";
import Downloads from "./pages/Downloads";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/package-details/:packageId" element={<PackageDetails />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<Auth tab="signin" />} />
              <Route path="/signup" element={<Auth tab="signup" />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment" element={<DemoPaymentPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

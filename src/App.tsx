import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Help from "./pages/Help";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";

import TestPage from "./pages/TestPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          
          {/* New Simple Owner Login & Dashboard */}
          <Route path="/owner-login" element={<OwnerLogin />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/test" element={<TestPage />} />
          
          {/* Legacy routes for backward compatibility */}
          <Route path="/hotel-owner-login" element={<OwnerLogin />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

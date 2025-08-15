import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./components/AdminLayout";
import Index from "./pages/Index";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Help from "./pages/Help";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import TestPage from "./pages/TestPage";
import HotelOwnerLogin from "./pages/HotelOwnerLogin";
import HotelOwnerRegister from "./pages/HotelOwnerRegister";
import BookingPage from "./pages/BookingPage";
import HotelDetails from "./pages/HotelDetails";
import HotelSearch from "./pages/HotelSearch";

import NotFound from "./pages/NotFound";
import RoomManagement from "./pages/RoomManagement";
import BookingManagement from "./pages/BookingManagement";

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
          <Route path="/hotel-details/:id" element={<HotelDetails />} />
          <Route path="/hotel-search" element={<HotelSearch />} />
          <Route path="/booking/:hotelId" element={<BookingPage />} />
          <Route path="/booking/:hotelId/:roomId" element={<BookingPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          
          {/* Hotel Owner Routes */}
          <Route path="/hotel-owner-login" element={<HotelOwnerLogin />} />
          <Route path="/hotel-owner-register" element={<HotelOwnerRegister />} />
          
          {/* Legacy redirects for backward compatibility */}
          <Route path="/owner-login" element={<HotelOwnerLogin />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/test" element={<TestPage />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="rooms" element={<RoomManagement />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="guests" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Guest Database</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
            <Route path="analytics" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Analytics & Reports</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
            <Route path="settings" element={
              <PrivateRoute requiredRoles={['admin']}>
                <div className="p-8 text-center"><h2 className="text-2xl font-bold">Hotel Settings</h2><p className="text-gray-600 mt-2">Admin only - Coming soon...</p></div>
              </PrivateRoute>
            } />
          </Route>

          {/* Legacy route for backward compatibility */}
          <Route path="/hotel-admin" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route index element={<OwnerDashboard />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

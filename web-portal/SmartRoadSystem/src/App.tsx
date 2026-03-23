/**
 * App.tsx - Main Application Component
 */
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminComplaints from "@/pages/admin/AdminComplaints";
import AdminContractors from "@/pages/admin/AdminContractors";
import AdminCreateContractors from "@/pages/admin/AdminCreateContractors";

import ContractorDashboard from "@/pages/contractor/ContractorDashboard";
import ContractorComplaints from "@/pages/contractor/ContractorComplaints";
import ContractorTeams from "@/pages/contractor/ContractorTeams";
import ContractorCreateWorker from "@/pages/contractor/ContractorCreateWorker";

import ReportDetails from "@/pages/ReportDetails";

import WardAnalytics from '@/pages/admin/WardAnalytics';

import type { User } from "@/types";

const queryClient = new QueryClient();

const App = () => {
  // Admin User
  const [adminUser] = useState<User | null>({
    id: "ADM-001",
    fullName: "System Administrator",
    email: "admin@smartroad.com",
    role: "admin",
  });

  // Contractor User
  const [contractorUser] = useState<User | null>({
    id: "CON-001",
    fullName: "Contractor",
    email: "contractor@smartroad.com",
    role: "contractor",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* ---------------- ADMIN ROUTES ---------------- */}
            <Route
              path="/admin"
              element={<DashboardLayout role="admin" user={adminUser} />}
            >
              <Route index element={<AdminDashboard />} />
              <Route path="complaints" element={<AdminComplaints />} />

              {/* ✅ Report Details Route */}
              <Route
                path="complaints/report/:id"
                element={<ReportDetails />}
              />

              <Route path="contractors" element={<AdminContractors />} />
              <Route
                path="contractors/create"
                element={<AdminCreateContractors />}
              />
              <Route path="visuals" element={<WardAnalytics />} />
            </Route>

            {/* ---------------- CONTRACTOR ROUTES ---------------- */}
            <Route
              path="/contractor"
              element={
                <DashboardLayout role="contractor" user={contractorUser} />
              }
            >
              <Route index element={<ContractorDashboard />} />
              <Route path="complaints" element={<ContractorComplaints />} />

              {/* ✅ Report Details Route */}
              <Route
                path="complaints/report/:id"
                element={<ReportDetails />}
              />

              <Route path="teams" element={<ContractorTeams />} />
              <Route path="teams/create" element={<ContractorCreateWorker />} />
            </Route>

            {/* ---------------- NOT FOUND ---------------- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

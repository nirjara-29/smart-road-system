


import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import type { UserRole, User } from "@/types";

interface DashboardLayoutProps {
  role: UserRole;
  user: User | null;
}

export function DashboardLayout({ role, user }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 🔧 Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
        role={role}
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />

      {/* Mobile overlay */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <TopNavbar
          user={user}
          role={role}
          sidebarCollapsed={sidebarCollapsed}
          onMenuClick={toggleSidebar}
        />

        {/* Page Content */}
        <main
          className={cn(
            "flex-1 pt-16 transition-all duration-300 overflow-y-auto",
            sidebarCollapsed ? "pl-16" : "pl-64"
          )}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            {/* 🔥 Nested routes render here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

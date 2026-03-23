// /**
//  * Sidebar Component
//  * Main navigation sidebar for the dashboard
//  * Supports both Admin and Contractor views
//  */

// import { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   FileWarning,
//   ClipboardList,
//   UsersRound,
//   ChevronLeft,
//   ChevronRight,
//   Construction,
//   User,
//   MapIcon
// } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import type { UserRole } from '@/types';

// interface SidebarProps {
//   role: UserRole;
//   collapsed: boolean;
//   onToggle: () => void;
// }

// // Navigation items for Admin role
// const adminNavItems = [
//   {
//     title: 'Dashboard',
//     href: '/admin',
//     icon: LayoutDashboard,
//   },
//   {
//     title: 'Complaints',
//     href: '/admin/complaints',
//     icon: FileWarning,
//   },
//   {
//     title: 'Contractors',
//     href: '/admin/contractors',
//     icon: User,
//   },
//   {
//     title: 'City Pulse',
//     href: '/admin/visuals',
//     icon: MapIcon,
//   },
// ];

// // Navigation items for Contractor role
// const contractorNavItems = [
//   {
//     title: 'Dashboard',
//     href: '/contractor',
//     icon: LayoutDashboard,
//   },
//   {
//     title: 'Complaints',
//     href: '/contractor/complaints',
//     icon: ClipboardList,
//   },
//   {
//     title: 'Teams',
//     href: '/contractor/teams',
//     icon: UsersRound,
//   },
// ];

// export function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
//   const location = useLocation();
//   const navItems = role === 'admin' ? adminNavItems : contractorNavItems;

//   return (
//     <aside
//       className={cn(
//         'fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out',
//         collapsed ? 'w-16' : 'w-64'
//       )}
//     >
//       {/* Logo Section */}
//       <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
//         {!collapsed && (
//           <div className="flex items-center gap-2">
//             <Construction className="h-8 w-8 text-sidebar-primary" />
//             <span className="font-semibold text-sidebar-foreground text-sm leading-tight">
//               Road Damage<br />Management
//             </span>
//           </div>
//         )}
//         {collapsed && (
//           <Construction className="h-8 w-8 text-sidebar-primary mx-auto" />
//         )}
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex flex-col gap-1 p-3 mt-4">
//         {navItems.map((item) => {
//           const isActive = location.pathname === item.href;
//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.href}
//               to={item.href}
//               className={cn(
//                 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
//                 isActive
//                   ? 'bg-sidebar-accent text-sidebar-primary'
//                   : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
//               )}
//             >
//               <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-sidebar-primary')} />
//               {!collapsed && <span>{item.title}</span>}
//             </NavLink>
//           );
//         })}
//       </nav>

//       {/* Role Badge */}
//       {!collapsed && (
//         <div className="absolute bottom-20 left-0 right-0 px-4">
//           <div className="rounded-lg bg-sidebar-accent/50 p-3 text-center">
//             <span className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/70">
//               {role === 'admin' ? 'Administrator' : 'Contractor'}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Toggle Button */}
//       <button
//         onClick={onToggle}
//         className="absolute bottom-4 left-0 right-0 mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground transition-colors hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
//         aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//       >
//         {collapsed ? (
//           <ChevronRight className="h-5 w-5" />
//         ) : (
//           <ChevronLeft className="h-5 w-5" />
//         )}
//       </button>
//     </aside>
//   );
// }
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileWarning,
  ClipboardList,
  UsersRound,
  ChevronLeft,
  ChevronRight,
  Construction,
  User,
  MapIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

// 1. Add this Translation Helper inside the file
const sidebarTranslations = {
  en: {
    dashboard: 'Dashboard',
    complaints: 'Complaints',
    contractors: 'Contractors',
    cityPulse: 'City Pulse',
    teams: 'Teams',
    admin: 'Administrator',
    contractor: 'Contractor',
    logo: 'Road Damage Management'
  },
  mr: {
    dashboard: 'डॅशबोर्ड',
    complaints: 'तक्रारी',
    contractors: 'कंत्राटदार',
    cityPulse: 'सिटी पल्स',
    teams: 'संघ',
    admin: 'प्रशासक',
    contractor: 'कंत्राटदार',
    logo: 'रस्ता दुरुस्ती व्यवस्थापन'
  }
};

interface SidebarProps {
  role: UserRole;
  collapsed: boolean;
  onToggle: () => void;
  currentLang?: 'en' | 'mr'; // 2. Add this new prop
}

export function Sidebar({ role, collapsed, onToggle, currentLang = 'en' }: SidebarProps) {
  const location = useLocation();
  const t = sidebarTranslations[currentLang]; // Alias for easy use

  // 3. Dynamic Nav Items using the translation object
  const adminNavItems = [
    { title: t.dashboard, href: '/admin', icon: LayoutDashboard },
    { title: t.complaints, href: '/admin/complaints', icon: FileWarning },
    { title: t.contractors, href: '/admin/contractors', icon: User },
    { title: t.cityPulse, href: '/admin/visuals', icon: MapIcon },
  ];

  const contractorNavItems = [
    { title: t.dashboard, href: '/contractor', icon: LayoutDashboard },
    { title: t.complaints, href: '/contractor/complaints', icon: ClipboardList },
    { title: t.teams, href: '/contractor/teams', icon: UsersRound },
  ];

  const navItems = role === 'admin' ? adminNavItems : contractorNavItems;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Construction className="h-8 w-8 text-sidebar-primary" />
            <span className="font-semibold text-sidebar-foreground text-[10px] leading-tight uppercase tracking-tight">
              {t.logo}
            </span>
          </div>
        )}
        {collapsed && (
          <Construction className="h-8 w-8 text-sidebar-primary mx-auto" />
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 p-3 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-sidebar-primary')} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Role Badge */}
      {!collapsed && (
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <div className="rounded-lg bg-sidebar-accent/50 p-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/70">
              {role === 'admin' ? t.admin : t.contractor}
            </span>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute bottom-4 left-0 right-0 mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground transition-colors hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>
    </aside>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, User, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockNotifications } from '@/data/mockData';
import type { User as UserType } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TopNavbarProps {
  user: UserType | null;
  role: string;
  sidebarCollapsed: boolean;
  onMenuClick?: () => void;
}

export function TopNavbar({ user, role, sidebarCollapsed, onMenuClick }: TopNavbarProps) {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Logic to handle notifications
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    navigate('/');
  };

  // Generic display name logic
  const displayUserName = role === 'admin' ? 'Administrator' : 'Contractor';

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 transition-all duration-300',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-muted">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-foreground hidden sm:block">
          Smart Road Damage Management
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* --- NOTIFICATIONS SECTION --- */}
        <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {mockNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    'flex flex-col items-start gap-1 p-3 cursor-pointer',
                    !notification.read && 'bg-muted/50'
                  )}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className={cn(
                      'h-2 w-2 rounded-full',
                      notification.type === 'error' && 'bg-destructive',
                      notification.type === 'warning' && 'bg-orange-500',
                      notification.type === 'success' && 'bg-green-500',
                      notification.type === 'info' && 'bg-blue-500'
                    )} />
                    <span className="font-medium text-sm flex-1 truncate">{notification.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 pl-4">{notification.message}</p>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* --- PROFILE SECTION --- */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2 h-auto py-1.5">
              <div className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm",
                role === 'admin' ? "bg-primary" : "bg-orange-600"
              )}>
                <User className="h-5 w-5" />
              </div>
              
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-foreground leading-none mb-1">
                  {displayUserName}
                </p>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  {role === 'admin' ? 'SMC Admin' : 'Engineering Dept.'}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
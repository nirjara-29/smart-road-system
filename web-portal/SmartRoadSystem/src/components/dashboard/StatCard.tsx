/**
 * StatCard Component
 * Displays a single statistic with icon and optional change indicator
 */

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'danger';
  className?: string;
}

/**
 * StatCard - Dashboard statistics card
 * Displays key metrics with visual styling based on variant
 */
export function StatCard({
  title,
  value,
  icon,
  change,
  changeLabel,
  variant = 'primary',
  className,
}: StatCardProps) {
  // Map variant to background class
  const variantClasses = {
    primary: 'stat-card-primary',
    accent: 'stat-card-accent',
    success: 'stat-card-success',
    warning: 'stat-card-warning',
    danger: 'stat-card-danger',
  };

  // Map variant to icon color
  const iconColorClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-severity-low',
    warning: 'text-severity-medium',
    danger: 'text-destructive',
  };

  return (
    <div
      className={cn(
        'dashboard-card flex flex-col gap-4',
        variantClasses[variant],
        className
      )}
    >
      {/* Header with icon */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg bg-card',
            iconColorClasses[variant]
          )}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        
        {/* Change indicator */}
        {change !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              change >= 0 ? 'text-severity-low' : 'text-destructive'
            )}
          >
            <span>{change >= 0 ? '+' : ''}{change}%</span>
            {changeLabel && (
              <span className="text-muted-foreground text-xs">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

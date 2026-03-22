/**
 * Status and Severity Badge Components
 * Color-coded badges for complaint status and severity levels
 */

import { cn } from '@/lib/utils';
import type { SeverityLevel, ComplaintStatus, PriorityLevel } from '@/types';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

/**
 * SeverityBadge - Color-coded badge for damage severity
 */
export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const badgeClasses = {
    low: 'badge-severity-low',
    medium: 'badge-severity-medium',
    high: 'badge-severity-high',
    critical: 'badge-severity-critical',
  };

  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        badgeClasses[severity],
        className
      )}
    >
      {labels[severity]}
    </span>
  );
}

interface StatusBadgeProps {
  status: ComplaintStatus;
  className?: string;
}

/**
 * StatusBadge - Color-coded badge for complaint status
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const badgeClasses = {
    open: 'badge-status-open',
    in_progress: 'badge-status-progress',
    closed: 'badge-status-closed',
  };

  const labels = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        badgeClasses[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: PriorityLevel;
  className?: string;
}

/**
 * PriorityBadge - Badge for task priority
 */
export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const badgeClasses = {
    low: 'bg-muted text-muted-foreground',
    medium: 'badge-severity-medium',
    high: 'badge-severity-high',
    urgent: 'badge-severity-critical',
  };

  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        badgeClasses[priority],
        className
      )}
    >
      {labels[priority]}
    </span>
  );
}

interface SLABadgeProps {
  deadline: string;
  className?: string;
}

/**
 * SLABadge - Countdown badge for SLA deadline
 * Shows remaining time with color coding for urgency
 */
export function SLABadge({ deadline, className }: SLABadgeProps) {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffMs = deadlineDate.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  // Determine urgency level
  let urgencyClass = 'bg-severity-low/15 text-severity-low border border-severity-low/30';
  let displayText = '';

  if (diffMs < 0) {
    // Overdue
    urgencyClass = 'bg-destructive/15 text-destructive border border-destructive/30 sla-urgent';
    displayText = 'Overdue';
  } else if (diffHours < 4) {
    // Critical - less than 4 hours
    urgencyClass = 'badge-severity-critical sla-urgent';
    displayText = `${diffHours}h left`;
  } else if (diffHours < 24) {
    // Warning - less than 24 hours
    urgencyClass = 'badge-severity-high';
    displayText = `${diffHours}h left`;
  } else if (diffDays < 3) {
    // Moderate - 1-3 days
    urgencyClass = 'badge-severity-medium';
    displayText = `${diffDays}d left`;
  } else {
    // Safe - more than 3 days
    displayText = `${diffDays}d left`;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        urgencyClass,
        className
      )}
    >
      {displayText}
    </span>
  );
}

interface ActiveStatusBadgeProps {
  status: 'active' | 'inactive';
  className?: string;
}

/**
 * ActiveStatusBadge - Badge for contractor/team active status
 */
export function ActiveStatusBadge({ status, className }: ActiveStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        status === 'active'
          ? 'bg-severity-low/15 text-severity-low'
          : 'bg-muted text-muted-foreground',
        className
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          status === 'active' ? 'bg-severity-low' : 'bg-muted-foreground'
        )}
      />
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  );
}

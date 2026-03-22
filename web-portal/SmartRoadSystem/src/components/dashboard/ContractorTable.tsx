/**
 * ContractorTable Component
 * Displays list of contractors with performance metrics
 */

import { cn } from '@/lib/utils';
import { User, Phone, Mail, TrendingUp } from 'lucide-react';
import { ActiveStatusBadge } from '@/components/common/StatusBadges';
import { Progress } from '@/components/ui/progress';
import type { Contractor } from '@/types';

interface ContractorTableProps {
  contractors: Contractor[];
  onRowClick?: (contractor: Contractor) => void;
  className?: string;
}

/**
 * ContractorTable - Data table for contractor management
 * Shows contractor details and performance metrics
 */
export function ContractorTable({
  contractors,
  onRowClick,
  className,
}: ContractorTableProps) {
  return (
    <div className={cn('rounded-lg border border-border overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Contractor Name</th>
              <th className="hidden md:table-cell">Contact</th>
              <th>Assigned</th>
              <th className="hidden sm:table-cell">Completed</th>
              <th>SLA Compliance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {contractors.map((contractor) => (
              <tr
                key={contractor.id}
                className={cn(onRowClick && 'cursor-pointer')}
                onClick={() => onRowClick?.(contractor)}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{contractor.name}</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">
                        {contractor.zones.join(', ')}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell">
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {contractor.mobile}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {contractor.email}
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-lg font-semibold text-foreground">
                    {contractor.assignedComplaints}
                  </span>
                </td>
                <td className="hidden sm:table-cell">
                  <span className="text-lg font-semibold text-severity-low">
                    {contractor.completedComplaints}
                  </span>
                </td>
                <td>
                  <div className="w-32 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span
                        className={cn(
                          'font-medium',
                          contractor.slaCompliance >= 90
                            ? 'text-severity-low'
                            : contractor.slaCompliance >= 75
                            ? 'text-severity-medium'
                            : 'text-destructive'
                        )}
                      >
                        {contractor.slaCompliance}%
                      </span>
                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <Progress
                      value={contractor.slaCompliance}
                      className={cn(
                        'h-2',
                        contractor.slaCompliance >= 90
                          ? '[&>div]:bg-severity-low'
                          : contractor.slaCompliance >= 75
                          ? '[&>div]:bg-severity-medium'
                          : '[&>div]:bg-destructive'
                      )}
                    />
                  </div>
                </td>
                <td>
                  <ActiveStatusBadge status={contractor.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

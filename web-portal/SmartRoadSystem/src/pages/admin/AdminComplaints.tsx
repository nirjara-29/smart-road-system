/**
 * Admin Complaints Page
 * Dedicated page for complaint management with full filters
 */

import { FileWarning } from 'lucide-react';
import { ComplaintTable } from '@/components/dashboard/ComplaintTable';
import { mockComplaints } from '@/data/mockData';

export default function AdminComplaints() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <FileWarning className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Complaints</h1>
          <p className="text-muted-foreground">
            View and manage all road damage complaints
          </p>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="dashboard-card">
        <ComplaintTable
          complaints={mockComplaints}
          showAssignment={true}
          showPriority={true}
        />
      </div>
    </div>
  );
}

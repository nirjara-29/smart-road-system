/**
 * Contractor Complaints Page
 * View all complaints assigned to contractor
 */

import { ClipboardList } from 'lucide-react';
import { ComplaintTable } from '@/components/dashboard/ComplaintTable';
import { mockComplaints } from '@/data/mockData';

export default function ContractorComplaints() {
  // Filter complaints for this contractor
  const contractorComplaints = mockComplaints.filter(
    (c) => c.assignedContractor === 'RoadCare Solutions' || !c.assignedContractor
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
          <ClipboardList className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Complaints</h1>
          <p className="text-muted-foreground">
            View all complaints assigned to your organization
          </p>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="dashboard-card">
        <ComplaintTable
          complaints={contractorComplaints}
          showAssignment={true}
        />
      </div>
    </div>
  );
}

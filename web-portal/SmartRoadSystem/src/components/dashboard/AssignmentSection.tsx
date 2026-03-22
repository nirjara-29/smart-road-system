/**
 * AssignmentSection Component
 * UI for assigning complaints to teams
 */

import { useState } from 'react';
import { ClipboardList, Users, ArrowRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SeverityBadge, PriorityBadge } from '@/components/common/StatusBadges';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { Complaint, Team, PriorityLevel } from '@/types';

interface AssignmentSectionProps {
  unassignedComplaints: Complaint[];
  teams: Team[];
  onAssign?: (complaintId: string, teamId: string, priority: PriorityLevel) => void;
  className?: string;
}

/**
 * AssignmentSection - UI for assigning complaints to repair teams
 */
export function AssignmentSection({
  unassignedComplaints,
  teams,
  onAssign,
  className,
}: AssignmentSectionProps) {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [overridePriority, setOverridePriority] = useState<PriorityLevel>('medium');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle opening assignment dialog
  const openAssignDialog = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setOverridePriority(complaint.priority);
    setSelectedTeam('');
    setIsDialogOpen(true);
  };

  // Handle assignment confirmation
  const handleAssign = () => {
    if (selectedComplaint && selectedTeam) {
      onAssign?.(selectedComplaint.id, selectedTeam, overridePriority);
      setIsDialogOpen(false);
      setSelectedComplaint(null);
    }
  };

  // Get active teams only
  const activeTeams = teams.filter((t) => t.status === 'active');

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">Assign Complaints</h2>
        <p className="text-sm text-muted-foreground">
          {unassignedComplaints.length} complaints pending assignment
        </p>
      </div>

      {/* Unassigned Complaints List */}
      {unassignedComplaints.length === 0 ? (
        <div className="dashboard-card text-center py-12">
          <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            All Caught Up!
          </h3>
          <p className="text-muted-foreground">
            No unassigned complaints at the moment
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unassignedComplaints.map((complaint) => (
            <div key={complaint.id} className="dashboard-card">
              {/* Complaint Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="font-semibold text-foreground">
                    {complaint.id}
                  </span>
                  <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                    {complaint.location}
                  </p>
                </div>
                <SeverityBadge severity={complaint.severity} />
              </div>

              {/* Priority and Description */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Priority:</span>
                  <PriorityBadge priority={complaint.priority} />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {complaint.description}
                </p>
              </div>

              {/* Assign Button */}
              <Button
                className="w-full gap-2"
                variant="outline"
                onClick={() => openAssignDialog(complaint)}
              >
                <Users className="h-4 w-4" />
                Assign to Team
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Assignment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Complaint</DialogTitle>
            <DialogDescription>
              Assign {selectedComplaint?.id} to a repair team
            </DialogDescription>
          </DialogHeader>

          {selectedComplaint && (
            <div className="space-y-4 py-4">
              {/* Complaint Summary */}
              <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{selectedComplaint.id}</span>
                  <SeverityBadge severity={selectedComplaint.severity} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedComplaint.location}
                </p>
              </div>

              {/* Team Selection */}
              <div className="space-y-2">
                <Label>Select Team</Label>
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeTeams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{team.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({team.zone})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Priority Override */}
              <div className="space-y-2">
                <Label>Priority Override</Label>
                <Select
                  value={overridePriority}
                  onValueChange={(v) => setOverridePriority(v as PriorityLevel)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Override the default priority if needed
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedTeam} className="gap-2">
              Assign
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

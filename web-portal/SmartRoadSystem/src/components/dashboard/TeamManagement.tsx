/**
 * TeamManagement Component
 * Team creation form, worker list, and team display
 */

import { useState } from 'react';
import { Users, MapPin, Plus, X, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActiveStatusBadge } from '@/components/common/StatusBadges';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { zoneOptions } from '@/data/mockData';
import type { Worker, Team } from '@/types';

interface TeamManagementProps {
  teams: Team[];
  availableWorkers: Worker[];
  onCreateTeam?: (teamName: string, zone: string, selectedWorkers: string[]) => void;
  className?: string;
}

/**
 * TeamManagement - Complete team management UI
 * Includes team list, creation form, and worker assignment
 */
export function TeamManagement({
  teams,
  availableWorkers,
  onCreateTeam,
  className,
}: TeamManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);

  // Handle worker selection toggle
  const toggleWorker = (workerId: string) => {
    setSelectedWorkers((prev) =>
      prev.includes(workerId)
        ? prev.filter((id) => id !== workerId)
        : [...prev, workerId]
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    if (teamName && selectedZone) {
      onCreateTeam?.(teamName, selectedZone, selectedWorkers);
      // Reset form
      setTeamName('');
      setSelectedZone('');
      setSelectedWorkers([]);
      setIsDialogOpen(false);
    }
  };

  // Filter only available workers
  const freeWorkers = availableWorkers.filter((w) => w.available);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Team Management</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage repair teams for your zone
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Set up a new repair team and assign workers
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Team Name Input */}
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  placeholder="e.g., Alpha Team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>

              {/* Zone Selection */}
              <div className="space-y-2">
                <Label htmlFor="zone">Working Zone</Label>
                <Select value={selectedZone} onValueChange={setSelectedZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {zoneOptions.map((zone) => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Worker Selection */}
              <div className="space-y-2">
                <Label>Select Workers</Label>
                <div className="max-h-48 overflow-y-auto rounded-lg border border-border p-3 space-y-2">
                  {freeWorkers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No available workers
                    </p>
                  ) : (
                    freeWorkers.map((worker) => (
                      <div
                        key={worker.id}
                        className="flex items-center justify-between rounded-lg bg-muted/50 p-2"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={worker.id}
                            checked={selectedWorkers.includes(worker.id)}
                            onCheckedChange={() => toggleWorker(worker.id)}
                          />
                          <label
                            htmlFor={worker.id}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {worker.name}
                          </label>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {worker.role}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedWorkers.length} worker(s) selected
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!teamName || !selectedZone}>
                Create Team
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Teams Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <div key={team.id} className="dashboard-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{team.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {team.zone}
                  </div>
                </div>
              </div>
              <ActiveStatusBadge status={team.status} />
            </div>

            {/* Team Stats */}
            <div className="flex items-center justify-between text-sm border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {team.members.length} Members
                </span>
              </div>
              <div className="text-muted-foreground">
                {team.assignedComplaints} Assigned
              </div>
            </div>

            {/* Member Names */}
            {team.members.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {team.members.slice(0, 3).map((member) => (
                  <span
                    key={member.id}
                    className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs"
                  >
                    {member.name.split(' ')[0]}
                  </span>
                ))}
                {team.members.length > 3 && (
                  <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
                    +{team.members.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Available Workers Section */}
      <div className="dashboard-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Available Workers
        </h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th className="hidden sm:table-cell">Mobile</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {availableWorkers.map((worker) => (
                <tr key={worker.id}>
                  <td className="font-medium">{worker.name}</td>
                  <td className="text-muted-foreground">{worker.role}</td>
                  <td className="hidden sm:table-cell text-muted-foreground">
                    {worker.mobile}
                  </td>
                  <td>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
                        worker.available
                          ? 'bg-severity-low/15 text-severity-low'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          worker.available ? 'bg-severity-low' : 'bg-muted-foreground'
                        )}
                      />
                      {worker.available ? 'Available' : `Assigned to ${worker.assignedTeam}`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

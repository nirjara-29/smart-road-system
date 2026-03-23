import { Button } from '@/components/ui/button';
import type { Complaint } from '@/types';
import { useNavigate, useLocation } from "react-router-dom";

interface ApproveTableProps {
  complaints: Complaint[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ApproveTable({
  complaints,
  onApprove,
  onReject,
}: ApproveTableProps) {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-medium">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Location</th>
            <th className="p-4">Before</th>
            <th className="p-4">Assigned</th>
            <th className="p-4">After</th>
            <th className="p-4">Approved</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {complaints.map((complaint) => (
            <tr
              key={complaint.id}
              className={`
                transition-colors
                ${
                  complaint.status === 'in_progress'
                    ? 'bg-green-50 hover:bg-green-100'
                    : complaint.status === 'closed'
                    ? 'bg-red-50 hover:bg-red-100'
                    : 'hover:bg-muted/30'
                }
              `}
            >
              {/* ID */}
              <td className="p-4 font-medium">{complaint.id}</td>

              {/* Location */}
              <td className="p-4">{complaint.location}</td>

              {/* Reports → Show Button */}
              <td className="p-4">
                <Button
  variant="outline"
  size="sm"
  onClick={(e) => {
    e.stopPropagation();
    const basePath = location.pathname.startsWith("/contractor") ? "/contractor" : "/admin";
    // Add ?view=before to the URL
    navigate(`${basePath}/complaints/report/${complaint.id}?view=before`);
  }}
>
  Show
</Button>
              </td>

              {/* Assigned */}
              <td className="p-4 text-muted-foreground">
                {complaint.assignedTeam || '—'}
              </td>

              {/* Before → Show Button */}
             <td className="p-4">
  <Button
    variant="outline"
    size="sm"
    onClick={(e) => {
      e.stopPropagation();
      const basePath = location.pathname.startsWith("/contractor") ? "/contractor" : "/admin";
      // Add ?view=after to the URL
      navigate(`${basePath}/complaints/report/${complaint.id}?view=after`);
    }}
  >
    Show
  </Button>
</td>

              {/* Approved → Two Buttons */}
              <td className="p-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={complaint.status !== 'open'}
                    className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                    onClick={() => onApprove(complaint.id)}
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={complaint.status !== 'open'}
                    onClick={() => onReject(complaint.id)}
                  >
                    Not Approved
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

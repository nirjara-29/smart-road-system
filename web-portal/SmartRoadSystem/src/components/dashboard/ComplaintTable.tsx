import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SeverityBadge, StatusBadge } from "@/components/common/StatusBadges";
import type { Complaint } from "@/types";

interface ComplaintTableProps {
  complaints: Complaint[];
  showAssignment?: boolean;
}

export function ComplaintTable({ complaints, showAssignment }: ComplaintTableProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-medium">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Location</th>
            <th className="p-4">Severity</th>
            <th className="p-4">Reports</th>
            <th className="p-4">Status</th>
            {showAssignment && <th className="p-4">Assigned</th>}
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {complaints.map((complaint) => (
            <tr key={complaint.id} className="hover:bg-muted/30 transition-colors">
              <td className="p-4 font-medium">{complaint.id}</td>

              <td className="p-4">{complaint.location}</td>

              <td className="p-4">
                <SeverityBadge severity={complaint.severity} />
              </td>

              {/* ✅ REPORT BUTTON */}
              <td className="p-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={(e) => {
                    e.stopPropagation();

                    const basePath = location.pathname.startsWith("/contractor")
                      ? "/contractor"
                      : "/admin";

                    navigate(
                      `${basePath}/complaints/report/${complaint.id}`,
                      { state: complaint } // 🔥 PASS DATA
                    );
                  }}
                >
                  Show
                </Button>
              </td>

              <td className="p-4">
                <StatusBadge status={complaint.status} />
              </td>

              {showAssignment && (
                <td className="p-4 text-muted-foreground">
                  {complaint.assignedTeam || "—"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, MapPin, Brain } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { SeverityBadge, PriorityBadge } from '@/components/common/StatusBadges';
// import { mockComplaints } from '@/data/mockData';
// import { useLocation } from "react-router-dom";

// function ReportRow({
//   label,
//   value,
//   highlight = false,
// }: {
//   label: string;
//   value: string | number;
//   highlight?: boolean;
// }) {
//   return (
//     <div className="flex justify-between items-center px-4 py-3 border-b border-border last:border-b-0">
//       <span className="font-semibold text-muted-foreground">{label}</span>
//       <span className={highlight ? 'font-bold text-destructive' : 'text-foreground'}>
//         {value}
//       </span>
//     </div>
//   );
// }

// export default function ReportDetails() {
//   const { id } = useParams<{ id: string }>(); // ✅ FIXED
//   const navigate = useNavigate();
//   console.log("URL ID:", id);
//   console.log("Mock data:", mockComplaints);

//   const complaint = mockComplaints.find((c) => c.id === id);

//   const aiReport = {
//     damageType: 'Pothole',
//     latitude: 18.5204,
//     longitude: 73.8567,
//     confidence: '91%',
//     severity: complaint?.severity || 'high',
//     priority: complaint?.priority || 'high',
//   };

//   if (!complaint) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 gap-4">
//         <p className="text-muted-foreground text-lg">Complaint not found.</p>
//         <Button variant="outline" onClick={() => navigate(-1)}>
//           <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
//         <ArrowLeft className="h-4 w-4" />
//         Back to Complaints
//       </Button>

//       <div className="dashboard-card max-w-4xl mx-auto space-y-6">
//         <div className="text-center space-y-1">
//           <h1 className="text-2xl font-bold text-foreground">📄 Road Damage Report</h1>
//           <p className="text-muted-foreground">Complaint ID: {complaint.id}</p>
//         </div>

//         <hr className="border-border" />

//         <div className="space-y-2">
//           <h2 className="text-xl font-semibold text-foreground">
//             Road Damage Complaint – {complaint.ward}
//           </h2>
//           <p className="text-muted-foreground leading-relaxed">
//             {complaint.description}
//           </p>
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <MapPin className="h-4 w-4" />
//             {complaint.location}
//           </div>
//         </div>

//         <div className="space-y-3">
//           <h3 className="text-lg font-semibold text-foreground">📷 Uploaded Image</h3>
//  <img 
//   src="/image.jpeg"
//   alt="Road Damage"
//   className="w-64 h-auto rounded-lg border border-border"
// />

//         </div>

//         <div className="space-y-3">
//           <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
//             <Brain className="h-5 w-5 text-primary" />
//             AI Analysis Report
//           </h3>

//           <div className="rounded-lg border border-border overflow-hidden">
//             <ReportRow label="Damage Type" value={aiReport.damageType} />
//             <ReportRow label="Latitude" value={aiReport.latitude} />
//             <ReportRow label="Longitude" value={aiReport.longitude} />
//             <ReportRow label="Confidence Score" value={aiReport.confidence} />
//             <ReportRow label="Severity" value={aiReport.severity.toUpperCase()} highlight />
//             <ReportRow label="Priority" value={aiReport.priority.toUpperCase()} highlight />
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-3 pt-2">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-muted-foreground">Severity:</span>
//             <SeverityBadge severity={complaint.severity} />
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-muted-foreground">Priority:</span>
//             <PriorityBadge priority={complaint.priority} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, MapPin, Brain } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { SeverityBadge, PriorityBadge } from '@/components/common/StatusBadges';
// import { mockComplaints } from '@/data/mockData';
// import potholeImg from '@/assets/pothole.jpeg';

// function ReportRow({
//   label,
//   value,
//   highlight = false,
// }: {
//   label: string;
//   value: string | number;
//   highlight?: boolean;
// }) {
//   return (
//     <div className="flex justify-between items-center px-4 py-3 border-b border-border last:border-b-0">
//       <span className="font-semibold text-muted-foreground">{label}</span>
//       <span className={highlight ? 'font-bold text-destructive' : 'text-foreground'}>
//         {value}
//       </span>
//     </div>
//   );
// }

// export default function ReportDetails() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const complaint = mockComplaints.find((c) => c.id === id);

//   const aiReport = {
//     damageType: 'Pothole',
//     latitude: 18.5204,
//     longitude: 73.8567,
//     confidence: '91%',
//     severity: complaint?.severity || 'high',
//     priority: complaint?.priority || 'high',
//   };

//   if (!complaint) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 gap-4">
//         <p className="text-muted-foreground text-lg">Complaint not found.</p>
//         <Button variant="outline" onClick={() => navigate(-1)}>
//           <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* 🔙 Back Button */}
//       <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
//         <ArrowLeft className="h-4 w-4" />
//         Back to Complaints
//       </Button>

//       {/* 📄 Main Card */}
//       <div className="dashboard-card max-w-4xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="text-center space-y-1">
//           <h1 className="text-2xl font-bold text-foreground">📄 Road Damage Report</h1>
//           <p className="text-muted-foreground">Complaint ID: {complaint.id}</p>
//         </div>

//         <hr className="border-border" />

//         {/* Complaint Info */}
//         <div className="space-y-2">
//           <h2 className="text-xl font-semibold text-foreground">
//             Road Damage Complaint – {complaint.ward}
//           </h2>

//           <p className="text-muted-foreground leading-relaxed">
//             {complaint.description}
//           </p>

//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <MapPin className="h-4 w-4" />
//             {complaint.location}
//           </div>
//         </div>

//         {/* 📷 Uploaded Image (Centered + Smaller + Same Ratio) */}
//         <div className="space-y-3">
//           <h3 className="text-lg font-semibold text-foreground">📷 Uploaded Image</h3>

//           <div className="flex justify-center">
//             <img
//               src={potholeImg}
//               alt="Road Damage"
//               className="w-64 h-auto rounded-lg border border-border shadow-sm"
//             />
//           </div>
//         </div>

//         {/* 🤖 AI Analysis */}
//         <div className="space-y-3">
//           <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
//             <Brain className="h-5 w-5 text-primary" />
//             AI Analysis Report
//           </h3>

//           <div className="rounded-lg border border-border overflow-hidden">
//             <ReportRow label="Damage Type" value={aiReport.damageType} />
//             <ReportRow label="Latitude" value={aiReport.latitude} />
//             <ReportRow label="Longitude" value={aiReport.longitude} />
//             <ReportRow label="Confidence Score" value={aiReport.confidence} />
//             <ReportRow
//               label="Severity"
//               value={aiReport.severity.toUpperCase()}
//               highlight
//             />
//             <ReportRow
//               label="Priority"
//               value={aiReport.priority.toUpperCase()}
//               highlight
//             />
//           </div>
//         </div>

//         {/* 🏷️ Status Badges */}
//         <div className="flex flex-wrap gap-3 pt-2">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-muted-foreground">
//               Severity:
//             </span>
//             <SeverityBadge severity={complaint.severity} />
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-muted-foreground">
//               Priority:
//             </span>
//             <PriorityBadge priority={complaint.priority} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'; // Added useSearchParams
import { ArrowLeft, MapPin, Brain, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeverityBadge, PriorityBadge } from '@/components/common/StatusBadges';
import { mockComplaints } from '@/data/mockData';

// 1. Import both images
import potholeImg from '@/assets/pothole.jpeg'; 
import repairedImg from '@/assets/fixed_road.jpeg'; // Make sure you have this file

function ReportRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-border last:border-b-0">
      <span className="font-semibold text-muted-foreground">{label}</span>
      <span className={highlight ? 'font-bold text-destructive' : 'text-foreground'}>
        {value}
      </span>
    </div>
  );
}

export default function ReportDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 2. Initialize search params to detect ?view=after
  const [searchParams] = useSearchParams();
  const viewType = searchParams.get('view'); 

  const complaint = mockComplaints.find((c) => c.id === id);

  // 3. Dynamic Logic for Image and Title
  const isAfterView = viewType === 'after';
  const displayImage = isAfterView ? repairedImg : potholeImg;
  const displayTitle = isAfterView ? "Repair Completion Image" : "Initial Damage Image";

  const aiReport = {
    damageType: 'Pothole',
    latitude: 18.5204,
    longitude: 73.8567,
    confidence: '91%',
    severity: complaint?.severity || 'high',
    priority: complaint?.priority || 'high',
  };

  if (!complaint) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground text-lg">Complaint not found.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Complaints
      </Button>

      <div className="dashboard-card max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">
            {isAfterView ? "📋 Completion Report" : "📄 Road Damage Report"}
          </h1>
          <p className="text-muted-foreground">Complaint ID: {complaint.id}</p>
        </div>

        <hr className="border-border" />

        <div className="space-y-2 text-left">
          <h2 className="text-xl font-semibold text-foreground">
            {complaint.ward} - {isAfterView ? "Resolved" : "Active Issue"}
          </h2>
          <p className="text-muted-foreground leading-relaxed italic">
             {isAfterView 
               ? "The reported road damage has been successfully repaired as per SMC engineering standards." 
               : complaint.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {complaint.location}
          </div>
        </div>

        {/* 📷 Dynamic Image Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
            {displayTitle}
          </h3>

          <div className="flex justify-center">
            <img
              src={displayImage}
              alt="Road Status"
              className={`w-80 h-auto rounded-xl border-4 shadow-xl transition-all duration-500 ${
                isAfterView ? "border-emerald-100" : "border-slate-100"
              }`}
            />
          </div>
          {isAfterView && (
            <p className="text-emerald-600 text-xs font-bold animate-pulse">
              Verified by SMC Field Inspection
            </p>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Analysis & Metadata
          </h3>

          <div className="rounded-lg border border-border overflow-hidden bg-slate-50/50">
            <ReportRow label="Damage Type" value={aiReport.damageType} />
            <ReportRow label="Latitude" value={aiReport.latitude} />
            <ReportRow label="Longitude" value={aiReport.longitude} />
            <ReportRow label="Status" value={isAfterView ? "REPAIRED" : "REPORTED"} />
            <ReportRow label="Severity" value={aiReport.severity.toUpperCase()} highlight={!isAfterView} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Severity:</span>
            <SeverityBadge severity={complaint.severity} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Priority:</span>
            <PriorityBadge priority={complaint.priority} />
          </div>
        </div>
      </div>
    </div>
  );
}
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   ClipboardList,
//   AlertCircle,
//   Clock,
//   CheckCircle2,
//   UserPlus,
// } from 'lucide-react';

// import { StatCard } from '@/components/dashboard/StatCard';
// import { ApproveTable } from '@/components/dashboard/ApproveTable';
// import { AssignmentSection } from '@/components/dashboard/AssignmentSection';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';

// import {
//   mockComplaints,
//   mockTeams,
//   mockWorkers,
// } from '@/data/mockData';


// export default function ContractorDashboard() {
//   const navigate = useNavigate();

//   // 🔥 MAIN STATE (single source of truth)
//   const [complaints, setComplaints] = useState(mockComplaints);
//   const [teams, setTeams] = useState(mockTeams);

//   // 👇 Filter complaints for this contractor
//   const contractorComplaints = complaints.filter(
//     (c) =>
//       c.assignedContractor === 'RoadCare Solutions' ||
//       !c.assignedContractor
//   );

//   // 🔥 Dummy team assignment only for display
//   const teamNames = ['Alpha Team', 'Beta Team', 'Gamma Team'];

//   const contractorComplaintsWithTeams = contractorComplaints.map((c, i) => ({
//     ...c,
//     assignedTeam: c.assignedTeam || teamNames[i % teamNames.length],
//   }));

//   // ✅ APPROVAL TAB DATA
//  const approvalComplaints = contractorComplaintsWithTeams.slice(0, 1);


//   // ✅ ASSIGN TAB DATA (real unassigned only)
//   const unassignedComplaints = contractorComplaints.filter(
//     (c) => !c.assignedTeam && c.status === 'open'
//   );

//   // 📊 Stats
//   const totalAssigned = contractorComplaintsWithTeams.filter(
//     (c) => c.assignedTeam
//   ).length;

//   const unassigned = unassignedComplaints.length;

//   const inProgress = contractorComplaints.filter(
//     (c) => c.status === 'in_progress'
//   ).length;

//   const completed = contractorComplaints.filter(
//     (c) => c.status === 'closed'
//   ).length;

//   // ✅ APPROVE HANDLER → row turns GREEN
//   const handleApprove = (id: string) => {
//     setComplaints((prev) =>
//       prev.map((c) =>
//         c.id === id ? { ...c, status: 'in_progress' } : c
//       )
//     );
//   };

//   // ❌ REJECT HANDLER → row turns RED
//   const handleReject = (id: string) => {
//     setComplaints((prev) =>
//       prev.map((c) =>
//         c.id === id ? { ...c, status: 'closed' } : c
//       )
//     );
//   };

//   // 👷 Create team
//   const handleCreateTeam = (
//     teamName: string,
//     zone: string,
//     selectedWorkerIds: string[]
//   ) => {
//     const selectedWorkers = mockWorkers.filter((w) =>
//       selectedWorkerIds.includes(w.id)
//     );

//     const newTeam = {
//       id: `TEAM-${Date.now()}`,
//       name: teamName,
//       zone,
//       members: selectedWorkers,
//       status: 'active' as const,
//       assignedComplaints: 0,
//     };

//     setTeams((prev) => [...prev, newTeam]);
//   };

//   return (
//     <div className="space-y-6 animate-fade-in text-left">
//       {/* 🔷 Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">
//             Contractor Dashboard
//           </h1>
//           <p className="text-muted-foreground">
//             Manage approvals and assign repair teams
//           </p>
//         </div>

//         <Button
//           onClick={() => navigate('/contractor/teams/create')}
//           className="hover:opacity-90 text-white gap-2 h-11 px-6 shadow-md transition-all active:scale-95"
//           style={{ backgroundColor: '#25304F' }}
//         >
//           <UserPlus className="h-5 w-5" />
//           <span className="font-bold">Register New Worker</span>
//         </Button>
//       </div>

//       {/* 📊 Stats */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <StatCard
//           title="Total Assigned"
//           value={totalAssigned}
//           icon={<ClipboardList className="h-5 w-5" />}
//           className="bg-blue-300 border-blue-700 shadow-md"
//         />
//         <StatCard
//           title="Unassigned"
//           value={unassigned}
//           icon={<AlertCircle className="h-5 w-5" />}
//            className="bg-red-400 border-red-700"
//         />
//         <StatCard
//           title="In Progress"
//           value={inProgress}
//           icon={<Clock className="h-5 w-5" />}
//           className="bg-orange-300 border-orange-700 shadow-sm"
//         />
//         <StatCard
//           title="Completed"
//           value={completed}
//           icon={<CheckCircle2 className="h-5 w-5" />}
//           className="bg-green-500 border-green-700 shadow-sm"
//         />
//       </div>

//       {/* 📑 Tabs */}
//       <Tabs defaultValue="approve" className="space-y-4">
//         <TabsList className="grid w-full max-w-lg grid-cols-2">
//           <TabsTrigger value="approve" className="gap-2">
//             <ClipboardList className="h-4 w-4" />
//             <span className="hidden sm:inline">Approve</span>
//           </TabsTrigger>

//           <TabsTrigger value="assign" className="gap-2">
//             <AlertCircle className="h-4 w-4" />
//             <span className="hidden sm:inline">Assign</span>
//           </TabsTrigger>
//         </TabsList>

//         {/* ✅ APPROVE TAB */}
//         <TabsContent value="approve" className="space-y-4">
//           <div className="dashboard-card border rounded-lg p-4 bg-card shadow-sm">
//             <h2 className="text-lg font-semibold text-foreground mb-4">
//               Approval List
//             </h2>

//             <ApproveTable
//               complaints={approvalComplaints}
//               onApprove={handleApprove}
//               onReject={handleReject}
//             />
//           </div>
//         </TabsContent>

//         {/* 🛠 ASSIGN TAB */}
//         <TabsContent value="assign">
//           <AssignmentSection
//             unassignedComplaints={unassignedComplaints}
//             teams={teams.filter((t) => t.status === 'active')}
//           />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  AlertCircle,
  Clock,
  CheckCircle2,
  UserPlus,
  Languages
} from 'lucide-react';

import { StatCard } from '@/components/dashboard/StatCard';
import { ApproveTable } from '@/components/dashboard/ApproveTable';
import { AssignmentSection } from '@/components/dashboard/AssignmentSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';


import {
  mockComplaints,
  mockTeams,
  mockWorkers,
} from '@/data/mockData';

// 1. Translation Dictionary
const translations = {
  en: {
    dashboard: "Contractor Dashboard",
    subText: "Manage approvals and assign repair teams",
    registerBtn: "Register New Worker",
    statTotal: "Total Assigned",
    statUnassigned: "Unassigned",
    statInProgress: "In Progress",
    statCompleted: "Completed",
    tabApprove: "Approve",
    tabAssign: "Assign",
    tableHeader: "Approval List",
    toggleLang: "मराठीत पहा",
    sideDashboard: "Dashboard",
    sideComplaints: "Complaints",
    sideTeams: "Teams",
    btnApprove: "Approve",
    btnReject: "Not Approved",
    btnRegister: "Register New Worker",
    colLocation: "Location",
    colReports: "Reports",
    colAssigned: "Assigned",
    colBefore: "Before",
    colAction: "Approved"
  },
  mr: {
    dashboard: "कंत्राटदार डॅशबोर्ड",
    subText: "मंजुरी व्यवस्थापित करा आणि दुरुस्ती संघ नियुक्त करा",
    registerBtn: "नवीन कामगाराची नोंदणी करा",
    statTotal: "एकूण नियुक्त",
    statUnassigned: "प्रलंबित नियुक्ती",
    statInProgress: "काम सुरू आहे",
    statCompleted: "पूर्ण झाले",
    tabApprove: "मंजूर करा",
    tabAssign: "नियुक्त करा",
    tableHeader: "मंजुरी यादी",
    toggleLang: "English",
    sideDashboard: "डॅशबोर्ड",
    sideComplaints: "तक्रारी",
    sideTeams: "संघ",
    btnApprove: "मंजूर करा",
    btnReject: "नामंजूर",
    btnRegister: "नवीन कामगाराची नोंदणी",
    colLocation: "ठिकाण",
    colReports: "अहवाल",
    colAssigned: "नियुक्त संघ",
    colBefore: "दुरुस्तीपूर्वी",
    colAction: "कृती"
  }
};

export default function ContractorDashboard() {
  const navigate = useNavigate();

  // 🔥 LANGUAGE STATE
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  
  const t = translations[lang];

  // 🔥 MAIN STATE
  const [complaints, setComplaints] = useState(mockComplaints);
  const [teams, setTeams] = useState(mockTeams);

  // Filter complaints for this contractor
  const contractorComplaints = complaints.filter(
    (c) =>
      c.assignedContractor === 'RoadCare Solutions' ||
      !c.assignedContractor
  );

  const teamNames = ['Alpha Team', 'Beta Team', 'Gamma Team'];

  const contractorComplaintsWithTeams = contractorComplaints.map((c, i) => ({
    ...c,
    assignedTeam: c.assignedTeam || teamNames[i % teamNames.length],
  }));

  const approvalComplaints = contractorComplaintsWithTeams.slice(0, 1);

  const unassignedComplaints = contractorComplaints.filter(
    (c) => !c.assignedTeam && c.status === 'open'
  );

  // 📊 Stats
  const totalAssigned = contractorComplaintsWithTeams.filter((c) => c.assignedTeam).length;
  const unassigned = unassignedComplaints.length;
  const inProgress = contractorComplaints.filter((c) => c.status === 'in_progress').length;
  const completed = contractorComplaints.filter((c) => c.status === 'closed').length;

  const handleApprove = (id: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'in_progress' } : c))
    );
  };

  const handleReject = (id: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'closed' } : c))
    );
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* 🔷 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t.dashboard}
          </h1>
          <p className="text-muted-foreground">
            {t.subText}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* 🌍 LANGUAGE TOGGLE */}
          <Button
            variant="outline"
            onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
            className="border-[#25304F] text-[#25304F] font-bold gap-2"
          >
            <Languages className="h-4 w-4" />
            {t.toggleLang}
          </Button>

          <Button
            onClick={() => navigate('/contractor/teams/create')}
            className="hover:opacity-90 text-white gap-2 h-11 px-6 shadow-md transition-all active:scale-95"
            style={{ backgroundColor: '#25304F' }}
          >
            <UserPlus className="h-5 w-5" />
            <span className="font-bold">{t.registerBtn}</span>
          </Button>
        </div>
      </div>

      {/* 📊 Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t.statTotal}
          value={totalAssigned}
          icon={<ClipboardList className="h-5 w-5 text-blue-700" />}
          className="bg-blue-50 border-blue-200 shadow-sm"
        />
        <StatCard
          title={t.statUnassigned}
          value={unassigned}
          icon={<AlertCircle className="h-5 w-5 text-red-700" />}
          className="bg-red-50 border-red-200 shadow-sm"
        />
        <StatCard
          title={t.statInProgress}
          value={inProgress}
          icon={<Clock className="h-5 w-5 text-orange-700" />}
          className="bg-orange-50 border-orange-200 shadow-sm"
        />
        <StatCard
          title={t.statCompleted}
          value={completed}
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-800" />}
          className="bg-emerald-50 border-emerald-200 shadow-sm"
        />
      </div>

      {/* 📑 Tabs */}
      <Tabs defaultValue="approve" className="space-y-4">
        <TabsList className="grid w-full max-w-lg grid-cols-2">
          <TabsTrigger value="approve" className="gap-2 font-bold">
            <ClipboardList className="h-4 w-4" />
            {t.tabApprove}
          </TabsTrigger>

          <TabsTrigger value="assign" className="gap-2 font-bold">
            <AlertCircle className="h-4 w-4" />
            {t.tabAssign}
          </TabsTrigger>
        </TabsList>

        {/* ✅ APPROVE TAB */}
        <TabsContent value="approve" className="space-y-4">
          <div className="dashboard-card border rounded-lg p-6 bg-card shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-4">
              {t.tableHeader}
            </h2>

            <ApproveTable
              complaints={approvalComplaints}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </div>
        </TabsContent>

        {/* 🛠 ASSIGN TAB */}
        <TabsContent value="assign">
          <div className="dashboard-card border rounded-lg p-6 bg-card shadow-sm">
            <AssignmentSection
              unassignedComplaints={unassignedComplaints}
              teams={teams.filter((t) => t.status === 'active')}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   ClipboardList,
//   AlertCircle,
//   Clock,
//   CheckCircle2,
//   UserPlus,
//   Languages,
//   LayoutDashboard
// } from 'lucide-react';

// import { StatCard } from '@/components/dashboard/StatCard';
// import { ApproveTable } from '@/components/dashboard/ApproveTable';
// import { AssignmentSection } from '@/components/dashboard/AssignmentSection';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import WorkZoneMap from '@/pages/contractor/WorkZoneMap';

// import {
//   mockComplaints,
//   mockTeams,
// } from '@/data/mockData';

// // 1. Translation Dictionary
// const translations = {
//   en: {
//     dashboard: "Contractor Dashboard",
//     subText: "Manage approvals and assign repair teams for Solapur",
//     registerBtn: "Register New Worker",
//     statTotal: "Total Assigned",
//     statUnassigned: "Unassigned",
//     statInProgress: "In Progress",
//     statCompleted: "Completed",
//     tabApprove: "Approve",
//     tabAssign: "Assign",
//     tableHeader: "Approval List",
//     toggleLang: "मराठीत पहा",
//     colLocation: "Location",
//     colReports: "Reports",
//     colAssigned: "Assigned",
//     colBefore: "Before",
//     colAction: "Approved"
//   },
//   mr: {
//     dashboard: "कंत्राटदार डॅशबोर्ड",
//     subText: "सोलापूरसाठी मंजुरी व्यवस्थापित करा आणि दुरुस्ती संघ नियुक्त करा",
//     registerBtn: "नवीन कामगाराची नोंदणी",
//     statTotal: "एकूण नियुक्त",
//     statUnassigned: "प्रलंबित नियुक्ती",
//     statInProgress: "काम सुरू आहे",
//     statCompleted: "पूर्ण झाले",
//     tabApprove: "मंजूर करा",
//     tabAssign: "नियुक्त करा",
//     tableHeader: "मंजुरी यादी",
//     toggleLang: "English",
//     colLocation: "ठिकाण",
//     colReports: "अहवाल",
//     colAssigned: "नियुक्त संघ",
//     colBefore: "दुरुस्तीपूर्वी",
//     colAction: "कृती"
//   }
// };

// export default function ContractorDashboard() {
//   const navigate = useNavigate();

//   // 🔥 STATE MANAGEMENT
//   const [lang, setLang] = useState<'en' | 'mr'>('en');
//   const [complaints, setComplaints] = useState(mockComplaints);
//   const t = translations[lang];

//   // 🔥 DATA FILTERING LOGIC
//   const contractorComplaints = complaints.filter(
//     (c) => c.assignedContractor === 'RoadCare Solutions' || !c.assignedContractor
//   );

//   const teamNames = ['Alpha Team', 'Beta Team', 'Gamma Team'];
//   const contractorComplaintsWithTeams = contractorComplaints.map((c, i) => ({
//     ...c,
//     assignedTeam: c.assignedTeam || teamNames[i % teamNames.length],
//   }));

//   const approvalComplaints = contractorComplaintsWithTeams.slice(0, 1);
//   const unassignedComplaints = contractorComplaints.filter(
//     (c) => !c.assignedTeam && c.status === 'open'
//   );

//   // 📊 STATS CALCULATIONS
//   const totalAssigned = contractorComplaintsWithTeams.length;
//   const unassigned = unassignedComplaints.length;
//   const inProgress = contractorComplaints.filter((c) => c.status === 'in_progress').length;
//   const completed = contractorComplaints.filter((c) => c.status === 'closed').length;

//   const handleApprove = (id: string) => {
//     setComplaints((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, status: 'in_progress' } : c))
//     );
//   };

//   const handleReject = (id: string) => {
//     setComplaints((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, status: 'closed' } : c))
//     );
//   };

//   return (
//     <div className="p-1 space-y-8 animate-in fade-in duration-500 text-left">
      
//       {/* 🔷 HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6 border-slate-200">
//         <div className="space-y-1">
//           <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
//             <LayoutDashboard className="h-4 w-4" /> SMC Official Portal
//           </div>
//           <h1 className="text-3xl font-black text-[#25304F]">{t.dashboard}</h1>
//           <p className="text-slate-500 font-medium">{t.subText}</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <Button
//             variant="outline"
//             onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
//             className="border-2 border-[#25304F] text-[#25304F] font-bold gap-2 px-6 h-12 hover:bg-[#25304F] hover:text-white transition-all shadow-sm"
//           >
//             <Languages className="h-5 w-5" />
//             {t.toggleLang}
//           </Button>

//           <Button
//             onClick={() => navigate('/contractor/teams/create')}
//             className="text-white gap-2 h-12 px-8 shadow-xl hover:shadow-2xl transition-all active:scale-95 font-bold"
//             style={{ backgroundColor: '#25304F' }}
//           >
//             <UserPlus className="h-5 w-5" />
//             {t.registerBtn}
//           </Button>
//         </div>
//       </div>

//       {/* 📊 STATISTICS CARDS */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         <StatCard
//           title={t.statTotal}
//           value={totalAssigned}
//           icon={<ClipboardList className="h-6 w-6 text-blue-700" />}
//           className="bg-blue-50/50 border-blue-200 shadow-sm rounded-2xl"
//         />
//         <StatCard
//           title={t.statUnassigned}
//           value={unassigned}
//           icon={<AlertCircle className="h-6 w-6 text-red-700" />}
//           className="bg-red-50/50 border-red-200 shadow-sm rounded-2xl"
//         />
//         <StatCard
//           title={t.statInProgress}
//           value={inProgress}
//           icon={<Clock className="h-6 w-6 text-orange-700" />}
//           className="bg-orange-50/50 border-orange-200 shadow-sm rounded-2xl"
//         />
//         <StatCard
//           title={t.statCompleted}
//           value={completed}
//           icon={<CheckCircle2 className="h-6 w-6 text-emerald-800" />}
//           className="bg-emerald-50/50 border-emerald-200 shadow-sm rounded-2xl"
//         />
//       </div>

//       {/* 🗺️ VISUALIZATION: LIVE SITE PROGRESS MAP */}
//       <div className="bg-white p-2 rounded-[2rem] border-2 border-slate-100 shadow-xl overflow-hidden">
//          <WorkZoneMap />
//       </div>

//       {/* 📑 WORKFLOW TABS (Approve & Assign) */}
//       <Tabs defaultValue="approve" className="space-y-6 pt-4">
//         <TabsList className="inline-flex h-14 items-center justify-center rounded-2xl bg-slate-100 p-1.5 text-slate-500 w-full max-w-md shadow-inner">
//           <TabsTrigger 
//             value="approve" 
//             className="w-full gap-2 font-black text-sm rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-[#25304F] data-[state=active]:shadow-md transition-all"
//           >
//             <CheckCircle2 className="h-4 w-4" />
//             {t.tabApprove}
//           </TabsTrigger>
//           <TabsTrigger 
//             value="assign" 
//             className="w-full gap-2 font-black text-sm rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-[#25304F] data-[state=active]:shadow-md transition-all"
//           >
//             <UserPlus className="h-4 w-4" />
//             {t.tabAssign}
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="approve" className="animate-in slide-in-from-left-4 duration-300">
//           <div className="bg-white border-2 border-slate-50 rounded-[2rem] p-8 shadow-sm">
//             <h2 className="text-2xl font-black text-[#25304F] mb-6 flex items-center gap-2">
//               <ClipboardList className="h-6 w-6 text-primary" /> {t.tableHeader}
//             </h2>
//             <ApproveTable
//               complaints={approvalComplaints}
//               onApprove={handleApprove}
//               onReject={handleReject}
//             />
//           </div>
//         </TabsContent>

//         <TabsContent value="assign" className="animate-in slide-in-from-right-4 duration-300">
//           <div className="bg-white border-2 border-slate-50 rounded-[2rem] p-8 shadow-sm">
//             <AssignmentSection
//               unassignedComplaints={unassignedComplaints}
//               teams={mockTeams.filter((t) => t.status === 'active')}
//             />
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
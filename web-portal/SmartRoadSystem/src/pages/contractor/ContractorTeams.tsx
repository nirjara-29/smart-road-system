// /**
//  * Contractor Teams Page
//  * Team management for contractors
//  */

// import { useState } from 'react';
// import { UsersRound } from 'lucide-react';
// import { TeamManagement } from '@/components/dashboard/TeamManagement';
// import { mockTeams, mockWorkers } from '@/data/mockData';
// import type { Team } from '@/types';

// export default function ContractorTeams() {
//   const [teams, setTeams] = useState<Team[]>(mockTeams);

//   // Handle team creation
//   const handleCreateTeam = (teamName: string, zone: string, selectedWorkerIds: string[]) => {
//     const selectedWorkers = mockWorkers.filter((w) => selectedWorkerIds.includes(w.id));
//     const newTeam: Team = {
//       id: `TEAM-${Date.now()}`,
//       name: teamName,
//       zone: zone,
//       members: selectedWorkers,
//       status: 'active',
//       assignedComplaints: 0,
//     };
//     setTeams((prev) => [...prev, newTeam]);
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Page Header */}
//       <div className="flex items-center gap-3">
//         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
//           <UsersRound className="h-5 w-5 text-accent" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
//           <p className="text-muted-foreground">
//             Create and manage your repair teams
//           </p>
//         </div>
//       </div>

//       {/* Team Management */}
//       <TeamManagement
//         teams={teams}
//         availableWorkers={mockWorkers}
//         onCreateTeam={handleCreateTeam}
//       />
//     </div>
//   );
// }

/**
 * Contractor Teams Page
 * Team management for contractors
 */

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // 1. Added for navigation
// import { UsersRound, UserPlus } from 'lucide-react'; // 2. Added UserPlus icon
// import { Button } from '@/components/ui/button'; // 3. Added Button import
// import { TeamManagement } from '@/components/dashboard/TeamManagement';
// import { mockTeams, mockWorkers } from '@/data/mockData';
// import type { Team } from '@/types';

// export default function ContractorTeams() {
//   const navigate = useNavigate(); // 4. Initialize navigation
//   const [teams, setTeams] = useState<Team[]>(mockTeams);

//   // Handle team creation
//   const handleCreateTeam = (teamName: string, zone: string, selectedWorkerIds: string[]) => {
//     const selectedWorkers = mockWorkers.filter((w) => selectedWorkerIds.includes(w.id));
//     const newTeam: Team = {
//       id: `TEAM-${Date.now()}`,
//       name: teamName,
//       zone: zone,
//       members: selectedWorkers,
//       status: 'active',
//       assignedComplaints: 0,
//     };
//     setTeams((prev) => [...prev, newTeam]);
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
//             <UsersRound className="h-5 w-5 text-accent" />
//           </div>
//           <div className="text-left">
//             <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
//             <p className="text-muted-foreground">
//               Create and manage your repair teams
//             </p>
//           </div>
//         </div>

//         {/* 5. ADDED: New Button to Register Individual Workers */}
//         <Button 
//           onClick={() => navigate('/contractor/teams/create')} 
//           className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
//         >
//           <UserPlus className="h-4 w-4" />
//           Register New Worker
//         </Button>
//       </div>

//       {/* Team Management */}
//       <TeamManagement
//         teams={teams}
//         availableWorkers={mockWorkers}
//         onCreateTeam={handleCreateTeam}
//       />
//     </div>
//   );
// }

/**
 * Contractor Teams Page
 * Team management for contractors
 */

import { useState } from 'react';
// 1. Removed useNavigate since we aren't navigating to the create page from here anymore
import { UsersRound } from 'lucide-react'; 
import { TeamManagement } from '@/components/dashboard/TeamManagement';
import { mockTeams, mockWorkers } from '@/data/mockData';
import type { Team } from '@/types';

export default function ContractorTeams() {
  const [teams, setTeams] = useState<Team[]>(mockTeams);

  // Handle team creation
  const handleCreateTeam = (teamName: string, zone: string, selectedWorkerIds: string[]) => {
    const selectedWorkers = mockWorkers.filter((w) => selectedWorkerIds.includes(w.id));
    const newTeam: Team = {
      id: `TEAM-${Date.now()}`,
      name: teamName,
      zone: zone,
      members: selectedWorkers,
      status: 'active',
      assignedComplaints: 0,
    };
    setTeams((prev) => [...prev, newTeam]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <UsersRound className="h-5 w-5 text-accent" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
            <p className="text-muted-foreground">
              Create and manage your repair teams
            </p>
          </div>
        </div>
        
        {/* The Register New Worker Button has been removed from here */}
      </div>

      {/* Team Management Component */}
      <TeamManagement
        teams={teams}
        availableWorkers={mockWorkers}
        onCreateTeam={handleCreateTeam}
      />
    </div>
  );
}
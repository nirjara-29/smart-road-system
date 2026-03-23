import { useNavigate } from 'react-router-dom'; 
import { Button } from '@/components/ui/button'; 
import { Plus, Users, FileWarning, CheckCircle2, AlertCircle, Clock, User } from 'lucide-react'; 
import { StatCard } from '@/components/dashboard/StatCard';
import { ComplaintTable } from '@/components/dashboard/ComplaintTable';
import { ContractorTable } from '@/components/dashboard/ContractorTable';
import { ComplaintsBarChart, StatusPieChart } from '@/components/dashboard/Charts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  mockComplaints,
  mockContractors,
  complaintsPerWard,
  complaintStatusData,
} from '@/data/mockData';

export default function AdminDashboard() {
  const navigate = useNavigate(); 

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground text-left">Overview of road damage complaints and contractor performance</p>
      </div>

      
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
  <StatCard 
    title="Total Contractors" 
    value={mockContractors.length} 
    icon={<User className="h-5 w-5" />} 
    className="bg-blue-300 border-blue-700 shadow-md"
  />
  
  <StatCard 
    title="Total Complaints" 
    value={mockComplaints.length} 
    icon={<FileWarning className="h-5 w-5 text-blue-700" />} 
    className="bg-red-400 border-red-700" 
  />

  {/* DARKER OPEN CARD - Deep Orange */}
  <StatCard 
    title="Open" 
    value={mockComplaints.filter(c => c.status === 'open').length} 
    icon={<AlertCircle className="h-5 w-5 text-orange-700" />} 
    className="bg-orange-300 border-orange-700 shadow-sm" 
  />

  {/* DARKER CLOSED CARD - Deep Emerald Green */}
  <StatCard 
    title="Closed" 
    value={mockComplaints.filter(c => c.status === 'closed').length} 
    icon={<CheckCircle2 className="h-5 w-5 text-emerald-800" />} 
    className="bg-green-500 border-green-700 shadow-sm" 
  />
</div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ComplaintsBarChart data={complaintsPerWard} title="Complaints by Ward" />
        <StatusPieChart data={complaintStatusData} title="Status Distribution" />
      </div>

      <Tabs defaultValue="complaints" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="contractors">Contractors</TabsTrigger>
        </TabsList>

        <TabsContent value="complaints">
          <div className="dashboard-card border rounded-lg p-4 bg-card shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-left">Complaint Management</h2>
            <ComplaintTable complaints={mockComplaints} showAssignment={true} />
          </div>
        </TabsContent>

        <TabsContent value="contractors">
          <div className="dashboard-card border rounded-lg p-4 bg-card shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Contractor Management</h2>
              <Button onClick={() => navigate('/admin/contractors/create')} size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Add Contractor
              </Button>
            </div>
            <ContractorTable contractors={mockContractors} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
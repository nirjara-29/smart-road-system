import { Plus, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ContractorTable } from '@/components/dashboard/ContractorTable';
import { mockContractors } from '@/data/mockData';

export default function AdminContractors() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Contractors</h1>
            <p className="text-muted-foreground">Manage contractor organizations</p>
          </div>
        </div>

        <Button onClick={() => navigate('/admin/contractors/create')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create Contractor
        </Button>
      </div>

      <div className="dashboard-card border rounded-lg p-4 bg-card shadow-sm">
        <ContractorTable contractors={mockContractors} />
      </div>
    </div>
  );
}
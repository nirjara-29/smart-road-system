/**
 * Mock data for Smart Road Damage Management System
 * This static data simulates backend responses for development
 */

import type {
  Complaint,
  Contractor,
  Worker,
  Team,
  Notification,
  ChartDataPoint,
} from '@/types';

// Mock complaints data
export const mockComplaints: Complaint[] = [
  {
    id: 'CMP-2024-001',
    location: 'MG Road, Near City Mall',
    ward: 'Ward 1',
    timestamp: '2024-01-15T09:30:00',
    severity: 'critical',
    status: 'open',
    priority: 'urgent',
    description: 'Large pothole causing traffic hazard',
    slaDeadline: '2024-01-16T09:30:00',
    reportedBy: 'Citizen App',
  },
  {
    id: 'CMP-2024-002',
    location: 'Gandhi Nagar, Sector 5',
    ward: 'Ward 3',
    timestamp: '2024-01-14T14:15:00',
    severity: 'high',
    status: 'in_progress',
    priority: 'high',
    description: 'Road surface damaged after heavy rain',
    assignedTeam: 'Alpha Team',
    assignedContractor: 'RoadCare Solutions',
    slaDeadline: '2024-01-17T14:15:00',
    reportedBy: 'Field Officer',
  },
  {
    id: 'CMP-2024-003',
    location: 'Nehru Street, Block B',
    ward: 'Ward 2',
    timestamp: '2024-01-13T11:00:00',
    severity: 'medium',
    status: 'in_progress',
    priority: 'medium',
    description: 'Cracks developing on main road',
    assignedTeam: 'Beta Team',
    assignedContractor: 'Urban Infra Pvt Ltd',
    slaDeadline: '2024-01-18T11:00:00',
    reportedBy: 'Citizen App',
  },
  {
    id: 'CMP-2024-004',
    location: 'Patel Chowk',
    ward: 'Ward 4',
    timestamp: '2024-01-12T16:45:00',
    severity: 'low',
    status: 'closed',
    priority: 'low',
    description: 'Minor surface wear near junction',
    assignedTeam: 'Gamma Team',
    assignedContractor: 'RoadCare Solutions',
    slaDeadline: '2024-01-19T16:45:00',
    reportedBy: 'Municipal Inspector',
  },
  {
    id: 'CMP-2024-005',
    location: 'Industrial Area, Phase 2',
    ward: 'Ward 5',
    timestamp: '2024-01-11T08:20:00',
    severity: 'high',
    status: 'open',
    priority: 'high',
    description: 'Heavy vehicle damage to road surface',
    slaDeadline: '2024-01-14T08:20:00',
    reportedBy: 'Citizen App',
  }

];

// Mock contractors data
export const mockContractors: Contractor[] = [
  {
    id: 'CON-001',
    name: 'Rajesh Khanna',
    email: 'contact@roadcare.com',
    mobile: '+91 98765 43210',
    assignedComplaints: 4,
    completedComplaints: 1,
    slaCompliance: 50,
    status: 'active',
    zones: ['Ward 1', 'Ward 4', 'Ward 5'],
  },
 
];

// Mock workers data
export const mockWorkers: Worker[] = [
  { id: 'WRK-001', name: 'Rajesh Kumar', mobile: '+91 98765 11111', role: 'Supervisor', available: true },
  { id: 'WRK-002', name: 'Suresh Sharma', mobile: '+91 98765 22222', role: 'Technician', available: true },
  { id: 'WRK-003', name: 'Mahesh Singh', mobile: '+91 98765 33333', role: 'Driver', available: false, assignedTeam: 'Alpha Team' },
  { id: 'WRK-004', name: 'Ramesh Gupta', mobile: '+91 98765 44444', role: 'Laborer', available: true },
  { id: 'WRK-005', name: 'Dinesh Patel', mobile: '+91 98765 55555', role: 'Technician', available: false, assignedTeam: 'Beta Team' },
  { id: 'WRK-006', name: 'Ganesh Verma', mobile: '+91 98765 66666', role: 'Supervisor', available: true },
  { id: 'WRK-007', name: 'Lokesh Yadav', mobile: '+91 98765 77777', role: 'Driver', available: true },
  { id: 'WRK-008', name: 'Prakash Joshi', mobile: '+91 98765 88888', role: 'Laborer', available: false, assignedTeam: 'Alpha Team' },
];

// Mock teams data
export const mockTeams: Team[] = [
  {
    id: 'TEAM-001',
    name: 'Alpha Team',
    zone: 'Ward 1',
    members: mockWorkers.filter(w => w.assignedTeam === 'Alpha Team'),
    status: 'active',
    assignedComplaints: 5,
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: 'NOT-001',
    title: 'New Critical Complaint',
    message: 'Critical road damage reported at MG Road',
    timestamp: '2024-01-15T09:30:00',
    read: false,
    type: 'warning',
  },
  {
    id: 'NOT-002',
    title: 'SLA Breach Warning',
    message: 'Complaint CMP-2024-005 approaching SLA deadline',
    timestamp: '2024-01-15T08:00:00',
    read: false,
    type: 'error',
  },
  {
    id: 'NOT-003',
    title: 'Complaint Resolved',
    message: 'CMP-2024-006 marked as completed by Alpha Team',
    timestamp: '2024-01-14T17:00:00',
    read: true,
    type: 'success',
  },
  {
    id: 'NOT-004',
    title: 'New Contractor Added',
    message: 'Metro Roads Corp has been onboarded',
    timestamp: '2024-01-13T10:00:00',
    read: true,
    type: 'info',
  },
];

// Chart data - Complaints per ward
export const complaintsPerWard: ChartDataPoint[] = [
  { name: 'Ward 1', value: 24, color: 'hsl(var(--chart-1))' },
  { name: 'Ward 2', value: 18, color: 'hsl(var(--chart-2))' },
  { name: 'Ward 3', value: 15, color: 'hsl(var(--chart-3))' },
  { name: 'Ward 4', value: 12, color: 'hsl(var(--chart-4))' },
  { name: 'Ward 5', value: 20, color: 'hsl(var(--chart-5))' },
  { name: 'Ward 6', value: 8, color: 'hsl(var(--chart-1))' },
];

// Chart data - Complaint status distribution
export const complaintStatusData: ChartDataPoint[] = [
  { name: 'Open', value: 35, color: 'hsl(var(--status-open))' },
  { name: 'In Progress', value: 28, color: 'hsl(var(--status-progress))' },
  { name: 'Closed', value: 52, color: 'hsl(var(--status-closed))' },
];

// Location options for filters
export const locationOptions = [
  'All Locations',
  'Ward 1',
  'Ward 2',
  'Ward 3',
  'Ward 4',
  'Ward 5',
  'Ward 6',
  'Ward 7',
];

// Zone options
export const zoneOptions = [
  'Ward 1',
  'Ward 2',
  'Ward 3',
  'Ward 4',
  'Ward 5',
  'Ward 6',
  'Ward 7',
];

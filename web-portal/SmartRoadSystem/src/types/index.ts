/**
 * Type definitions for Smart Road Damage Management System
 * All interfaces and types used across the application
 */

// User roles in the system
export type UserRole = 'admin' | 'contractor';

// Severity levels for road damage complaints
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

// Status of a complaint
export type ComplaintStatus = 'open' | 'in_progress' | 'closed';

// Status of a contractor or team
export type ActiveStatus = 'active' | 'inactive';

// Priority levels for task assignment
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

/**
 * User interface for login and authentication
 */
export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: UserRole;
  avatar?: string;
}

/**
 * Complaint/Road Damage Report
 */
export interface Complaint {
  id: string;
  location: string;
  ward: string;
  timestamp: string;
  severity: SeverityLevel;
  status: ComplaintStatus;
  priority: PriorityLevel;
  description: string;
  assignedTeam?: string;
  assignedContractor?: string;
  slaDeadline: string;
  images?: string[];
  reportedBy?: string;
}

/**
 * Contractor organization
 */
export interface Contractor {
  id: string;
  name: string;
  email: string;
  mobile: string;
  assignedComplaints: number;
  completedComplaints: number;
  slaCompliance: number;
  status: ActiveStatus;
  zones: string[];
}

/**
 * Worker within a contractor's organization
 */
export interface Worker {
  id: string;
  name: string;
  mobile: string;
  role: string;
  available: boolean;
  assignedTeam?: string;
}

/**
 * Team for handling road repairs
 */
export interface Team {
  id: string;
  name: string;
  zone: string;
  members: Worker[];
  status: ActiveStatus;
  assignedComplaints: number;
}

/**
 * Dashboard statistics card data
 */
export interface StatCardData {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'danger';
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

/**
 * Filter options for complaint table
 */
export interface ComplaintFilters {
  location: string;
  startDate: string;
  endDate: string;
  status: ComplaintStatus | 'all';
  severity: SeverityLevel | 'all';
}

/**
 * Notification item
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

/**
 * Navigation menu item
 */
export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

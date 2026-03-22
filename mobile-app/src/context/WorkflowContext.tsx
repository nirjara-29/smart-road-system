import React, { createContext, useContext, useMemo, useState } from 'react';

export type AssignmentStatus = 'Assigned' | 'In Progress' | 'Completed';
export type AssignmentSeverity = 'Low' | 'Medium' | 'High';
export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';
export type NotificationRole = 'citizen' | 'worker' | 'contractor';
export type NotificationType = 'upload' | 'approval' | 'status';

export type ProgressPhoto = {
  id: string;
  uri: string;
  remark?: string;
  uploadedAt: string;
  uploadedBy: string;
};

export type Assignment = {
  id: string;
  description: string;
  location: string;
  status: AssignmentStatus;
  severity: AssignmentSeverity;
  team: string[];
  progressPhotos: ProgressPhoto[];
  approvalStatus: ApprovalStatus;
  reviewedBy: string | null;
};

type NotificationMessageParams = Record<string, string>;

export type AppNotification = {
  id: string;
  role: NotificationRole;
  type: NotificationType;
  titleKey: string;
  messageKey: string;
  messageParams?: NotificationMessageParams;
  createdAt: string;
  read: boolean;
};

type WorkflowContextValue = {
  assignments: Assignment[];
  notifications: AppNotification[];
  uploadProgress: (assignmentId: string, photoUri: string, remark?: string) => void;
  reviewProgress: (
    assignmentId: string,
    decision: 'Approved' | 'Rejected',
    contractorId: string,
    nextStatus?: AssignmentStatus,
  ) => void;
  getNotificationsForRole: (role: NotificationRole) => AppNotification[];
  getUnreadCount: (role: NotificationRole) => number;
  markRoleNotificationsRead: (role: NotificationRole) => void;
};

const initialAssignments: Assignment[] = [
  {
    id: 'SMC-RD-4927',
    description: 'Deep crack along residential road edge.',
    location: 'Ward 12, Maple Street',
    status: 'Assigned',
    severity: 'High',
    team: ['WK-102', 'WK-187'],
    progressPhotos: [],
    approvalStatus: 'Pending',
    reviewedBy: null,
  },
  {
    id: 'SMC-RD-4881',
    description: 'Pothole near bus stop with pooling water.',
    location: 'Central Ave, Block 7',
    status: 'In Progress',
    severity: 'Medium',
    team: ['WK-054'],
    progressPhotos: [],
    approvalStatus: 'Pending',
    reviewedBy: null,
  },
  {
    id: 'SMC-RD-4790',
    description: 'Surface wear and minor cracks on service lane.',
    location: 'South Park Loop',
    status: 'Completed',
    severity: 'Low',
    team: ['WK-233', 'WK-110'],
    progressPhotos: [],
    approvalStatus: 'Approved',
    reviewedBy: 'CTR-001',
  },
];

const WorkflowContext = createContext<WorkflowContextValue | null>(null);

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function getStatusForNotification(status: AssignmentStatus) {
  return status;
}

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const pushNotification = (
    role: NotificationRole,
    type: NotificationType,
    titleKey: string,
    messageKey: string,
    messageParams?: NotificationMessageParams,
  ) => {
    setNotifications((prev) => [
      {
        id: makeId('notif'),
        role,
        type,
        titleKey,
        messageKey,
        messageParams,
        createdAt: new Date().toISOString(),
        read: false,
      },
      ...prev,
    ]);
  };

  const uploadProgress = (assignmentId: string, photoUri: string, remark?: string) => {
    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id !== assignmentId) {
          return assignment;
        }

        const photo: ProgressPhoto = {
          id: makeId('photo'),
          uri: photoUri,
          remark: remark?.trim() || undefined,
          uploadedAt: new Date().toISOString(),
          uploadedBy: 'worker',
        };

        return {
          ...assignment,
          progressPhotos: [photo, ...assignment.progressPhotos],
          approvalStatus: 'Pending',
          reviewedBy: null,
        };
      }),
    );

    pushNotification(
      'contractor',
      'upload',
      'notifications.progressUploaded.title',
      'notifications.progressUploaded.message',
      { assignmentId },
    );
  };

  const reviewProgress = (
    assignmentId: string,
    decision: 'Approved' | 'Rejected',
    contractorId: string,
    nextStatus?: AssignmentStatus,
  ) => {
    let changedStatusLabel: AssignmentStatus | null = null;

    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id !== assignmentId) {
          return assignment;
        }

        const updatedStatus =
          decision === 'Approved' && nextStatus ? nextStatus : assignment.status;
        changedStatusLabel =
          updatedStatus !== assignment.status ? getStatusForNotification(updatedStatus) : null;

        return {
          ...assignment,
          status: updatedStatus,
          approvalStatus: decision,
          reviewedBy: contractorId,
        };
      }),
    );

    pushNotification(
      'worker',
      'approval',
      decision === 'Approved'
        ? 'notifications.progressApproved.title'
        : 'notifications.progressRejected.title',
      decision === 'Approved'
        ? 'notifications.progressApproved.message'
        : 'notifications.progressRejected.message',
      { assignmentId, contractorId },
    );

    if (changedStatusLabel) {
      pushNotification(
        'citizen',
        'status',
        'notifications.statusUpdated.title',
        'notifications.statusUpdated.message',
        { assignmentId, status: changedStatusLabel },
      );
    }
  };

  const getNotificationsForRole = (role: NotificationRole) => {
    return notifications.filter((notification) => notification.role === role);
  };

  const getUnreadCount = (role: NotificationRole) => {
    return notifications.filter((notification) => notification.role === role && !notification.read)
      .length;
  };

  const markRoleNotificationsRead = (role: NotificationRole) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.role === role ? { ...notification, read: true } : notification,
      ),
    );
  };

  const value = useMemo<WorkflowContextValue>(
    () => ({
      assignments,
      notifications,
      uploadProgress,
      reviewProgress,
      getNotificationsForRole,
      getUnreadCount,
      markRoleNotificationsRead,
    }),
    [assignments, notifications],
  );

  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used inside WorkflowProvider');
  }
  return context;
}

import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useWorkflow } from '../context/WorkflowContext';
import {
  AppHeader,
  Badge,
  LinkButton,
  NotificationPanel,
  PrimaryButton,
  Screen,
} from '../ui/components';
import { colors, radius, shadow, spacing, typography } from '../ui/theme';

export default function WorkerAssignments({ navigation }: any) {
  const { t } = useTranslation();
  const {
    assignments,
    getNotificationsForRole,
    getUnreadCount,
    markRoleNotificationsRead,
  } = useWorkflow();
  const [showNotifications, setShowNotifications] = useState(false);

  const hasAssignments = useMemo(() => assignments.length > 0, [assignments.length]);

  const severityVariant = (severity: 'Low' | 'Medium' | 'High') => {
    if (severity === 'High') {
      return 'danger';
    }
    if (severity === 'Medium') {
      return 'warning';
    }
    return 'success';
  };

  const approvalVariant = (approvalStatus: 'Pending' | 'Approved' | 'Rejected') => {
    if (approvalStatus === 'Approved') {
      return 'success';
    }
    if (approvalStatus === 'Rejected') {
      return 'danger';
    }
    return 'warning';
  };

  const translateSeverity = (severity: 'Low' | 'Medium' | 'High') => {
    switch (severity) {
      case 'High':
        return t('severity.high');
      case 'Medium':
        return t('severity.medium');
      case 'Low':
        return t('severity.low');
      default:
        return severity;
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case 'Assigned':
        return t('status.assigned');
      case 'In Progress':
        return t('status.inProgress');
      case 'Completed':
        return t('status.completed');
      case 'Pending':
        return t('status.pending');
      case 'Resolved':
        return t('status.resolved');
      default:
        return status;
    }
  };

  const translateApproval = (status: 'Pending' | 'Approved' | 'Rejected') => {
    switch (status) {
      case 'Approved':
        return t('approvalStatus.approved');
      case 'Rejected':
        return t('approvalStatus.rejected');
      case 'Pending':
        return t('approvalStatus.pending');
      default:
        return status;
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader
          title={t('workerAssignments.headerTitle')}
          subtitle={t('workerAssignments.headerSubtitle')}
          unreadCount={getUnreadCount('worker')}
          onPressNotifications={() => setShowNotifications(true)}
        />

        {!hasAssignments ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t('workerAssignments.emptyTitle')}</Text>
            <Text style={styles.emptyText}>{t('workerAssignments.emptyText')}</Text>
          </View>
        ) : null}

        {assignments.map((assignment) => (
          <View key={assignment.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{assignment.id}</Text>
              <Badge
                label={translateSeverity(assignment.severity)}
                variant={severityVariant(assignment.severity)}
              />
            </View>
            <Text style={styles.cardDescription}>{assignment.description}</Text>
            <Text style={styles.cardMeta}>
              {t('workerAssignments.locationLabel', { location: assignment.location })}
            </Text>
            <Text style={styles.cardMeta}>
              {t('workerAssignments.issueStatusLabel', {
                status: translateStatus(assignment.status),
              })}
            </Text>
            <Text style={styles.cardMeta}>
              {t('workerAssignments.teamLabel', { team: assignment.team.join(', ') })}
            </Text>
            <Text style={styles.cardMeta}>
              {assignment.reviewedBy
                ? t('workerAssignments.reviewedByLabel', { reviewedBy: assignment.reviewedBy })
                : t('workerAssignments.pendingReview')}
            </Text>
            <View style={styles.badgeRow}>
              <Badge
                label={t('workerAssignments.approvalLabel', {
                  status: translateApproval(assignment.approvalStatus),
                })}
                variant={approvalVariant(assignment.approvalStatus)}
              />
            </View>

            <PrimaryButton
              label={t('workerAssignments.uploadProgress')}
              onPress={() =>
                navigation.navigate('WorkerUpdate', {
                  assignmentId: assignment.id,
                })
              }
            />
          </View>
        ))}

        <LinkButton label={t('workerAssignments.backToDashboard')} onPress={() => navigation.goBack()} />
      </ScrollView>

      <NotificationPanel
        visible={showNotifications}
        notifications={getNotificationsForRole('worker')}
        onClose={() => setShowNotifications(false)}
        onMarkAllRead={() => markRoleNotificationsRead('worker')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  cardDescription: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  cardMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  badgeRow: {
    marginTop: spacing.xs,
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  emptyTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
});

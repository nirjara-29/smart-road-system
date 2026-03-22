import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useWorkflow } from '../context/WorkflowContext';
import {
  ActionCard,
  AppHeader,
  NotificationPanel,
  PrimaryButton,
  Screen,
} from '../ui/components';
import { colors, spacing, typography } from '../ui/theme';

export default function WorkerHome({ navigation }: any) {
  const { t } = useTranslation();
  const {
    assignments,
    getNotificationsForRole,
    getUnreadCount,
    markRoleNotificationsRead,
  } = useWorkflow();
  const [showNotifications, setShowNotifications] = useState(false);

  const rejectedCount = useMemo(
    () => assignments.filter((item) => item.approvalStatus === 'Rejected').length,
    [assignments],
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader
          title={t('workerHome.headerTitle')}
          subtitle={t('workerHome.headerSubtitle')}
          unreadCount={getUnreadCount('worker')}
          onPressNotifications={() => setShowNotifications(true)}
        />

        <PrimaryButton
          label={t('workerHome.viewAssignments')}
          size="large"
          onPress={() => navigation.navigate('WorkerAssignments')}
        />

        <View style={styles.cardStack}>
          <ActionCard
            title={t('workerHome.uploadProgressTitle')}
            subtitle={t('workerHome.uploadProgressSubtitle')}
            onPress={() => navigation.navigate('WorkerAssignments')}
          />
          <ActionCard
            title={t('workerHome.changeLanguage')}
            subtitle={t('workerHome.changeLanguageSubtitle')}
            onPress={() => navigation.navigate('LanguageSettings')}
          />
          <ActionCard
            title={t('workerHome.logout')}
            subtitle={t('workerHome.logoutSubtitle')}
            onPress={() => navigation.replace('Login')}
          />
        </View>

        <Text style={styles.tipText}>
          {rejectedCount > 0
            ? t('workerHome.rejectedTip', { count: rejectedCount })
            : t('workerHome.generalTip')}
        </Text>
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
  cardStack: {
    marginTop: spacing.lg,
  },
  tipText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});

import React from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppNotification, NotificationType } from '../context/WorkflowContext';
import { colors, spacing, radius, typography, shadow } from './theme';

type ScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Screen({ children, style }: ScreenProps) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

type TextFieldProps = TextInputProps & {
  label: string;
  helperText?: string;
};

export function TextField({ label, helperText, style, ...props }: TextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primary}
        {...props}
        style={[styles.input, style]}
      />
      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'normal' | 'large';
};

export function PrimaryButton({
  label,
  onPress,
  fullWidth = true,
  disabled = false,
  loading = false,
  size = 'normal',
}: ButtonProps) {
  const { t } = useTranslation();
  const buttonLabel = loading ? t('common.submitting') : label;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        size === 'large' && styles.buttonLarge,
        styles.primaryButton,
        fullWidth && styles.fullWidth,
        (pressed || disabled || loading) && styles.buttonPressed,
        (disabled || loading) && styles.buttonDisabled,
      ]}
    >
      <Text style={styles.primaryButtonText}>{buttonLabel}</Text>
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
  fullWidth = true,
  disabled = false,
  size = 'normal',
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        size === 'large' && styles.buttonLarge,
        styles.secondaryButton,
        fullWidth && styles.fullWidth,
        (pressed || disabled) && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function LinkButton({ label, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.linkButton}>
      <Text style={styles.linkText}>{label}</Text>
    </Pressable>
  );
}

type ActionCardProps = {
  title: string;
  subtitle?: string;
  onPress: () => void;
};

export function ActionCard({ title, subtitle, onPress }: ActionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.cardAccent} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

type BadgeProps = {
  label: string;
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
};

export function Badge({ label, variant = 'neutral' }: BadgeProps) {
  const variantStyle = badgeVariants[variant];
  return (
    <View style={[styles.badge, variantStyle.container]}>
      <Text style={[styles.badgeText, variantStyle.text]}>{label}</Text>
    </View>
  );
}

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  unreadCount: number;
  onPressNotifications: () => void;
};

export function AppHeader({
  title,
  subtitle,
  unreadCount,
  onPressNotifications,
}: AppHeaderProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.appHeader}>
      <View style={styles.appHeaderTextWrap}>
        <Text style={styles.appHeaderTitle}>{title}</Text>
        {subtitle ? <Text style={styles.appHeaderSubtitle}>{subtitle}</Text> : null}
      </View>
      <Pressable
        style={styles.bellButton}
        onPress={onPressNotifications}
        accessibilityLabel={t('notifications.openLabel')}
      >
        <Text style={styles.bellIcon}>N</Text>
        {unreadCount > 0 ? (
          <View style={styles.bellBadge}>
            <Text style={styles.bellBadgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

type NotificationPanelProps = {
  visible: boolean;
  notifications: AppNotification[];
  onClose: () => void;
  onMarkAllRead: () => void;
};

const iconByType: Record<NotificationType, string> = {
  upload: 'UP',
  approval: 'AR',
  status: 'ST',
};

const toneByType: Record<NotificationType, 'info' | 'success' | 'warning'> = {
  upload: 'info',
  approval: 'warning',
  status: 'success',
};

export function NotificationPanel({
  visible,
  notifications,
  onClose,
  onMarkAllRead,
}: NotificationPanelProps) {
  const { t } = useTranslation();

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

  const resolveParams = (params?: Record<string, string>) => {
    if (!params) {
      return undefined;
    }
    if (params.status) {
      return { ...params, status: translateStatus(params.status) };
    }
    return params;
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.overlayDismiss} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{t('notifications.title')}</Text>
            <View style={styles.sheetHeaderActions}>
              <LinkButton label={t('notifications.markAllRead')} onPress={onMarkAllRead} />
              <LinkButton label={t('notifications.close')} onPress={onClose} />
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {notifications.length === 0 ? (
              <View style={styles.emptyNotifications}>
                <Text style={styles.emptyTitle}>{t('notifications.emptyTitle')}</Text>
                <Text style={styles.emptyText}>{t('notifications.emptyText')}</Text>
              </View>
            ) : null}

            {notifications.map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                <View
                  style={[
                    styles.notificationIcon,
                    toneByType[notification.type] === 'info' && styles.notificationIconInfo,
                    toneByType[notification.type] === 'success' &&
                      styles.notificationIconSuccess,
                    toneByType[notification.type] === 'warning' &&
                      styles.notificationIconWarning,
                  ]}
                >
                  <Text style={styles.notificationIconText}>{iconByType[notification.type]}</Text>
                </View>
                <View style={styles.notificationTextWrap}>
                  <Text style={styles.notificationTitle}>{t(notification.titleKey)}</Text>
                  <Text style={styles.notificationMessage}>
                    {t(notification.messageKey, resolveParams(notification.messageParams))}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {new Date(notification.createdAt).toLocaleString()}
                  </Text>
                </View>
                {!notification.read ? <View style={styles.unreadDot} /> : null}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  field: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    fontSize: 16,
    minHeight: 48,
  },
  helper: {
    marginTop: spacing.xs,
    color: colors.textMuted,
    fontSize: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    marginTop: spacing.sm,
    minHeight: 48,
  },
  buttonLarge: {
    paddingVertical: spacing.md + 4,
    minHeight: 56,
  },
  fullWidth: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    ...shadow.card,
  },
  primaryButtonText: {
    ...typography.bodyStrong,
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  linkButton: {
    paddingVertical: spacing.xs,
  },
  linkText: {
    ...typography.bodyStrong,
    color: colors.primary,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cardPressed: {
    borderColor: colors.primary,
  },
  cardAccent: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    ...typography.bodyStrong,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    ...typography.body,
    color: colors.textMuted,
  },
  sectionHeader: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.title,
    color: colors.text,
  },
  sectionSubtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  badgeText: {
    ...typography.caption,
  },
  badgeNeutral: {
    backgroundColor: colors.infoSoft,
  },
  badgeTextNeutral: {
    color: colors.info,
  },
  badgeSuccess: {
    backgroundColor: colors.successSoft,
  },
  badgeTextSuccess: {
    color: colors.success,
  },
  badgeWarning: {
    backgroundColor: colors.warningSoft,
  },
  badgeTextWarning: {
    color: colors.warning,
  },
  badgeDanger: {
    backgroundColor: colors.dangerSoft,
  },
  badgeTextDanger: {
    color: colors.danger,
  },
  badgeInfo: {
    backgroundColor: colors.infoSoft,
  },
  badgeTextInfo: {
    color: colors.info,
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  appHeaderTextWrap: {
    flex: 1,
    paddingRight: spacing.md,
  },
  appHeaderTitle: {
    ...typography.title,
    color: colors.text,
  },
  appHeaderSubtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadow.card,
  },
  bellIcon: {
    fontSize: 18,
  },
  bellBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  bellBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(11,18,32,0.25)',
  },
  overlayDismiss: {
    flex: 1,
  },
  sheet: {
    maxHeight: '75%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sheetHeader: {
    marginBottom: spacing.sm,
  },
  sheetTitle: {
    ...typography.heading,
    color: colors.text,
  },
  sheetHeaderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyNotifications: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  emptyTitle: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  notificationIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  notificationIconInfo: {
    backgroundColor: colors.infoSoft,
  },
  notificationIconSuccess: {
    backgroundColor: colors.successSoft,
  },
  notificationIconWarning: {
    backgroundColor: colors.warningSoft,
  },
  notificationIconText: {
    ...typography.caption,
    color: colors.text,
  },
  notificationTextWrap: {
    flex: 1,
  },
  notificationTitle: {
    ...typography.bodyStrong,
    color: colors.text,
    marginBottom: 2,
  },
  notificationMessage: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 20,
  },
  notificationTime: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginLeft: spacing.sm,
  },
});

const badgeVariants = {
  neutral: { container: styles.badgeNeutral, text: styles.badgeTextNeutral },
  success: { container: styles.badgeSuccess, text: styles.badgeTextSuccess },
  warning: { container: styles.badgeWarning, text: styles.badgeTextWarning },
  danger: { container: styles.badgeDanger, text: styles.badgeTextDanger },
  info: { container: styles.badgeInfo, text: styles.badgeTextInfo },
};

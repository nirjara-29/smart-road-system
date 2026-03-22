import React from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LinkButton, PrimaryButton, Screen, SectionHeader } from '../ui/components';
import { colors, radius, shadow, spacing, typography } from '../ui/theme';

type ContactRowProps = {
  label: string;
  value: string;
  onPress: () => void;
  accessibilityLabel: string;
};

function ContactRow({ label, value, onPress, accessibilityLabel }: ContactRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      <Text style={styles.rowAction}>{'>'}</Text>
    </Pressable>
  );
}

export default function ContactUs({ navigation }: any) {
  const { t } = useTranslation();
  const mainSupportNumber = t('contactUs.mainSupportNumber');
  const emergencyNumber = t('contactUs.emergencyNumber');
  const supportEmail = t('contactUs.supportEmail');
  const officeAddress = t('contactUs.officeAddress');
  const workingHours = t('contactUs.workingHours');

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    officeAddress,
  )}`;

  const openLink = async (url: string, fallbackMessage: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        Alert.alert(t('contactUs.unavailableTitle'), fallbackMessage);
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert(t('contactUs.unavailableTitle'), fallbackMessage);
    }
  };

  const dialNumber = (number: string) => {
    const clean = number.replace(/[^\d+]/g, '');
    openLink(`tel:${clean}`, t('contactUs.phoneUnavailable'));
  };

  const emailSupport = () => {
    openLink(`mailto:${supportEmail}`, t('contactUs.emailUnavailable'));
  };

  const openMap = () => {
    openLink(mapUrl, t('contactUs.mapUnavailable'));
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinkButton label={t('common.backToHome')} onPress={() => navigation.goBack()} />

        <SectionHeader title={t('contactUs.title')} subtitle={t('contactUs.subtitle')} />

        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.iconBadge}>
              <Text style={styles.iconText}>PH</Text>
            </View>
            <Text style={styles.sectionTitle}>{t('contactUs.helplineTitle')}</Text>
          </View>

          <ContactRow
            label={t('contactUs.mainSupportLabel')}
            value={mainSupportNumber}
            onPress={() => dialNumber(mainSupportNumber)}
            accessibilityLabel={t('contactUs.mainSupportLabel')}
          />
          <ContactRow
            label={t('contactUs.emergencyLabel')}
            value={emergencyNumber}
            onPress={() => dialNumber(emergencyNumber)}
            accessibilityLabel={t('contactUs.emergencyLabel')}
          />

          <PrimaryButton label={t('contactUs.callNow')} onPress={() => dialNumber(mainSupportNumber)} />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.iconBadge}>
              <Text style={styles.iconText}>EM</Text>
            </View>
            <Text style={styles.sectionTitle}>{t('contactUs.emailTitle')}</Text>
          </View>
          <ContactRow
            label={t('contactUs.supportEmailLabel')}
            value={supportEmail}
            onPress={emailSupport}
            accessibilityLabel={t('contactUs.supportEmailLabel')}
          />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.iconBadge}>
              <Text style={styles.iconText}>LOC</Text>
            </View>
            <Text style={styles.sectionTitle}>{t('contactUs.addressTitle')}</Text>
          </View>
          <ContactRow
            label={t('contactUs.officeAddressLabel')}
            value={officeAddress}
            onPress={openMap}
            accessibilityLabel={t('contactUs.officeAddressLabel')}
          />

          <Pressable onPress={openMap} accessibilityRole="button" style={styles.mapPreview}>
            <Text style={styles.mapLabel}>{t('contactUs.mapPreviewTitle')}</Text>
            <Text style={styles.mapAddress}>{officeAddress}</Text>
          </Pressable>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.iconBadge}>
              <Text style={styles.iconText}>HR</Text>
            </View>
            <Text style={styles.sectionTitle}>{t('contactUs.hoursTitle')}</Text>
          </View>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursLabel}>{t('contactUs.workingHoursLabel')}</Text>
            <Text style={styles.hoursValue}>{workingHours}</Text>
          </View>
        </View>

        <LinkButton label={t('common.backToHome')} onPress={() => navigation.goBack()} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  iconText: {
    ...typography.caption,
    color: colors.info,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowPressed: {
    opacity: 0.85,
  },
  rowText: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  rowLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 4,
  },
  rowValue: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  rowAction: {
    ...typography.bodyStrong,
    color: colors.textMuted,
  },
  mapPreview: {
    marginTop: spacing.md,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  mapAddress: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  hoursRow: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hoursLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  hoursValue: {
    ...typography.bodyStrong,
    color: colors.text,
  },
});

import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useWorkflow } from '../context/WorkflowContext';
import {
  ActionCard,
  AppHeader,
  Badge,
  LinkButton,
  NotificationPanel,
  PrimaryButton,
  Screen,
  SecondaryButton,
  SectionHeader,
} from '../ui/components';
import { colors, radius, shadow, spacing, typography } from '../ui/theme';

type ReportItem = {
  id: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  severity: 'Low' | 'Medium' | 'High';
};

const reportSamples: ReportItem[] = [
  { id: 'SMC-RD-4927', status: 'Pending', severity: 'High' },
  { id: 'RD-1024', status: 'Pending', severity: 'High' },
  { id: 'RD-1007', status: 'In Progress', severity: 'Medium' },
  { id: 'RD-0988', status: 'Resolved', severity: 'Low' },
];

const sampleImage = require('../assets/before picture.jpeg');
const afterSampleImage = require('../assets/After picture.jpeg');
const sampleFallbackLocation = { lat: 17.656735, lng: 75.90185 };

export default function CitizenHome({ navigation }: any) {
  const { t } = useTranslation();
  const {
    assignments,
    getNotificationsForRole,
    getUnreadCount,
    markRoleNotificationsRead,
  } = useWorkflow();
  const [showNotifications, setShowNotifications] = useState(false);
  const [view, setView] = useState<'home' | 'report' | 'reports'>('home');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'pending' | 'denied' | 'ready'>(
    'pending',
  );
  const [timestamp, setTimestamp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  useEffect(() => {
    if (view !== 'report') {
      return;
    }
    setTimestamp(new Date().toLocaleString());
    requestLocation();
  }, [view]);

  const requestLocation = async () => {
    setLocationStatus('pending');
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setLocation(null);
        setLocationStatus('denied');
        return;
      }
    }

    (globalThis as any).navigator?.geolocation?.getCurrentPosition(
      (position: any) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationStatus('ready');
      },
      () => {
        setLocation(null);
        setLocationStatus('denied');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const handleCameraCapture = async () => {
    const allowed = await requestCameraPermission();
    if (!allowed) {
      return;
    }
    const result =
      Platform.OS === 'web'
        ? await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 })
        : await launchCamera({
            mediaType: 'photo',
            cameraType: 'back',
            quality: 0.8,
            saveToPhotos: false,
          });

    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri ?? null);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: t('permissions.cameraTitle'),
        message: t('permissions.cameraMessage'),
        buttonPositive: t('permissions.cameraAllow'),
        buttonNegative: t('permissions.cameraDeny'),
      },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(t('permissions.cameraDeniedTitle'), t('permissions.cameraDeniedMessage'));
      return false;
    }
    return true;
  };

  const handleUseSample = () => {
    const resolved = Image.resolveAssetSource(sampleImage);
    if (resolved?.uri) {
      setImageUri(resolved.uri);
    }
    if (!location) {
      setLocation(sampleFallbackLocation);
      setLocationStatus('ready');
    }
  };

  const isReportValid = useMemo(() => {
    return Boolean(imageUri && description.trim() && location);
  }, [description, imageUri, location]);

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

  const translateSeverity = (severity: ReportItem['severity']) => {
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

  const handleSubmit = async () => {
    if (!isReportValid) {
      Alert.alert(t('citizenHome.missingTitle'), t('citizenHome.missingMessage'));
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert(t('citizenHome.submittedTitle'), t('citizenHome.submittedMessage'));
      setView('home');
      setImageUri(null);
      setDescription('');
    }, 1200);
  };

  const severityVariant = (severity: ReportItem['severity']) => {
    if (severity === 'High') {
      return 'danger';
    }
    if (severity === 'Medium') {
      return 'warning';
    }
    return 'success';
  };

  const getLiveStatus = (reportId: string, fallback: string) => {
    const linked = assignments.find((assignment) => assignment.id === reportId);
    return linked ? linked.status : fallback;
  };

  const sampleDamageType = t('citizenHome.damageTypeValues.crack');

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader
          title={t('citizenHome.headerTitle')}
          subtitle={t('citizenHome.headerSubtitle')}
          unreadCount={getUnreadCount('citizen')}
          onPressNotifications={() => setShowNotifications(true)}
        />

        {view === 'home' ? (
          <>
            <PrimaryButton
              label={t('citizenHome.reportRoadDamageCaps')}
              size="large"
              onPress={() => setView('report')}
            />

            <View style={styles.cardStack}>
              <ActionCard
                title={t('citizenHome.myReports')}
                subtitle={t('citizenHome.myReportsSubtitle')}
                onPress={() => setView('reports')}
              />
              <ActionCard
                title={t('citizenHome.feedback')}
                subtitle={t('citizenHome.feedbackSubtitle')}
                onPress={() => navigation.navigate('Feedback')}
              />
              <ActionCard
                title={t('citizenHome.contactUs')}
                subtitle={t('citizenHome.contactUsSubtitle')}
                onPress={() => navigation.navigate('ContactUs')}
              />
              <ActionCard
                title={t('citizenHome.changeLanguage')}
                subtitle={t('citizenHome.changeLanguageSubtitle')}
                onPress={() => navigation.navigate('LanguageSettings')}
              />
              <ActionCard
                title={t('citizenHome.logout')}
                subtitle={t('citizenHome.logoutSubtitle')}
                onPress={() => navigation.replace('Login')}
              />
            </View>

            <Text style={styles.tipText}>{t('citizenHome.tip')}</Text>
          </>
        ) : null}

        {view === 'report' ? (
          <>
            <SectionHeader
              title={t('citizenHome.reportTitle')}
              subtitle={t('citizenHome.reportSubtitle')}
            />

            <View style={styles.reportCard}>
              <View style={styles.cameraBlock}>
                <Pressable onPress={handleCameraCapture} style={styles.cameraPreview}>
                  {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.cameraImage} />
                  ) : (
                    <View style={styles.cameraPlaceholder}>
                      <Text style={styles.cameraText}>
                        {Platform.OS === 'web'
                          ? t('citizenHome.tapToUpload')
                          : t('citizenHome.tapToCapture')}
                      </Text>
                    </View>
                  )}
                </Pressable>
                <SecondaryButton label={t('common.openCamera')} onPress={handleCameraCapture} />
                <SecondaryButton label={t('common.useSamplePhoto')} onPress={handleUseSample} />
              </View>

              <View style={styles.infoGroup}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{t('citizenHome.gpsLocationLabel')}</Text>
                  <Text style={styles.infoValue}>
                    {location
                      ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
                      : locationStatus === 'denied'
                        ? t('citizenHome.locationUnavailable')
                        : t('citizenHome.locating')}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{t('citizenHome.dateTimeLabel')}</Text>
                  <Text style={styles.infoValue}>{timestamp || t('citizenHome.generating')}</Text>
                </View>
              </View>

              <View style={styles.descriptionBlock}>
                <Text style={styles.label}>{t('citizenHome.descriptionLabel')}</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder={t('citizenHome.descriptionPlaceholder')}
                  placeholderTextColor={colors.textMuted}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>

              <PrimaryButton
                label={t('citizenHome.submitReport')}
                onPress={handleSubmit}
                loading={submitting}
              />
            </View>

            <LinkButton label={t('citizenHome.backToHome')} onPress={() => setView('home')} />
          </>
        ) : null}

        {view === 'reports' ? (
          <>
            <SectionHeader
              title={t('citizenHome.reportsTitle')}
              subtitle={t('citizenHome.reportsSubtitle')}
            />

            {reportSamples.map((report) => (
              <Pressable
                key={report.id}
                style={styles.reportItem}
                onPress={() =>
                  setSelectedReportId((prev) => (prev === report.id ? null : report.id))
                }
              >
                <View style={styles.reportHeader}>
                  <Text style={styles.reportId}>{report.id}</Text>
                  <Badge
                    label={translateSeverity(report.severity)}
                    variant={severityVariant(report.severity)}
                  />
                </View>
                <Text style={styles.reportStatus}>
                  {t('citizenHome.statusLabel', {
                    status: translateStatus(getLiveStatus(report.id, report.status)),
                  })}
                </Text>
                {report.id === 'SMC-RD-4927' && selectedReportId === report.id ? (
                  <View style={styles.reportMeta}>
                    <View style={styles.imageRow}>
                      <View style={styles.imageCard}>
                        <Image source={sampleImage} style={styles.reportImage} />
                        <Text style={styles.imageLabel}>{t('citizenHome.beforeResolution')}</Text>
                      </View>
                      <View style={styles.imageCard}>
                        <Image source={afterSampleImage} style={styles.reportImage} />
                        <Text style={styles.imageLabel}>{t('citizenHome.afterResolution')}</Text>
                      </View>
                    </View>
                    <Text style={styles.reportMetaText}>
                      {t('citizenHome.damageTypeLabel', { type: sampleDamageType })}
                    </Text>
                    <Text style={styles.reportMetaText}>
                      {t('citizenHome.confidenceLabel', { value: '62.04%' })}
                    </Text>
                    <Text style={styles.reportMetaText}>
                      {t('citizenHome.gpsValueLabel', { gps: '17.656735, 75.90185' })}
                    </Text>
                    <Text style={styles.reportMetaText}>
                      {t('citizenHome.timestampLabel', { timestamp: '2026-02-05 12:18:14' })}
                    </Text>
                    <Text style={styles.reportMetaText}>
                      {t('citizenHome.imageLabel', { name: 'test.png' })}
                    </Text>
                  </View>
                ) : null}
              </Pressable>
            ))}

            <LinkButton label={t('citizenHome.backToHome')} onPress={() => setView('home')} />
          </>
        ) : null}
      </ScrollView>

      <NotificationPanel
        visible={showNotifications}
        notifications={getNotificationsForRole('citizen')}
        onClose={() => setShowNotifications(false)}
        onMarkAllRead={() => markRoleNotificationsRead('citizen')}
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
    marginTop: spacing.md,
  },
  tipText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  reportCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cameraBlock: {
    marginBottom: spacing.lg,
  },
  cameraPreview: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  cameraImage: {
    width: '100%',
    height: 200,
  },
  cameraPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  cameraText: {
    ...typography.bodyStrong,
    color: colors.textMuted,
  },
  infoGroup: {
    marginBottom: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  infoValue: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  descriptionBlock: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 120,
    backgroundColor: colors.background,
    color: colors.text,
  },
  reportItem: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  reportId: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  reportStatus: {
    ...typography.body,
    color: colors.textMuted,
  },
  imageRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  imageCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reportImage: {
    width: '100%',
    height: 120,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
  },
  imageLabel: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
  reportMeta: {
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  reportMetaText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});

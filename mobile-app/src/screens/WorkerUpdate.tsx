import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { launchCamera } from 'react-native-image-picker';
import {
  Badge,
  LinkButton,
  PrimaryButton,
  Screen,
  SecondaryButton,
  SectionHeader,
} from '../ui/components';
import { useWorkflow } from '../context/WorkflowContext';
import { colors, radius, shadow, spacing, typography } from '../ui/theme';

const sampleImage = require('../assets/After picture.jpeg');

export default function WorkerUpdate({ route, navigation }: any) {
  const { t } = useTranslation();
  const { assignmentId } = route.params;
  const { assignments, uploadProgress } = useWorkflow();

  const [notes, setNotes] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const assignment = useMemo(
    () => assignments.find((item) => item.id === assignmentId),
    [assignmentId, assignments],
  );

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

  const handleCamera = async () => {
    const allowed = await requestCameraPermission();
    if (!allowed) {
      return;
    }
    const result = await launchCamera({
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
  };

  const handleSubmit = () => {
    if (!assignment || submitting) {
      return;
    }
    if (!imageUri) {
      Alert.alert(t('workerUpdate.photoRequiredTitle'), t('workerUpdate.photoRequiredMessage'));
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      uploadProgress(assignment.id, imageUri, notes);
      setSubmitting(false);
      Alert.alert(t('workerUpdate.progressUploadedTitle'), t('workerUpdate.progressUploadedMessage'));
      navigation.goBack();
    }, 600);
  };

  if (!assignment) {
    return (
      <Screen>
        <View style={styles.missingState}>
          <Text style={styles.missingTitle}>{t('workerUpdate.missingTitle')}</Text>
          <LinkButton label={t('workerUpdate.backToAssignments')} onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  const bannerVariant =
    assignment.approvalStatus === 'Approved'
      ? 'success'
      : assignment.approvalStatus === 'Rejected'
        ? 'danger'
        : 'warning';
  const bannerText =
    assignment.approvalStatus === 'Approved'
      ? t('workerUpdate.approvedBanner')
      : assignment.approvalStatus === 'Rejected'
        ? t('workerUpdate.rejectedBanner')
        : t('workerUpdate.awaitingBanner');

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title={t('workerUpdate.title')} subtitle={t('workerUpdate.subtitle')} />

        <View style={styles.card}>
          <Text style={styles.assignmentId}>{assignment.id}</Text>
          <Text style={styles.assignmentDesc}>{assignment.description}</Text>
          <Text style={styles.assignmentMeta}>
            {t('workerUpdate.locationLabel', { location: assignment.location })}
          </Text>
          <Text style={styles.assignmentMeta}>
            {t('workerUpdate.issueStatusLabel', { status: translateStatus(assignment.status) })}
          </Text>

          <View style={styles.banner}>
            <Badge label={bannerText} variant={bannerVariant} />
          </View>

          <View style={styles.cameraBlock}>
            <Pressable onPress={handleCamera} style={styles.cameraPreview}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.cameraImage} />
              ) : assignment.progressPhotos[0]?.uri ? (
                <Image source={{ uri: assignment.progressPhotos[0].uri }} style={styles.cameraImage} />
              ) : (
                <View style={styles.cameraPlaceholder}>
                  <Text style={styles.cameraText}>
                    {Platform.OS === 'web'
                      ? t('workerUpdate.tapToUpload')
                      : t('workerUpdate.tapToCapture')}
                  </Text>
                </View>
              )}
            </Pressable>
            <SecondaryButton label={t('common.openCamera')} onPress={handleCamera} />
            <SecondaryButton label={t('common.useSamplePhoto')} onPress={handleUseSample} />
          </View>

          <View style={styles.notesBlock}>
            <Text style={styles.label}>{t('workerUpdate.remarksLabel')}</Text>
            <TextInput
              style={styles.textArea}
              placeholder={t('workerUpdate.remarksPlaceholder')}
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          <PrimaryButton
            label={t('workerUpdate.submitForReview')}
            onPress={handleSubmit}
            loading={submitting}
          />
          <LinkButton label={t('workerUpdate.backToAssignments')} onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
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
    ...shadow.card,
  },
  assignmentId: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  assignmentDesc: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.xs,
  },
  assignmentMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  banner: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  cameraBlock: {
    marginBottom: spacing.lg,
  },
  cameraPreview: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  cameraImage: {
    width: '100%',
    height: 240,
  },
  cameraPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
  },
  cameraText: {
    ...typography.bodyStrong,
    color: colors.textMuted,
  },
  notesBlock: {
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
  missingState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  missingTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
});

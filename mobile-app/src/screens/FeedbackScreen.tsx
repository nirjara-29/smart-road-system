import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LinkButton, PrimaryButton, Screen, SectionHeader } from '../ui/components';
import { colors, radius, shadow, spacing, typography } from '../ui/theme';

export default function FeedbackScreen({ navigation }: any) {
  const { t } = useTranslation();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title={t('feedback.title')} subtitle={t('feedback.subtitle')} />

        <View style={styles.card}>
          <Text style={styles.bodyText}>{t('feedback.body')}</Text>
          <PrimaryButton label={t('feedback.startButton')} onPress={() => {}} />
          <LinkButton label={t('feedback.backToHome')} onPress={() => navigation.goBack()} />
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
  bodyText: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.lg,
  },
});

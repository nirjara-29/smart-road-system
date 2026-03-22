import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '../localization/i18n';
import { LinkButton, PrimaryButton, Screen } from '../ui/components';
import { colors, radius, shadow, spacing, typography } from '../ui/theme';

export default function LanguageSelectionScreen({ navigation, route }: any) {
  const { t } = useTranslation();
  const isSettings = route?.name === 'LanguageSettings' || route?.params?.fromSettings;
  const title = isSettings ? t('language.changeTitle') : t('language.selectTitle');
  const subtitle = isSettings ? t('language.changeSubtitle') : t('language.selectSubtitle');

  const handleSelect = async (language: 'en' | 'mr') => {
    await setAppLanguage(language);
    if (isSettings) {
      navigation.goBack();
      return;
    }
    navigation.replace('Login');
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <PrimaryButton label={t('language.english')} onPress={() => handleSelect('en')} />
          <PrimaryButton label={t('language.marathi')} onPress={() => handleSelect('mr')} />
          {isSettings ? (
            <LinkButton label={t('common.back')} onPress={() => navigation.goBack()} />
          ) : null}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
});

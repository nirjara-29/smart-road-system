import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Screen, TextField, PrimaryButton, LinkButton } from '../ui/components';
import { colors, radius, shadow, spacing, typography } from '../ui/theme';

export default function WorkerLoginScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [workerId, setWorkerId] = useState('');
  const [password, setPassword] = useState('');
  const dummyWorkerId = 'worker@smc.local';
  const dummyPassword = 'worker1234';

  const handleLogin = () => {
    if (!workerId.trim() || !password) {
      Alert.alert(t('workerLogin.missingTitle'), t('workerLogin.missingMessage'));
      return;
    }

    if (workerId.trim().toLowerCase() === dummyWorkerId && password === dummyPassword) {
      navigation.replace('WorkerHome');
      return;
    }

    Alert.alert(t('workerLogin.invalidTitle'), t('workerLogin.invalidMessage'));
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.brand}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{t('workerLogin.badge')}</Text>
            </View>
            <Text style={styles.title}>{t('workerLogin.title')}</Text>
            <Text style={styles.subtitle}>{t('workerLogin.subtitle')}</Text>
          </View>

          <View style={styles.formCard}>
            <TextField
              label={t('workerLogin.workerIdLabel')}
              placeholder={t('workerLogin.workerIdPlaceholder')}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setWorkerId}
              value={workerId}
            />
            <TextField
              label={t('workerLogin.passwordLabel')}
              placeholder={t('workerLogin.passwordPlaceholder')}
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
            <PrimaryButton label={t('workerLogin.loginButton')} onPress={handleLogin} />
            <LinkButton
              label={t('workerLogin.backToCustomer')}
              onPress={() => navigation.goBack()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  brand: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  badgeText: {
    ...typography.caption,
    color: colors.primary,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
});

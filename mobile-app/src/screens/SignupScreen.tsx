import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { Screen, TextField, PrimaryButton, LinkButton } from '../ui/components';
import { colors, spacing, radius, typography, shadow } from '../ui/theme';

export default function SignupScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(res.user);

      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        email,
        role: 'citizen',
        createdAt: new Date(),
      });

      Alert.alert(t('signup.verifyEmailTitle'), t('signup.verifyEmailMessage'));
      navigation.navigate('Login');
    } catch (e: any) {
      Alert.alert(t('signup.errorTitle'), e.message);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brand}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{t('signup.badge')}</Text>
            </View>
            <Text style={styles.title}>{t('signup.title')}</Text>
            <Text style={styles.subtitle}>{t('signup.subtitle')}</Text>
          </View>

          <View style={styles.formCard}>
            <TextField
              label={t('signup.emailLabel')}
              placeholder={t('signup.emailPlaceholder')}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              onChangeText={setEmail}
              value={email}
            />
            <TextField
              label={t('signup.passwordLabel')}
              placeholder={t('signup.passwordPlaceholder')}
              secureTextEntry
              textContentType="newPassword"
              autoComplete="password"
              onChangeText={setPassword}
              value={password}
            />
            <PrimaryButton label={t('signup.signupButton')} onPress={signup} />
            <LinkButton
              label={t('signup.alreadyAccount')}
              onPress={() => navigation.navigate('Login')}
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

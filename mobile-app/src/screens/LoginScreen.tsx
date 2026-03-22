import React, { useContext, useState } from 'react';
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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { AuthContext } from '../context/AuthContext';
import {
  Screen,
  TextField,
  PrimaryButton,
  SecondaryButton,
  LinkButton,
} from '../ui/components';
import { colors, spacing, radius, typography, shadow } from '../ui/theme';

export default function LoginScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dummyEmail = 'demo@smc.local';
  const dummyPassword = 'demo1234';

  const login = async () => {
    try {
      if (email.trim().toLowerCase() === dummyEmail && password === dummyPassword) {
        const dummyUser = {
          uid: 'demo-user',
          email: dummyEmail,
          role: 'citizen',
        };
        setUser(dummyUser);
        navigation.replace('CitizenHome');
        return;
      }

      const res = await signInWithEmailAndPassword(auth, email, password);

      if (!res.user.emailVerified) {
        Alert.alert(t('login.verifyEmailTitle'));
        return;
      }

      const snap = await getDoc(doc(db, 'users', res.user.uid));
      const userData = snap.data();

      setUser(userData);

      if (userData?.role === 'worker') {
        navigation.replace('WorkerHome');
        return;
      }
      navigation.replace('CitizenHome');
    } catch (e: any) {
      Alert.alert(t('login.loginFailedTitle'), e.message);
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
              <Text style={styles.badgeText}>{t('login.badge')}</Text>
            </View>
            <Text style={styles.title}>{t('login.title')}</Text>
            <Text style={styles.subtitle}>{t('login.subtitle')}</Text>
          </View>

          <View style={styles.formCard}>
            <TextField
              label={t('login.emailLabel')}
              placeholder={t('login.emailPlaceholder')}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              onChangeText={setEmail}
              value={email}
            />
            <TextField
              label={t('login.passwordLabel')}
              placeholder={t('login.passwordPlaceholder')}
              secureTextEntry
              textContentType="password"
              autoComplete="password"
              onChangeText={setPassword}
              value={password}
            />
            <PrimaryButton label={t('login.loginButton')} onPress={login} />
            <SecondaryButton
              label={t('login.createAccount')}
              onPress={() => navigation.navigate('Signup')}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('login.terms')}</Text>
            <LinkButton
              label={t('login.workerLogin')}
              onPress={() => navigation.navigate('WorkerLogin')}
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
  footer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en';
import mr from './translations/mr';

export const LANGUAGE_STORAGE_KEY = 'app_language';
export const supportedLanguages = ['en', 'mr'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const resources = {
  en: { translation: en },
  mr: { translation: mr },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

export const isSupportedLanguage = (value: string | null): value is SupportedLanguage =>
  value === 'en' || value === 'mr';

export const getSavedLanguage = async () => {
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
};

export const setAppLanguage = async (language: SupportedLanguage) => {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  await i18n.changeLanguage(language);
};

export default i18n;

import { Platform } from 'react-native';

export const colors = {
  background: '#F3F5F8',
  surface: '#FFFFFF',
  primary: '#0A5BD7',
  primaryDark: '#083E98',
  accent: '#0E7490',
  text: '#0B1220',
  textMuted: '#5F6B7A',
  border: '#DDE3EA',
  danger: '#D92D20',
  success: '#16A34A',
  warning: '#F59E0B',
  info: '#1D4ED8',
  neutral: '#64748B',
  dangerSoft: '#FEE2E2',
  warningSoft: '#FEF3C7',
  successSoft: '#DCFCE7',
  infoSoft: '#E0EBFF',
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

const baseFont = {
  fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
};

export const typography = {
  title: { ...baseFont, fontSize: 30, fontWeight: '700', letterSpacing: -0.4 },
  heading: { ...baseFont, fontSize: 22, fontWeight: '700', letterSpacing: -0.2 },
  body: { ...baseFont, fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodyStrong: { ...baseFont, fontSize: 16, fontWeight: '600', lineHeight: 24 },
  caption: { ...baseFont, fontSize: 12, fontWeight: '600', letterSpacing: 0.3 },
} as const;

export const shadow = {
  card: {
    shadowColor: '#0B1220',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
};

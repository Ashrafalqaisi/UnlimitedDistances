import { Platform, type TextStyle, type ViewStyle } from 'react-native';

// Brand palette from the Unlimited Distances logo (copper #bd6e29 on black and white)
export const colors = {
  brand: '#bd6e29',
  brandDark: '#8a4e1b',
  brandSoft: '#f6e9dc',
  ink: '#141414',
  inkSoft: '#3a342f',
  muted: '#6b625a',
  subtle: '#9a9088',
  surface: '#faf6f1',
  background: '#f7f3ee',
  white: '#ffffff',
  line: '#ebe1d6',
  success: '#2f7d4f',
  successSoft: '#e3f1e8',
  danger: '#b42318',
  overlay: 'rgba(20, 20, 20, 0.45)',
};

/** 4-point spacing scale. Use these instead of raw numbers. */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/** Horizontal padding of every screen. */
export const gutter = space.xl;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

/** Type scale: one place to tune the hierarchy. */
export const type = {
  display: { fontSize: 32, lineHeight: 38, fontWeight: '900' },
  title: { fontSize: 24, lineHeight: 30, fontWeight: '900' },
  heading: { fontSize: 19, lineHeight: 25, fontWeight: '800' },
  subheading: { fontSize: 16, lineHeight: 22, fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  label: { fontSize: 14, lineHeight: 19, fontWeight: '600' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
  eyebrow: { fontSize: 12, lineHeight: 16, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
} satisfies Record<string, TextStyle>;

/** Soft elevation for cards that sit on the warm background. */
export const shadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#3a2a1a',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  default: { elevation: 2 },
});

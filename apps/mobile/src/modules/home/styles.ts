import { StyleSheet } from 'react-native';
import { colors } from '@/modules/common';

// Section headings shared by the home page sections
export const sectionStyles = StyleSheet.create({
  eyebrow: {
    color: colors.brand,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 32,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.ink,
    marginTop: 6,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
});

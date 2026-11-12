import { StyleSheet } from 'react-native';
import { colors, gutter, space, type } from '@/modules/common';

export const ERROR_COLOR = colors.danger;

/** Layout shared by the sign-in and create-account screens. */
export const authStyles = StyleSheet.create({
  container: {
    paddingHorizontal: gutter,
    paddingTop: space.xxl,
  },
  title: {
    ...type.display,
    color: colors.ink,
  },
  subtitle: {
    ...type.body,
    color: colors.muted,
    marginTop: space.sm,
    marginBottom: space.md,
  },
  form: {
    gap: space.lg,
    marginTop: space.lg,
  },
  result: {
    ...type.label,
    marginTop: space.lg,
  },
  error: {
    color: ERROR_COLOR,
  },
  success: {
    color: colors.success,
  },
  submit: {
    marginTop: space.xxl,
  },
  switchRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: space.xs,
    marginTop: space.xl,
  },
  switchText: {
    ...type.body,
    color: colors.muted,
  },
  switchLink: {
    ...type.body,
    fontWeight: '700',
    color: colors.brand,
  },
});

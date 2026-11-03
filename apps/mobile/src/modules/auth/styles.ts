import { StyleSheet } from 'react-native';
import { colors } from '@/modules/common';

export const ERROR_COLOR = '#b42318';

/** Layout and form styles shared by the sign-in and create-account screens. */
export const authStyles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 36,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.ink,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
    marginTop: 8,
    marginBottom: 10,
  },
  result: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '600',
  },
  error: {
    color: ERROR_COLOR,
  },
  success: {
    color: colors.success,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingVertical: 15,
  },
  buttonBusy: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  textButton: {
    marginTop: 10,
    paddingVertical: 6,
  },
  textButtonText: {
    color: colors.brand,
    fontSize: 15,
    fontWeight: '700',
  },
  switchRow: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 20,
  },
  switchText: {
    fontSize: 15,
    color: colors.muted,
  },
  switchLink: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.brand,
  },
});

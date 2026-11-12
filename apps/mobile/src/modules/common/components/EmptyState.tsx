import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, space, type } from '../theme';
import { Icon, type IconName } from './Icon';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  message: string;
  /** Buttons shown under the message. */
  children?: ReactNode;
}

/** Centred icon, title and message for screens with nothing to show yet. */
export function EmptyState({ icon, title, message, children }: EmptyStateProps) {
  return (
    <View style={styles.wrap} accessibilityRole="summary">
      <View style={styles.iconCircle}>
        <Icon name={icon} size={34} color={colors.brand} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {children && <View style={styles.actions}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingHorizontal: space.xxxl,
    paddingVertical: space.xxxl,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: radius.pill,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.xl,
  },
  title: {
    ...type.heading,
    color: colors.ink,
    textAlign: 'center',
  },
  message: {
    ...type.body,
    color: colors.muted,
    textAlign: 'center',
    marginTop: space.sm,
  },
  actions: {
    alignSelf: 'stretch',
    gap: space.md,
    marginTop: space.xxl,
  },
});

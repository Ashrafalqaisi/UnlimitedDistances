import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../language';
import { colors, radius, shadow, space, type } from '../theme';
import { Icon, type IconName } from './Icon';

interface ListRowProps {
  icon: IconName;
  label: string;
  /** Secondary text on the trailing side, e.g. the current language. */
  value?: string;
  onPress?: () => void;
  accessibilityRole?: 'button' | 'link';
  last?: boolean;
}

/** A settings-style row: icon, label, optional value and a chevron when it can be tapped. */
export function ListRow({ icon, label, value, onPress, accessibilityRole = 'button', last = false }: ListRowProps) {
  const { text, row } = useLanguage();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? accessibilityRole : undefined}
      style={({ pressed }) => [styles.row, row, !last && styles.divider, pressed && styles.pressed]}
    >
      <View style={styles.iconBox}>
        <Icon name={icon} size={18} color={colors.brand} />
      </View>
      <Text style={[styles.label, text]} numberOfLines={1}>
        {label}
      </Text>
      {value && <Text style={styles.value}>{value}</Text>}
      {onPress && <Icon name="chevron-forward" size={18} color={colors.subtle} />}
    </Pressable>
  );
}

/** White rounded group that holds ListRows. */
export function ListGroup({ children }: { children: ReactNode }) {
  return <View style={styles.group}>{children}</View>;
}

const styles = StyleSheet.create({
  group: {
    marginHorizontal: space.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    overflow: 'hidden',
    ...shadow,
  },
  row: {
    alignItems: 'center',
    gap: space.md,
    minHeight: 56,
    paddingHorizontal: space.lg,
    backgroundColor: colors.white,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...type.subheading,
    fontWeight: '600',
    flex: 1,
    color: colors.ink,
  },
  value: {
    ...type.label,
    color: colors.muted,
  },
});

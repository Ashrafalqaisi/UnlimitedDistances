import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Localized } from '@runner/shared';
import { colors, gutter, Icon, radius, shadow, space, type, useLanguage } from '@/modules/common';

/** A titled white card on the event page. */
export function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  const { text } = useLanguage();

  return (
    <View style={styles.section}>
      <Text style={[styles.title, text]} accessibilityRole="header">
        {title}
      </Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

/** Check-marked list; `optional` items get a plus sign and muted colour. */
export function CheckList({ items, optional = false }: { items: Localized[]; optional?: boolean }) {
  const { lang, text, row } = useLanguage();

  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item.en} style={[styles.listRow, row]}>
          <Icon
            name={optional ? 'add-circle-outline' : 'checkmark-circle'}
            size={18}
            color={optional ? colors.subtle : colors.success}
          />
          <Text style={[styles.listText, optional && styles.muted, text]}>{item[lang]}</Text>
        </View>
      ))}
    </View>
  );
}

export const detailStyles = StyleSheet.create({
  subheading: {
    ...type.label,
    fontWeight: '800',
    color: colors.brandDark,
    marginBottom: space.sm,
  },
  note: {
    ...type.label,
    fontWeight: '400',
    color: colors.muted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
    marginVertical: space.md,
  },
});

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: gutter,
    marginTop: space.xxl,
  },
  title: {
    ...type.heading,
    color: colors.ink,
    marginBottom: space.md,
  },
  card: {
    padding: space.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    ...shadow,
  },
  list: {
    gap: space.sm,
  },
  listRow: {
    alignItems: 'flex-start',
    gap: space.sm,
  },
  listText: {
    ...type.body,
    flex: 1,
    color: colors.inkSoft,
  },
  muted: {
    color: colors.muted,
  },
});

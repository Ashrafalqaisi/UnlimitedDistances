import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../language';
import { colors, gutter, space, type } from '../theme';
import { Icon } from './Icon';

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  action?: { label: string; onPress: () => void };
}

/** Section title with an optional eyebrow above it and a "See all" style action beside it. */
export function SectionHeader({ title, eyebrow, action }: SectionHeaderProps) {
  const { text, row } = useLanguage();

  return (
    <View style={[styles.header, row]}>
      <View style={styles.titles}>
        {eyebrow && <Text style={[styles.eyebrow, text]}>{eyebrow}</Text>}
        <Text style={[styles.title, text]} accessibilityRole="header">
          {title}
        </Text>
      </View>
      {action && (
        <Pressable onPress={action.onPress} hitSlop={8} style={[styles.action, row]} accessibilityRole="button">
          <Text style={styles.actionText}>{action.label}</Text>
          <Icon name="chevron-forward" size={16} color={colors.brand} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: space.md,
    paddingHorizontal: gutter,
    marginTop: space.xxxl,
    marginBottom: space.lg,
  },
  titles: {
    flex: 1,
  },
  eyebrow: {
    ...type.eyebrow,
    color: colors.brand,
    marginBottom: space.xs,
  },
  title: {
    ...type.title,
    color: colors.ink,
  },
  action: {
    alignItems: 'center',
    gap: 2,
    paddingBottom: 3,
  },
  actionText: {
    ...type.label,
    color: colors.brand,
  },
});

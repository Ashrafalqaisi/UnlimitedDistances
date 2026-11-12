import { StyleSheet, Text, View } from 'react-native';
import type { EventStatus } from '@runner/shared';
import { colors, Icon, radius, type, useLanguage, type IconName } from '@/modules/common';

const icons: Record<EventStatus, IconName> = {
  soon: 'time-outline',
  open: 'checkmark-circle',
  closed: 'lock-closed-outline',
  finished: 'flag-outline',
};

/** Registration status pill shown on event photos. Icon and text, never colour alone. */
export function StatusBadge({ status }: { status: EventStatus }) {
  const { common, row } = useLanguage();
  const open = status === 'open';

  return (
    <View style={[styles.badge, row, open ? styles.open : styles.neutral]}>
      <Icon name={icons[status]} size={13} color={colors.white} />
      <Text style={styles.text}>{common.status[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  open: {
    backgroundColor: colors.success,
  },
  neutral: {
    backgroundColor: 'rgba(20,20,20,0.6)',
  },
  text: {
    ...type.caption,
    color: colors.white,
  },
});

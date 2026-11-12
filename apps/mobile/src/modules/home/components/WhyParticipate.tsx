import { StyleSheet, Text, View } from 'react-native';
import { colors, gutter, Icon, radius, shadow, space, type, useLanguage, type IconName } from '@/modules/common';
import { homeMessages } from '../messages';

// One icon per reason, in the same order as the messages
const ICONS: IconName[] = ['heart', 'barbell', 'flash', 'people'];

/** 2×2 grid of reasons to take part. */
export function WhyParticipate() {
  const { t, text, row } = useLanguage(homeMessages);

  return (
    <View style={[styles.grid, row]}>
      {t.why.map((reason, index) => (
        <View key={reason} style={styles.cell}>
          <View style={styles.tile}>
            <View style={[styles.tileTop, row]}>
              <View style={styles.iconBox}>
                <Icon name={ICONS[index] ?? 'star'} size={20} color={colors.brand} />
              </View>
              <Text style={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
            </View>
            <Text style={[styles.reason, text]}>{reason}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexWrap: 'wrap',
    paddingHorizontal: gutter - space.sm / 2,
  },
  cell: {
    width: '50%',
    padding: space.sm / 2,
  },
  tile: {
    minHeight: 112,
    padding: space.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    ...shadow,
  },
  tileTop: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    ...type.caption,
    color: colors.subtle,
  },
  reason: {
    ...type.subheading,
    color: colors.ink,
    marginTop: space.md,
  },
});

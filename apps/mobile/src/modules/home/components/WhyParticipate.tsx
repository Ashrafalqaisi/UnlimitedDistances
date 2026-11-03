import { StyleSheet, Text, View } from 'react-native';
import { colors, useLanguage } from '@/modules/common';
import { homeMessages } from '../messages';
import { sectionStyles } from '../styles';

export function WhyParticipate() {
  const { t, text, row } = useLanguage(homeMessages);

  return (
    <View>
      <Text style={[sectionStyles.title, text]}>{t.whyTitle}</Text>
      <View style={[styles.grid, row]}>
        {t.why.map((reason, index) => (
          <View key={reason} style={styles.item}>
            <Text style={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
            <Text style={[styles.reason, text]}>{reason}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexWrap: 'wrap',
    paddingHorizontal: 14,
  },
  item: {
    width: '50%',
    padding: 6,
  },
  number: {
    color: colors.brand,
    fontSize: 28,
    fontWeight: '900',
    backgroundColor: colors.surface,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingTop: 14,
    paddingHorizontal: 14,
  },
  reason: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingBottom: 16,
    paddingHorizontal: 14,
    minHeight: 56,
  },
});

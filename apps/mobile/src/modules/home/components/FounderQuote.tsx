import { StyleSheet, Text, View } from 'react-native';
import { colors, gutter, Icon, radius, space, type, useLanguage } from '@/modules/common';
import { homeMessages } from '../messages';

export function FounderQuote() {
  const { t, text } = useLanguage(homeMessages);

  return (
    <View style={styles.card}>
      <Icon name="chatbubble-ellipses" size={26} color={colors.brand} />
      <Text style={[styles.quote, text]}>“{t.quote}”</Text>
      <Text style={[styles.author, text]}>{t.quoteAuthor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: gutter,
    marginTop: space.xxxl,
    padding: space.xxl,
    borderRadius: radius.xl,
    backgroundColor: colors.brandSoft,
    gap: space.sm,
  },
  quote: {
    ...type.title,
    fontSize: 22,
    lineHeight: 29,
    color: colors.ink,
  },
  author: {
    ...type.label,
    fontWeight: '500',
    color: colors.muted,
  },
});

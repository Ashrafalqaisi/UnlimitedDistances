import { StyleSheet, Text, View } from 'react-native';
import { colors, useLanguage } from '@/modules/common';
import { homeMessages } from '../messages';

export function FounderQuote() {
  const { t, text } = useLanguage(homeMessages);

  return (
    <View style={styles.quote}>
      <Text style={[styles.text, text]}>“{t.quote}”</Text>
      <Text style={[styles.author, text]}>{t.quoteAuthor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  quote: {
    margin: 20,
    marginTop: 32,
    marginBottom: 0,
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.brandSoft,
    borderLeftWidth: 4,
    borderLeftColor: colors.brand,
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.ink,
  },
  author: {
    marginTop: 8,
    color: colors.muted,
  },
});

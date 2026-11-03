import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, ImageBox, images, useLanguage } from '@/modules/common';
import { homeMessages } from '../messages';

export function Hero({ onJoin }: { onJoin: () => void }) {
  const { t, text, row } = useLanguage(homeMessages);

  return (
    <>
      <ImageBox source={images.hero} style={styles.hero}>
        <View style={styles.shade}>
          <Text style={[styles.eyebrow, text]}>{t.heroEyebrow}</Text>
          <Text style={[styles.title, text]}>{t.heroTitle}</Text>
          <Text style={[styles.subtitle, text]}>{t.heroSubtitle}</Text>
          <View style={row}>
            <Pressable onPress={onJoin} style={styles.button} accessibilityRole="button">
              <Text style={styles.buttonText}>{t.joinNow}</Text>
            </Pressable>
          </View>
        </View>
      </ImageBox>

      <View style={[styles.highlights, row]}>
        {t.highlights.map((item) => (
          <View key={item.label} style={styles.highlight}>
            <Text style={styles.highlightValue}>{item.value}</Text>
            <Text style={styles.highlightLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 420,
  },
  shade: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 32,
    backgroundColor: colors.overlay,
  },
  eyebrow: {
    color: colors.brandSoft,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.92)',
    marginBottom: 22,
  },
  button: {
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingVertical: 13,
    paddingHorizontal: 26,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
  highlights: {
    backgroundColor: colors.ink,
    paddingVertical: 18,
  },
  highlight: {
    flex: 1,
    alignItems: 'center',
  },
  highlightValue: {
    color: colors.brand,
    fontSize: 22,
    fontWeight: '900',
  },
  highlightLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
});

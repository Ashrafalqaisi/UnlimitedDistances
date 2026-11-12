import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  colors,
  gutter,
  ImageBox,
  images,
  LOGO_ASPECT,
  radius,
  space,
  type,
  useLanguage,
} from '@/modules/common';
import { homeMessages } from '../messages';

/** Top of Home: logo with language switch, then the photo card and the highlight numbers. */
export function Hero({ onExplore }: { onExplore: () => void }) {
  const { t, common, text, row, toggle } = useLanguage(homeMessages);

  return (
    <View>
      <View style={[styles.topBar, row]}>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" accessibilityLabel={common.brand} />
        <Pressable onPress={toggle} hitSlop={8} style={styles.lang} accessibilityRole="button">
          <Text style={styles.langText}>{common.languageToggle}</Text>
        </Pressable>
      </View>

      <ImageBox source={images.hero} style={styles.card} shade>
        <View style={styles.cardText}>
          <Text style={[styles.eyebrow, text]}>{t.heroEyebrow}</Text>
          <Text style={[styles.title, text]} accessibilityRole="header">
            {t.heroTitle}
          </Text>
          <Text style={[styles.subtitle, text]}>{t.heroSubtitle}</Text>
          <View style={row}>
            <Button label={t.exploreRaces} icon="arrow-forward" onPress={onExplore} />
          </View>
        </View>
      </ImageBox>

      <View style={[styles.stats, row]}>
        {t.highlights.map((item) => (
          <View key={item.label} style={styles.stat}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: gutter,
    paddingTop: space.sm,
    paddingBottom: space.lg,
  },
  logo: {
    height: 34,
    width: 34 * LOGO_ASPECT,
  },
  lang: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
  },
  langText: {
    ...type.label,
    color: colors.inkSoft,
  },
  card: {
    marginHorizontal: gutter,
    height: 440,
    borderRadius: radius.xl,
    justifyContent: 'flex-end',
  },
  cardText: {
    padding: space.xxl,
    gap: space.sm,
  },
  eyebrow: {
    ...type.eyebrow,
    color: colors.brandSoft,
  },
  title: {
    ...type.display,
    fontSize: 36,
    lineHeight: 42,
    color: colors.white,
  },
  subtitle: {
    ...type.body,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: space.md,
  },
  stats: {
    marginHorizontal: gutter,
    marginTop: space.lg,
    paddingVertical: space.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.ink,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...type.heading,
    fontSize: 22,
    color: colors.brand,
  },
  statLabel: {
    ...type.caption,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
});

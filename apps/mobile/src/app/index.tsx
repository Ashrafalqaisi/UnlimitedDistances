import { useRef } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ScrollViewInstance,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import {
  formatDay,
  formatPrice,
  getEvents,
  getEventStatus,
  localizeEvent,
  lowestFee,
  ORGANIZER,
  PAST_EDITIONS,
  type EventSummary,
} from '@runner/shared';
import { ImageBox } from '@/components/ImageBox';
import { eventImages, images, LOGO_ASPECT } from '@/images';
import { useLanguage } from '@/language';
import { colors } from '@/theme';

export default function HomeScreen() {
  const { lang, t, text, row, toggle } = useLanguage();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const racesY = useRef(0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="dark" />

      <View style={[styles.header, row]}>
        <Image
          source={images.logo}
          style={styles.headerLogo}
          resizeMode="contain"
          accessibilityLabel={t.brand}
        />
        <Pressable onPress={toggle} style={styles.langButton} accessibilityRole="button">
          <Text style={styles.langText}>{t.languageToggle}</Text>
        </Pressable>
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.content}>
        <ImageBox source={images.hero} style={styles.hero}>
          <View style={styles.heroShade}>
            <Text style={[styles.heroEyebrow, text]}>{t.heroEyebrow}</Text>
            <Text style={[styles.heroTitle, text]}>{t.heroTitle}</Text>
            <Text style={[styles.heroSubtitle, text]}>{t.heroSubtitle}</Text>
            <View style={row}>
              <Pressable
                onPress={() => scrollRef.current?.scrollTo({ y: racesY.current, animated: true })}
                style={styles.primaryButton}
                accessibilityRole="button"
              >
                <Text style={styles.primaryButtonText}>{t.joinNow}</Text>
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

        <View onLayout={(e) => (racesY.current = e.nativeEvent.layout.y)}>
          <Text style={[styles.sectionEyebrow, text]}>{t.racesSubtitle}</Text>
          <Text style={[styles.sectionTitle, text]}>{t.racesTitle}</Text>
          {getEvents().map((event) => (
            <RaceCard key={event.slug} event={event} />
          ))}
        </View>

        <Text style={[styles.sectionTitle, text]}>{t.whyTitle}</Text>
        <View style={[styles.whyGrid, row]}>
          {t.why.map((reason, index) => (
            <View key={reason} style={styles.whyItem}>
              <Text style={styles.whyNumber}>{String(index + 1).padStart(2, '0')}</Text>
              <Text style={[styles.whyText, text]}>{reason}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, text]}>{t.previousTitle}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.galleryRow, row]}
        >
          {PAST_EDITIONS.map((edition) => (
            <ImageBox
              key={edition.slug}
              source={eventImages[edition.slug]}
              style={styles.galleryItem}
              imageStyle={styles.galleryImage}
            >
              <View style={styles.galleryCaption}>
                <Text style={[styles.galleryText, text]}>{edition.title[lang]}</Text>
              </View>
            </ImageBox>
          ))}
        </ScrollView>

        <View style={styles.quote}>
          <Text style={[styles.quoteText, text]}>“{t.quote}”</Text>
          <Text style={[styles.quoteAuthor, text]}>{t.quoteAuthor}</Text>
        </View>

        <ContactFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

function RaceCard({ event }: { event: EventSummary }) {
  const { lang, t, text, row } = useLanguage();
  const { title, city } = localizeEvent(event, lang);
  const status = getEventStatus(event);

  return (
    <Link href={{ pathname: '/events/[slug]', params: { slug: event.slug } }} asChild>
      <Pressable style={styles.card} accessibilityRole="button">
        <ImageBox
          source={eventImages[event.slug]}
          style={styles.cardImage}
          imageStyle={styles.cardImageRadius}
        >
          <View style={[styles.badge, status === 'open' ? styles.badgeOpen : styles.badgeMuted]}>
            <Text style={styles.badgeText}>{t.status[status]}</Text>
          </View>
        </ImageBox>
        <View style={styles.cardBody}>
          <Text style={[styles.cardTitle, text]}>{title}</Text>
          <Text style={[styles.cardMeta, text]}>
            {city} · {formatDay(event.startsAt, lang)}
          </Text>
          <View style={[styles.chips, row]}>
            {event.distances.map((distance) => (
              <View key={distance.name.en} style={styles.chip}>
                <Text style={styles.chipText}>{distance.name[lang]}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.cardFooter, row]}>
            <Text style={styles.cardPrice}>
              {t.from} {formatPrice(lowestFee(event), event.currency, lang)}
            </Text>
            <Text style={styles.cardLink}>{t.details} ›</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

function ContactFooter() {
  const { t, text, row } = useLanguage();
  const links = [
    ...ORGANIZER.phones.map((phone) => ({ label: phone, url: `tel:${phone}` })),
    { label: ORGANIZER.email, url: `mailto:${ORGANIZER.email}` },
    { label: 'Facebook', url: ORGANIZER.social.facebook },
    { label: 'Instagram', url: ORGANIZER.social.instagram },
    { label: 'LinkedIn', url: ORGANIZER.social.linkedin },
    { label: 'maasafatmarathon.com', url: ORGANIZER.website },
  ];

  return (
    <View style={styles.footer}>
      <Image source={images.logoWhite} style={styles.footerLogo} resizeMode="contain" />
      <Text style={[styles.footerTitle, text]}>{t.contactTitle}</Text>
      <View style={[styles.footerLinks, row]}>
        {links.map((link) => (
          <Pressable key={link.url} onPress={() => Linking.openURL(link.url)} accessibilityRole="link">
            <Text style={styles.footerLink}>{link.label}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.footerCopy}>
        © {new Date().getFullYear()} {t.brand}. {t.footer}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  headerLogo: {
    height: 36,
    width: 36 * LOGO_ASPECT,
  },
  langButton: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  langText: {
    color: colors.muted,
    fontWeight: '600',
  },
  content: {
    backgroundColor: colors.white,
  },
  hero: {
    minHeight: 420,
  },
  heroShade: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 32,
    backgroundColor: colors.overlay,
  },
  heroEyebrow: {
    color: colors.brandSoft,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.92)',
    marginBottom: 22,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingVertical: 13,
    paddingHorizontal: 26,
  },
  primaryButtonText: {
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
  sectionEyebrow: {
    color: colors.brand,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.ink,
    marginTop: 6,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardImage: {
    height: 180,
    padding: 12,
    alignItems: 'flex-start',
  },
  cardImageRadius: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  badge: {
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeOpen: {
    backgroundColor: colors.success,
  },
  badgeMuted: {
    backgroundColor: colors.overlay,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 14,
    color: colors.muted,
  },
  chips: {
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  chip: {
    backgroundColor: colors.brandSoft,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  chipText: {
    color: colors.brandDark,
    fontSize: 12,
    fontWeight: '600',
  },
  cardFooter: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.brand,
  },
  cardLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
  },
  whyGrid: {
    flexWrap: 'wrap',
    paddingHorizontal: 14,
  },
  whyItem: {
    width: '50%',
    padding: 6,
  },
  whyNumber: {
    color: colors.brand,
    fontSize: 28,
    fontWeight: '900',
    backgroundColor: colors.surface,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingTop: 14,
    paddingHorizontal: 14,
  },
  whyText: {
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
  galleryRow: {
    gap: 12,
    paddingHorizontal: 20,
  },
  galleryItem: {
    width: 260,
    height: 170,
    justifyContent: 'flex-end',
  },
  galleryImage: {
    borderRadius: 14,
  },
  galleryCaption: {
    backgroundColor: colors.overlay,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    padding: 10,
  },
  galleryText: {
    color: colors.white,
    fontWeight: '700',
  },
  quote: {
    margin: 20,
    marginTop: 32,
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.brandSoft,
    borderLeftWidth: 4,
    borderLeftColor: colors.brand,
  },
  quoteText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.ink,
  },
  quoteAuthor: {
    marginTop: 8,
    color: colors.muted,
  },
  footer: {
    backgroundColor: colors.ink,
    padding: 24,
    paddingBottom: 40,
    marginTop: 12,
  },
  footerLogo: {
    height: 40,
    width: 40 * LOGO_ASPECT,
    alignSelf: 'center',
    marginBottom: 20,
  },
  footerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  footerLinks: {
    flexWrap: 'wrap',
    gap: 10,
  },
  footerLink: {
    color: colors.brandSoft,
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
  },
  footerCopy: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});

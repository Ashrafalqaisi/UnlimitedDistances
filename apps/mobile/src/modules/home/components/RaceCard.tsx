import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import {
  formatDay,
  formatPrice,
  getEventStatus,
  localizeEvent,
  lowestFee,
  type EventSummary,
} from '@runner/shared';
import { colors, eventImages, ImageBox, useLanguage } from '@/modules/common';
import { homeMessages } from '../messages';

export function RaceCard({ event }: { event: EventSummary }) {
  const { lang, t, common, text, row } = useLanguage(homeMessages);
  const { title, city } = localizeEvent(event, lang);
  const status = getEventStatus(event);

  return (
    <Link href={{ pathname: '/events/[slug]', params: { slug: event.slug } }} asChild>
      <Pressable style={styles.card} accessibilityRole="button">
        <ImageBox source={eventImages[event.slug]} style={styles.image} imageStyle={styles.imageRadius}>
          <View style={[styles.badge, status === 'open' ? styles.badgeOpen : styles.badgeMuted]}>
            <Text style={styles.badgeText}>{common.status[status]}</Text>
          </View>
        </ImageBox>
        <View style={styles.body}>
          <Text style={[styles.title, text]}>{title}</Text>
          <Text style={[styles.meta, text]}>
            {city} · {formatDay(event.startsAt, lang)}
          </Text>
          <View style={[styles.chips, row]}>
            {event.distances.map((distance) => (
              <View key={distance.name.en} style={styles.chip}>
                <Text style={styles.chipText}>{distance.name[lang]}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.footer, row]}>
            <Text style={styles.price}>
              {common.from} {formatPrice(lowestFee(event), event.currency, lang)}
            </Text>
            <Text style={styles.link}>{t.details} ›</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  image: {
    height: 180,
    padding: 12,
    alignItems: 'flex-start',
  },
  imageRadius: {
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
  body: {
    padding: 16,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 4,
  },
  meta: {
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
  footer: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.brand,
  },
  link: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
  },
});

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
import { colors, eventImages, Icon, ImageBox, radius, shadow, space, type, useLanguage } from '@/modules/common';
import { StatusBadge } from './StatusBadge';

const MAX_CHIPS = 3;

interface EventCardProps {
  event: EventSummary;
  /** Fixed-width card for horizontal carousels. */
  width?: number;
}

/** Race card used on Home and Races: photo, status, date, place, distances and starting price. */
export function EventCard({ event, width }: EventCardProps) {
  const { lang, common, text, row } = useLanguage();
  const { title, city } = localizeEvent(event, lang);
  const status = getEventStatus(event);
  const chips = event.distances.slice(0, MAX_CHIPS);
  const more = event.distances.length - chips.length;

  return (
    <Link href={{ pathname: '/events/[slug]', params: { slug: event.slug } }} asChild>
      <Pressable
        style={({ pressed }) => [styles.card, width ? { width } : styles.fullWidth, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${city}, ${formatDay(event.startsAt, lang)}, ${common.status[status]}`}
      >
        <ImageBox source={eventImages[event.slug]} style={styles.image} shade>
          <View style={[styles.imageTop, row]}>
            <StatusBadge status={status} />
          </View>
          <Text style={[styles.title, text]} numberOfLines={2}>
            {title}
          </Text>
        </ImageBox>

        <View style={styles.body}>
          <View style={[styles.metaRow, row]}>
            <Icon name="calendar-outline" size={15} color={colors.muted} />
            <Text style={[styles.meta, text]}>{formatDay(event.startsAt, lang)}</Text>
            <Text style={styles.dot}>·</Text>
            <Icon name="location-outline" size={15} color={colors.muted} />
            <Text style={[styles.meta, text]} numberOfLines={1}>
              {city}
            </Text>
          </View>

          <View style={[styles.chips, row]}>
            {chips.map((distance) => (
              <View key={distance.name.en} style={styles.chip}>
                <Text style={styles.chipText} numberOfLines={1}>
                  {distance.name[lang]}
                </Text>
              </View>
            ))}
            {more > 0 && (
              <View style={styles.chip}>
                <Text style={styles.chipText}>+{more}</Text>
              </View>
            )}
          </View>

          <View style={[styles.footer, row]}>
            <View>
              <Text style={[styles.fromLabel, text]}>{common.from}</Text>
              <Text style={[styles.price, text]}>{formatPrice(lowestFee(event), event.currency, lang)}</Text>
            </View>
            <View style={styles.go}>
              <Icon name="arrow-forward" size={18} color={colors.white} />
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    ...shadow,
  },
  fullWidth: {
    marginHorizontal: space.xl,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  image: {
    height: 190,
    padding: space.lg,
    justifyContent: 'space-between',
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  imageTop: {
    justifyContent: 'flex-start',
  },
  title: {
    ...type.heading,
    fontSize: 21,
    lineHeight: 26,
    color: colors.white,
  },
  body: {
    padding: space.lg,
    gap: space.md,
  },
  metaRow: {
    alignItems: 'center',
    gap: 5,
  },
  meta: {
    ...type.label,
    fontWeight: '500',
    color: colors.muted,
    flexShrink: 1,
  },
  dot: {
    color: colors.subtle,
    marginHorizontal: 2,
  },
  chips: {
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: colors.brandSoft,
    borderRadius: radius.pill,
    paddingVertical: 5,
    paddingHorizontal: 10,
    maxWidth: '100%',
  },
  chipText: {
    ...type.caption,
    color: colors.brandDark,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: space.xs,
  },
  fromLabel: {
    ...type.caption,
    color: colors.subtle,
  },
  price: {
    ...type.heading,
    color: colors.brand,
  },
  go: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

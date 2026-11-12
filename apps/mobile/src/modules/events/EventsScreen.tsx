import { StyleSheet, Text, View } from 'react-native';
import { getEvents } from '@runner/shared';
import { colors, gutter, Screen, SectionHeader, space, type, useLanguage } from '@/modules/common';
import { EventCard } from './components/EventCard';
import { PastEditions } from './components/PastEditions';
import { eventMessages } from './messages';

/** Races tab: every event, then photos from previous editions. */
export function EventsScreen() {
  const { t, text } = useLanguage(eventMessages);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, text]} accessibilityRole="header">
          {t.listTitle}
        </Text>
        <Text style={[styles.subtitle, text]}>{t.listSubtitle}</Text>
      </View>

      <View style={styles.list}>
        {getEvents().map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </View>

      <SectionHeader title={t.previousTitle} />
      <PastEditions />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: gutter,
    paddingTop: space.lg,
    paddingBottom: space.xl,
  },
  title: {
    ...type.display,
    color: colors.ink,
  },
  subtitle: {
    ...type.body,
    color: colors.muted,
    marginTop: space.xs,
  },
  list: {
    gap: space.xl,
  },
});

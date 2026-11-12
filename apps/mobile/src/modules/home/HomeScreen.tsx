import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { getEvents } from '@runner/shared';
import { gutter, Screen, SectionHeader, space, useLanguage } from '@/modules/common';
import { EventCard, PastEditions } from '@/modules/events';
import { FounderQuote } from './components/FounderQuote';
import { Hero } from './components/Hero';
import { WhyParticipate } from './components/WhyParticipate';
import { homeMessages } from './messages';

export function HomeScreen() {
  const { t } = useLanguage(homeMessages);
  const { width } = useWindowDimensions();
  // Show a sliver of the next card so it's clear the row scrolls
  const cardWidth = Math.min(width - gutter * 2 - 28, 360);
  const openRaces = () => router.navigate('/races');

  return (
    <Screen>
      <Hero onExplore={openRaces} />

      <SectionHeader title={t.racesTitle} action={{ label: t.seeAll, onPress: openRaces }} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        decelerationRate="fast"
        snapToInterval={cardWidth + space.lg}
        snapToAlignment="start"
      >
        {getEvents().map((event) => (
          <EventCard key={event.slug} event={event} width={cardWidth} />
        ))}
      </ScrollView>

      <SectionHeader title={t.whyTitle} />
      <WhyParticipate />

      <SectionHeader title={t.previousTitle} />
      <PastEditions />

      <FounderQuote />
    </Screen>
  );
}

const styles = StyleSheet.create({
  carousel: {
    gap: space.lg,
    paddingHorizontal: gutter,
    // Room for the card shadow
    paddingBottom: space.sm,
  },
});

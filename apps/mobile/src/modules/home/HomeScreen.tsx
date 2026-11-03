import { useRef } from 'react';
import { Text, View, type ScrollViewInstance } from 'react-native';
import { getEvents } from '@runner/shared';
import { Page, useLanguage } from '@/modules/common';
import { FounderQuote } from './components/FounderQuote';
import { Hero } from './components/Hero';
import { PreviousEvents } from './components/PreviousEvents';
import { RaceCard } from './components/RaceCard';
import { WhyParticipate } from './components/WhyParticipate';
import { homeMessages } from './messages';
import { sectionStyles } from './styles';

export function HomeScreen() {
  const { t, text } = useLanguage(homeMessages);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const racesY = useRef(0);

  return (
    <Page scrollRef={scrollRef}>
      <Hero onJoin={() => scrollRef.current?.scrollTo({ y: racesY.current, animated: true })} />

      <View onLayout={(e) => (racesY.current = e.nativeEvent.layout.y)}>
        <Text style={[sectionStyles.eyebrow, text]}>{t.racesSubtitle}</Text>
        <Text style={[sectionStyles.title, text]}>{t.racesTitle}</Text>
        {getEvents().map((event) => (
          <RaceCard key={event.slug} event={event} />
        ))}
      </View>

      <WhyParticipate />
      <PreviousEvents />
      <FounderQuote />
    </Page>
  );
}

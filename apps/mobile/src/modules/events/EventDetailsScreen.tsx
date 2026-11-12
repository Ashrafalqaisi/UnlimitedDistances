import { Linking, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getEvent, getEventStatus, localizeEvent } from '@runner/shared';
import {
  Button,
  colors,
  EmptyState,
  eventImages,
  gutter,
  ImageBox,
  Screen,
  space,
  type,
  useLanguage,
} from '@/modules/common';
import { CheckList, DetailSection, detailStyles } from './components/DetailSection';
import { EventFacts } from './components/EventFacts';
import { DistanceList, FeeTables, ProgrammeTimeline } from './components/EventSchedule';
import { REGISTER_BAR_HEIGHT, RegisterBar } from './components/RegisterBar';
import { StatusBadge } from './components/StatusBadge';
import { eventMessages } from './messages';

export function EventDetailsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { lang, t, text, row } = useLanguage(eventMessages);
  const event = getEvent(slug);

  if (!event) {
    return (
      <Screen inset="none">
        <EmptyState icon="search-outline" title={t.notFound} message="" />
      </Screen>
    );
  }

  const { title, tagline, city } = localizeEvent(event, lang);
  const status = getEventStatus(event);

  return (
    <View style={styles.fill}>
      <Screen inset="none" statusBar="light" contentStyle={{ paddingBottom: REGISTER_BAR_HEIGHT + space.xxxl }}>
        <ImageBox source={eventImages[event.slug]} style={styles.cover} shade>
          {/* Keeps the back button readable over bright sky */}
          <LinearGradient colors={['rgba(20,20,20,0.55)', 'rgba(20,20,20,0)']} style={styles.topShade} />
          <View style={styles.coverText}>
            <StatusBadge status={status} />
            <Text style={[styles.title, text]} accessibilityRole="header">
              {title}
            </Text>
            <Text style={[styles.tagline, text]}>{tagline}</Text>
          </View>
        </ImageBox>

        <EventFacts event={event} city={city} />

        <DetailSection title={t.distancesTitle}>
          <DistanceList event={event} />
        </DetailSection>

        {event.programmes?.length ? (
          <DetailSection title={t.programmeTitle}>
            <ProgrammeTimeline event={event} />
          </DetailSection>
        ) : null}

        <DetailSection title={t.feesTitle}>
          <FeeTables event={event} />
        </DetailSection>

        <DetailSection title={t.includesTitle}>
          <CheckList items={event.includes} />
        </DetailSection>

        {event.equipment && (
          <DetailSection title={t.equipmentTitle}>
            <Text style={[detailStyles.note, text, styles.noteGap]}>{event.equipment.appliesTo[lang]}</Text>
            <Text style={[detailStyles.subheading, text]}>{t.mandatory}</Text>
            <CheckList items={event.equipment.mandatory} />
            <View style={detailStyles.divider} />
            <Text style={[detailStyles.subheading, text]}>{t.optional}</Text>
            <CheckList items={event.equipment.optional} optional />
          </DetailSection>
        )}

        {event.rules?.length ? (
          <DetailSection title={t.rulesTitle}>
            <View style={styles.rules}>
              {event.rules.map((rule, index) => (
                <View key={rule.en} style={[styles.rule, row]}>
                  <Text style={styles.ruleNumber}>{index + 1}</Text>
                  <Text style={[styles.ruleText, text]}>{rule[lang]}</Text>
                </View>
              ))}
            </View>
          </DetailSection>
        ) : null}

        <View style={styles.website}>
          <Button
            label={t.moreOnWebsite}
            variant="secondary"
            icon="globe-outline"
            accessibilityRole="link"
            onPress={() => Linking.openURL(event.websiteUrl)}
          />
        </View>
      </Screen>

      <RegisterBar event={event} status={status} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cover: {
    height: 420,
    justifyContent: 'flex-end',
  },
  topShade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  coverText: {
    paddingHorizontal: gutter,
    paddingBottom: space.xxxl + space.xxl,
    gap: space.sm,
  },
  title: {
    ...type.display,
    color: colors.white,
  },
  tagline: {
    ...type.body,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.9)',
  },
  noteGap: {
    marginBottom: space.md,
  },
  rules: {
    gap: space.md,
  },
  rule: {
    alignItems: 'flex-start',
    gap: space.md,
  },
  ruleNumber: {
    ...type.caption,
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '800',
    color: colors.brandDark,
    backgroundColor: colors.brandSoft,
  },
  ruleText: {
    ...type.body,
    flex: 1,
    color: colors.inkSoft,
  },
  website: {
    alignItems: 'center',
    marginTop: space.xxl,
  },
});

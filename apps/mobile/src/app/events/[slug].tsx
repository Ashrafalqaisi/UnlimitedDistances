import type { ReactNode } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  formatDay,
  formatPrice,
  formatTime,
  getEvent,
  getEventStatus,
  localizeEvent,
} from '@runner/shared';
import { ImageBox } from '@/components/ImageBox';
import { eventImages } from '@/images';
import { useLanguage } from '@/language';
import { colors } from '@/theme';

export default function EventDetailsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lang, t, text, row, isRTL } = useLanguage();
  const event = getEvent(slug);

  if (!event) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.body}>{t.notFound}</Text>
      </SafeAreaView>
    );
  }

  const { title, tagline, city } = localizeEvent(event, lang);
  const status = getEventStatus(event);
  const price = (amount: number) => formatPrice(amount, event.currency, lang);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <ImageBox source={eventImages[event.slug]} style={styles.cover}>
          <View style={[styles.coverShade, { paddingTop: insets.top + 8 }]}>
            <View style={row}>
              <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityRole="button">
                <Text style={styles.backText}>
                  {isRTL ? '›' : '‹'} {t.back}
                </Text>
              </Pressable>
            </View>
            <View>
              <Text style={[styles.status, text]}>{t.status[status]}</Text>
              <Text style={[styles.title, text]}>{title}</Text>
              <Text style={[styles.tagline, text]}>{tagline}</Text>
            </View>
          </View>
        </ImageBox>

        <View style={[styles.facts, row]}>
          <Fact label={t.date} value={formatDay(event.startsAt, lang)} />
          <Fact label={t.location} value={city} />
        </View>

        <Section title={t.distancesTitle}>
          {event.distances.map((distance) => (
            <View key={distance.name.en} style={[styles.listRow, row]}>
              <Text style={[styles.listMain, text]}>{distance.name[lang]}</Text>
              <Text style={[styles.listSide, text]}>
                {formatDay(distance.startsAt, lang)} · {formatTime(distance.startsAt, lang)}
                {distance.minAge ? `\n${t.minAge(distance.minAge)}` : ''}
              </Text>
            </View>
          ))}
        </Section>

        <Section title={t.feesTitle}>
          {event.fees.map((table) => (
            <View key={table.appliesTo.en} style={styles.feeTable}>
              <Text style={[styles.feeHeading, text]}>{table.appliesTo[lang]}</Text>
              {table.rows.map((fee) => (
                <View key={fee.label.en} style={[styles.listRow, row]}>
                  <Text style={[styles.listMain, text]}>{fee.label[lang]}</Text>
                  <Text style={styles.feeAmount}>{price(fee.amount)}</Text>
                </View>
              ))}
            </View>
          ))}
        </Section>

        <Section title={t.includesTitle}>
          {event.includes.map((item) => (
            <View key={item.en} style={[styles.includeRow, row]}>
              <View style={styles.bullet} />
              <Text style={[styles.body, styles.includeText, text]}>{item[lang]}</Text>
            </View>
          ))}
          <Text style={[styles.note, text]}>
            {t.registrationWindow(formatDay(event.registrationOpensAt, lang), formatDay(event.registrationClosesAt, lang))}
          </Text>
        </Section>

        <Pressable onPress={() => Linking.openURL(event.websiteUrl)} accessibilityRole="link">
          <Text style={styles.websiteLink}>{t.moreOnWebsite} ›</Text>
        </Pressable>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        {status === 'open' ? (
          <Pressable
            onPress={() => Linking.openURL(event.registerUrl)}
            style={styles.registerButton}
            accessibilityRole="link"
          >
            <Text style={styles.registerText}>{t.register}</Text>
          </Pressable>
        ) : (
          <View style={[styles.registerButton, styles.registerDisabled]}>
            <Text style={[styles.registerText, styles.registerDisabledText]}>{t.registrationUnavailable}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  const { text } = useLanguage();
  return (
    <View style={styles.fact}>
      <Text style={[styles.factLabel, text]}>{label}</Text>
      <Text style={[styles.factValue, text]}>{value}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const { text } = useLanguage();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, text]}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    minHeight: 340,
  },
  coverShade: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: colors.overlay,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  backText: {
    color: colors.ink,
    fontWeight: '700',
  },
  status: {
    color: colors.brandSoft,
    fontWeight: '700',
    marginBottom: 6,
  },
  title: {
    color: colors.white,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
  },
  tagline: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    marginTop: 6,
  },
  facts: {
    backgroundColor: colors.ink,
  },
  fact: {
    flex: 1,
    padding: 16,
  },
  factLabel: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  factValue: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.ink,
    marginBottom: 10,
  },
  listRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  listMain: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.ink,
  },
  listSide: {
    fontSize: 13,
    color: colors.muted,
  },
  feeTable: {
    marginBottom: 14,
  },
  feeHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.brandDark,
    backgroundColor: colors.brandSoft,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  feeAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.brand,
  },
  includeRow: {
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 6,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand,
    marginTop: 7,
  },
  includeText: {
    flex: 1,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.ink,
  },
  note: {
    marginTop: 12,
    fontSize: 13,
    color: colors.muted,
  },
  websiteLink: {
    marginTop: 24,
    textAlign: 'center',
    color: colors.brand,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  registerButton: {
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: 'center',
  },
  registerText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  registerDisabled: {
    backgroundColor: colors.line,
  },
  registerDisabledText: {
    color: colors.muted,
  },
});

import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  formatEventDate,
  formatPrice,
  getUpcomingEvents,
  localizeEvent,
  type EventSummary,
} from '@runner/shared';
import { messages, type Lang, type Messages } from '@/messages';
import { colors } from '@/theme';

export default function HomeScreen() {
  const [lang, setLang] = useState<Lang>('en');
  const t = messages[lang];
  const isRTL = lang === 'ar';

  // Direction is applied per element, so switching language works without restarting the app.
  const text: TextStyle = {
    textAlign: isRTL ? 'right' : 'left',
    writingDirection: isRTL ? 'rtl' : 'ltr',
  };
  const row: ViewStyle = { flexDirection: isRTL ? 'row-reverse' : 'row' };

  const comingSoon = () => Alert.alert(t.brand, t.comingSoon);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="dark" />

      <View style={[styles.header, row]}>
        <Text style={styles.brand}>
          Runner<Text style={styles.brandAccent}>Platform</Text>
        </Text>
        <Pressable
          onPress={() => setLang(isRTL ? 'en' : 'ar')}
          style={styles.langButton}
          accessibilityRole="button"
        >
          <Text style={styles.langText}>{t.languageToggle}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={[styles.heroTitle, text]}>{t.heroTitle}</Text>
          <Text style={[styles.heroSubtitle, text]}>{t.heroSubtitle}</Text>
          <Pressable onPress={comingSoon} style={styles.primaryButton} accessibilityRole="button">
            <Text style={styles.primaryButtonText}>{t.browse}</Text>
          </Pressable>
        </View>

        <Text style={[styles.sectionTitle, text]}>{t.upcoming}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.cardRow, row]}
        >
          {getUpcomingEvents().map((event) => (
            <EventCardView
              key={event.slug}
              event={event}
              lang={lang}
              t={t}
              text={text}
              onRegister={comingSoon}
            />
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, text]}>{t.featuresTitle}</Text>
        {t.features.map((feature, index) => (
          <View key={feature.title} style={[styles.feature, row]}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>{index + 1}</Text>
            </View>
            <View style={styles.featureBody}>
              <Text style={[styles.featureTitle, text]}>{feature.title}</Text>
              <Text style={[styles.featureText, text]}>{feature.body}</Text>
            </View>
          </View>
        ))}

        <Text style={[styles.footer, text]}>© 2026 RunnerPlatform. {t.footer}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function EventCardView({
  event,
  lang,
  t,
  text,
  onRegister,
}: {
  event: EventSummary;
  lang: Lang;
  t: Messages;
  text: TextStyle;
  onRegister: () => void;
}) {
  const { title, city } = localizeEvent(event, lang);

  return (
    <View style={styles.card}>
      <View style={styles.cardBanner} />
      <Text style={[styles.cardTitle, text]}>{title}</Text>
      <Text style={[styles.cardMeta, text]}>{city}</Text>
      <Text style={[styles.cardMeta, text]}>{formatEventDate(event.startsAt, lang)}</Text>
      <Text style={[styles.cardPrice, text]}>
        {t.from} {formatPrice(event.priceFrom, event.currency, lang)}
      </Text>
      <Pressable onPress={onRegister} style={styles.ghostButton} accessibilityRole="button">
        <Text style={styles.ghostButtonText}>{t.register}</Text>
      </Pressable>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  brand: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.ink,
  },
  brandAccent: {
    color: colors.brand,
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
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: colors.brand,
    padding: 24,
    paddingTop: 36,
    paddingBottom: 36,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 22,
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  primaryButtonText: {
    color: colors.ink,
    fontWeight: '700',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.ink,
    marginTop: 28,
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  cardRow: {
    gap: 14,
    paddingHorizontal: 20,
  },
  card: {
    width: 260,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    padding: 16,
    backgroundColor: colors.white,
  },
  cardBanner: {
    height: 90,
    borderRadius: 10,
    backgroundColor: colors.brandDark,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 2,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.brand,
    marginTop: 8,
    marginBottom: 12,
  },
  ghostButton: {
    borderWidth: 1,
    borderColor: colors.brand,
    borderRadius: 999,
    paddingVertical: 9,
    alignItems: 'center',
  },
  ghostButtonText: {
    color: colors.brand,
    fontWeight: '700',
  },
  feature: {
    alignItems: 'flex-start',
    gap: 14,
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 16,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIconText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
  featureBody: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 2,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
  footer: {
    marginTop: 24,
    textAlign: 'center',
    color: colors.muted,
    fontSize: 13,
  },
});

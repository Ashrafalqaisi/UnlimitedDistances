import { StyleSheet, Text, View } from 'react-native';
import { formatDay, type EventSummary } from '@runner/shared';
import { colors, gutter, Icon, radius, shadow, space, type, useLanguage, type IconName } from '@/modules/common';
import { eventMessages } from '../messages';

/** Date, place and registration window as a card that overlaps the cover photo. */
export function EventFacts({ event, city }: { event: EventSummary; city: string }) {
  const { lang, t } = useLanguage(eventMessages);

  return (
    <View style={styles.card}>
      <Fact icon="calendar" label={t.date} value={formatDay(event.startsAt, lang)} />
      <View style={styles.divider} />
      <Fact icon="location" label={t.location} value={city} />
      <View style={styles.divider} />
      <Fact
        icon="create"
        label={t.registration}
        value={`${formatDay(event.registrationOpensAt, lang)} – ${formatDay(event.registrationClosesAt, lang)}`}
      />
    </View>
  );
}

function Fact({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  const { text, row } = useLanguage();

  return (
    <View style={[styles.fact, row]}>
      <View style={styles.iconBox}>
        <Icon name={icon} size={18} color={colors.brand} />
      </View>
      <View style={styles.factText}>
        <Text style={[styles.label, text]}>{label}</Text>
        <Text style={[styles.value, text]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: gutter,
    marginTop: -space.xxxl,
    padding: space.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    ...shadow,
  },
  fact: {
    alignItems: 'center',
    gap: space.md,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factText: {
    flex: 1,
  },
  label: {
    ...type.caption,
    color: colors.subtle,
  },
  value: {
    ...type.subheading,
    color: colors.ink,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
    marginVertical: space.md,
  },
});

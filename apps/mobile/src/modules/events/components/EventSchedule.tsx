import { StyleSheet, Text, View } from 'react-native';
import { formatDay, formatPrice, formatTime, groupProgrammeByDay, type EventSummary } from '@runner/shared';
import { colors, radius, space, type, useLanguage } from '@/modules/common';
import { eventMessages } from '../messages';
import { detailStyles } from './DetailSection';

/** Distances with their start time and minimum age. */
export function DistanceList({ event }: { event: EventSummary }) {
  const { lang, t, text, row } = useLanguage(eventMessages);

  return (
    <View>
      {event.distances.map((distance, index) => (
        <View key={distance.name.en}>
          {index > 0 && <View style={detailStyles.divider} />}
          <View style={[styles.distance, row]}>
            <View style={styles.flex}>
              <Text style={[styles.distanceName, text]}>{distance.name[lang]}</Text>
              {distance.details && <Text style={[detailStyles.note, text]}>{distance.details[lang]}</Text>}
              <Text style={[styles.start, text]}>
                {formatDay(distance.startsAt, lang)} · {formatTime(distance.startsAt, lang)}
              </Text>
            </View>
            {distance.minAge ? (
              <View style={styles.age}>
                <Text style={styles.ageText}>{t.minAge(distance.minAge)}</Text>
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}

/** Day-by-day timeline for each group of distances. */
export function ProgrammeTimeline({ event }: { event: EventSummary }) {
  const { lang, text, row } = useLanguage();
  if (!event.programmes?.length) return null;

  return (
    <View>
      {event.programmes.map((programme, index) => (
        <View key={programme.appliesTo.en}>
          {index > 0 && <View style={detailStyles.divider} />}
          <Text style={[styles.programmeTitle, text]}>{programme.appliesTo[lang]}</Text>
          {groupProgrammeByDay(programme).map(({ day, items }) => (
            <View key={day} style={styles.day}>
              <Text style={[detailStyles.subheading, text]}>{formatDay(day, lang)}</Text>
              {items.map((item, itemIndex) => (
                <View key={item.at + item.label.en} style={[styles.item, row]}>
                  <Text style={styles.time}>{formatTime(item.at, lang)}</Text>
                  <View style={styles.rail}>
                    <View style={styles.dot} />
                    {itemIndex < items.length - 1 && <View style={styles.line} />}
                  </View>
                  <Text style={[styles.itemText, text]}>{item.label[lang]}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

/** Fee tables: label on one side, local and US dollar price on the other. */
export function FeeTables({ event }: { event: EventSummary }) {
  const { lang, text, row } = useLanguage();

  return (
    <View>
      {event.fees.map((table, index) => (
        <View key={table.appliesTo.en}>
          {index > 0 && <View style={detailStyles.divider} />}
          <Text style={[detailStyles.subheading, text]}>{table.appliesTo[lang]}</Text>
          {table.rows.map((fee) => (
            <View key={fee.label.en} style={[styles.feeRow, row]}>
              <Text style={[styles.feeLabel, text]}>{fee.label[lang]}</Text>
              <View style={styles.feeAmounts}>
                <Text style={styles.feeAmount}>{formatPrice(fee.amount, event.currency, lang)}</Text>
                {fee.amountUsd !== undefined && (
                  <Text style={styles.feeUsd}>{formatPrice(fee.amountUsd, 'USD', lang)}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    gap: 2,
  },
  distance: {
    alignItems: 'center',
    gap: space.md,
  },
  distanceName: {
    ...type.subheading,
    color: colors.ink,
  },
  start: {
    ...type.caption,
    color: colors.brand,
    marginTop: space.xs,
  },
  age: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  ageText: {
    ...type.caption,
    color: colors.muted,
  },
  programmeTitle: {
    ...type.subheading,
    color: colors.ink,
    marginBottom: space.md,
  },
  day: {
    marginBottom: space.md,
  },
  item: {
    gap: space.md,
  },
  time: {
    width: 52,
    ...type.label,
    fontWeight: '800',
    color: colors.brand,
    fontVariant: ['tabular-nums'],
  },
  rail: {
    width: 12,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: colors.brand,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.brandSoft,
  },
  itemText: {
    ...type.body,
    flex: 1,
    color: colors.inkSoft,
    paddingBottom: space.md,
  },
  feeRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
    paddingVertical: space.sm,
  },
  feeLabel: {
    ...type.body,
    flex: 1,
    color: colors.inkSoft,
  },
  feeAmounts: {
    alignItems: 'flex-end',
  },
  feeAmount: {
    ...type.subheading,
    fontWeight: '800',
    color: colors.brand,
    fontVariant: ['tabular-nums'],
  },
  feeUsd: {
    ...type.caption,
    color: colors.subtle,
  },
});

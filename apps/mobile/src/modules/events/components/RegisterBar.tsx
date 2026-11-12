import { Linking, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatPrice, lowestFee, type EventStatus, type EventSummary } from '@runner/shared';
import { Button, colors, gutter, space, type, useLanguage } from '@/modules/common';
import { eventMessages } from '../messages';

/** Height of the bar without the bottom safe area, so the page can leave room for it. */
export const REGISTER_BAR_HEIGHT = 84;

/** Sticky bottom bar on the event page: starting price and the register action. */
export function RegisterBar({ event, status }: { event: EventSummary; status: EventStatus }) {
  const insets = useSafeAreaInsets();
  const { lang, t, common, text, row } = useLanguage(eventMessages);
  const open = status === 'open';

  return (
    <View style={[styles.bar, row, { paddingBottom: Math.max(insets.bottom, space.md) }]}>
      <View style={styles.price}>
        <Text style={[styles.from, text]}>{common.from}</Text>
        <Text style={[styles.amount, text]}>{formatPrice(lowestFee(event), event.currency, lang)}</Text>
      </View>
      <Button
        label={open ? t.register : t.registrationUnavailable}
        icon={open ? 'open-outline' : 'lock-closed-outline'}
        size="lg"
        disabled={!open}
        accessibilityRole="link"
        onPress={() => Linking.openURL(event.registerUrl)}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    gap: space.lg,
    paddingTop: space.md,
    paddingHorizontal: gutter,
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  price: {
    minWidth: 80,
  },
  from: {
    ...type.caption,
    color: colors.subtle,
  },
  amount: {
    ...type.heading,
    color: colors.ink,
  },
  button: {
    flex: 1,
  },
});

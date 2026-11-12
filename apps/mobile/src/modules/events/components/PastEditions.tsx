import { ScrollView, StyleSheet, Text } from 'react-native';
import { PAST_EDITIONS } from '@runner/shared';
import { colors, eventImages, gutter, ImageBox, radius, space, type, useLanguage } from '@/modules/common';

/** Horizontal photo carousel of previous editions. */
export function PastEditions() {
  const { lang, text } = useLanguage();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      decelerationRate="fast"
      snapToInterval={ITEM_WIDTH + space.md}
      snapToAlignment="start"
    >
      {PAST_EDITIONS.map((edition) => (
        <ImageBox key={edition.slug} source={eventImages[edition.slug]} style={styles.item} shade>
          <Text style={[styles.caption, text]} numberOfLines={2}>
            {edition.title[lang]}
          </Text>
        </ImageBox>
      ))}
    </ScrollView>
  );
}

const ITEM_WIDTH = 240;

const styles = StyleSheet.create({
  row: {
    gap: space.md,
    paddingHorizontal: gutter,
  },
  item: {
    width: ITEM_WIDTH,
    height: 160,
    borderRadius: radius.lg,
    justifyContent: 'flex-end',
    padding: space.md,
  },
  caption: {
    ...type.subheading,
    color: colors.white,
  },
});

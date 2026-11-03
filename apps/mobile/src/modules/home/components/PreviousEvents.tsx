import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PAST_EDITIONS } from '@runner/shared';
import { colors, eventImages, ImageBox, useLanguage } from '@/modules/common';
import { homeMessages } from '../messages';
import { sectionStyles } from '../styles';

export function PreviousEvents() {
  const { lang, t, text, row } = useLanguage(homeMessages);

  return (
    <View>
      <Text style={[sectionStyles.title, text]}>{t.previousTitle}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.row, row]}>
        {PAST_EDITIONS.map((edition) => (
          <ImageBox
            key={edition.slug}
            source={eventImages[edition.slug]}
            style={styles.item}
            imageStyle={styles.image}
          >
            <View style={styles.caption}>
              <Text style={[styles.captionText, text]}>{edition.title[lang]}</Text>
            </View>
          </ImageBox>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 12,
    paddingHorizontal: 20,
  },
  item: {
    width: 260,
    height: 170,
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 14,
  },
  caption: {
    backgroundColor: colors.overlay,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    padding: 10,
  },
  captionText: {
    color: colors.white,
    fontWeight: '700',
  },
});

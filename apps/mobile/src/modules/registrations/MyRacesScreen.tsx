import { StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { Button, colors, EmptyState, gutter, Screen, space, type, useLanguage } from '@/modules/common';
import { registrationMessages } from './messages';

/** My races tab. Placeholder until My Registrations (Flow 6) is designed and approved. */
export function MyRacesScreen() {
  const { t, text } = useLanguage(registrationMessages);

  return (
    <Screen>
      <Text style={[styles.title, text]} accessibilityRole="header">
        {t.title}
      </Text>
      <EmptyState icon="ribbon-outline" title={t.emptyTitle} message={t.emptyMessage}>
        <Button label={t.browseRaces} icon="search" size="lg" block onPress={() => router.navigate('/races')} />
      </EmptyState>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...type.display,
    color: colors.ink,
    paddingHorizontal: gutter,
    paddingTop: space.lg,
    paddingBottom: space.xxxl,
  },
});

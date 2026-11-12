import { Linking, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { ORGANIZER } from '@runner/shared';
import {
  Button,
  colors,
  gutter,
  Icon,
  ListGroup,
  ListRow,
  radius,
  Screen,
  shadow,
  space,
  type,
  useLanguage,
} from '@/modules/common';
import { accountMessages } from './messages';

/**
 * Account tab. Signed-out view for now: the signed-in profile arrives with
 * session storage (Flow 1, step 3) and Runner Profile (Flow 2).
 */
export function AccountScreen() {
  const { t, text, toggle } = useLanguage(accountMessages);
  const open = (url: string) => () => Linking.openURL(url);
  const version = Constants.expoConfig?.version ?? '';

  return (
    <Screen>
      <Text style={[styles.title, text]} accessibilityRole="header">
        {t.title}
      </Text>

      <View style={styles.guest}>
        <View style={styles.avatar}>
          <Icon name="person" size={30} color={colors.brand} />
        </View>
        <Text style={styles.guestTitle}>{t.guestTitle}</Text>
        <Text style={styles.guestMessage}>{t.guestMessage}</Text>
        <View style={styles.guestActions}>
          <Button label={t.signIn} size="lg" block onPress={() => router.push('/login')} />
          <Button label={t.createAccount} variant="secondary" size="lg" block onPress={() => router.push('/register')} />
        </View>
      </View>

      <Text style={[styles.groupTitle, text]}>{t.settingsTitle}</Text>
      <ListGroup>
        <ListRow icon="language" label={t.language} value={t.languageValue} onPress={toggle} last />
      </ListGroup>

      <Text style={[styles.groupTitle, text]}>{t.contactTitle}</Text>
      <ListGroup>
        {ORGANIZER.phones.map((phone) => (
          <ListRow key={phone} icon="call" label={t.call(phone)} onPress={open(`tel:${phone}`)} accessibilityRole="link" />
        ))}
        <ListRow icon="mail" label={t.email} onPress={open(`mailto:${ORGANIZER.email}`)} accessibilityRole="link" />
        <ListRow icon="globe" label={t.website} onPress={open(ORGANIZER.website)} accessibilityRole="link" last />
      </ListGroup>

      <Text style={[styles.groupTitle, text]}>{t.followTitle}</Text>
      <ListGroup>
        <ListRow icon="logo-facebook" label="Facebook" onPress={open(ORGANIZER.social.facebook)} accessibilityRole="link" />
        <ListRow icon="logo-instagram" label="Instagram" onPress={open(ORGANIZER.social.instagram)} accessibilityRole="link" />
        <ListRow icon="logo-linkedin" label="LinkedIn" onPress={open(ORGANIZER.social.linkedin)} accessibilityRole="link" last />
      </ListGroup>

      {version !== '' && <Text style={styles.version}>{t.version(version)}</Text>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...type.display,
    color: colors.ink,
    paddingHorizontal: gutter,
    paddingTop: space.lg,
    paddingBottom: space.xl,
  },
  guest: {
    alignItems: 'center',
    marginHorizontal: gutter,
    padding: space.xxl,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    ...shadow,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.lg,
  },
  guestTitle: {
    ...type.heading,
    color: colors.ink,
    textAlign: 'center',
  },
  guestMessage: {
    ...type.body,
    color: colors.muted,
    textAlign: 'center',
    marginTop: space.sm,
  },
  guestActions: {
    alignSelf: 'stretch',
    gap: space.md,
    marginTop: space.xl,
  },
  groupTitle: {
    ...type.eyebrow,
    color: colors.muted,
    paddingHorizontal: gutter + space.xs,
    marginTop: space.xxl,
    marginBottom: space.sm,
  },
  version: {
    ...type.caption,
    fontWeight: '500',
    color: colors.subtle,
    textAlign: 'center',
    marginTop: space.xxl,
  },
});

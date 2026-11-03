import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ORGANIZER } from '@runner/shared';
import { images, LOGO_ASPECT } from '../images';
import { useLanguage } from '../language';
import { colors } from '../theme';

/** Shared contact footer shown at the bottom of every page. */
export function AppFooter() {
  const insets = useSafeAreaInsets();
  const { common, text, row } = useLanguage();
  const links = [
    ...ORGANIZER.phones.map((phone) => ({ label: phone, url: `tel:${phone}` })),
    { label: ORGANIZER.email, url: `mailto:${ORGANIZER.email}` },
    { label: 'Facebook', url: ORGANIZER.social.facebook },
    { label: 'Instagram', url: ORGANIZER.social.instagram },
    { label: 'LinkedIn', url: ORGANIZER.social.linkedin },
    { label: 'maasafatmarathon.com', url: ORGANIZER.website },
  ];

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
      <Image source={images.logoWhite} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.title, text]}>{common.contactTitle}</Text>
      <View style={[styles.links, row]}>
        {links.map((link) => (
          <Pressable key={link.url} onPress={() => Linking.openURL(link.url)} accessibilityRole="link">
            <Text style={styles.link}>{link.label}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.copy}>
        © {new Date().getFullYear()} {common.brand}. {common.footer}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.ink,
    padding: 24,
    marginTop: 32,
  },
  logo: {
    height: 40,
    width: 40 * LOGO_ASPECT,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  links: {
    flexWrap: 'wrap',
    gap: 10,
  },
  link: {
    color: colors.brandSoft,
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
  },
  copy: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});

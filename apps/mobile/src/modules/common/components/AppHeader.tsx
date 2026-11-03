import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, usePathname, useRouter } from 'expo-router';
import { images, LOGO_ASPECT } from '../images';
import { useLanguage } from '../language';
import { colors } from '../theme';

/** Shared top bar: back button on inner screens, logo, sign-in link and language switch. */
export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { common, row, isRTL, toggle } = useLanguage();
  const canGoBack = router.canGoBack();

  return (
    <View style={[styles.header, row]}>
      <View style={[styles.side, row]}>
        {canGoBack && (
          <Pressable onPress={() => router.back()} style={styles.back} accessibilityRole="button" accessibilityLabel={common.back}>
            <Text style={styles.backText}>{isRTL ? '›' : '‹'}</Text>
          </Pressable>
        )}
        <Link href="/" accessibilityRole="link" accessibilityLabel={common.brand}>
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        </Link>
      </View>

      <View style={[styles.side, row]}>
        {pathname !== '/login' && (
          <Link href="/login" style={styles.signIn}>
            {common.signIn}
          </Link>
        )}
        <Pressable onPress={toggle} style={styles.langButton} accessibilityRole="button">
          <Text style={styles.langText}>{common.languageToggle}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    backgroundColor: colors.white,
  },
  side: {
    alignItems: 'center',
    gap: 10,
  },
  back: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  backText: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.ink,
  },
  logo: {
    height: 30,
    width: 30 * LOGO_ASPECT,
  },
  signIn: {
    color: colors.brand,
    fontWeight: '700',
  },
  langButton: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  langText: {
    color: colors.muted,
    fontWeight: '600',
  },
});

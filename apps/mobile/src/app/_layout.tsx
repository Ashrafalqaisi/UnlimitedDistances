import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { colors, LanguageProvider } from '@/modules/common';

// Navigation colours match the app's warm background, so screens don't flash white
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.brand,
    background: colors.background,
    card: colors.background,
    text: colors.ink,
    border: colors.line,
  },
};

// Plain native header (back button only) for screens pushed over the tabs
const plainHeader = {
  title: '',
  headerShadowVisible: false,
  headerTintColor: colors.ink,
  headerStyle: { backgroundColor: colors.background },
  headerBackButtonDisplayMode: 'minimal',
} as const;

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider value={theme}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="events/[slug]"
            options={{ ...plainHeader, headerTransparent: true, headerTintColor: colors.white, headerStyle: undefined }}
          />
          <Stack.Screen name="login" options={plainHeader} />
          <Stack.Screen name="register" options={plainHeader} />
        </Stack>
      </ThemeProvider>
    </LanguageProvider>
  );
}

import { Stack } from 'expo-router';
import { LanguageProvider } from '@/modules/common';

export default function RootLayout() {
  return (
    <LanguageProvider>
      {/* Each screen renders the shared AppHeader and AppFooter through the Page layout */}
      <Stack screenOptions={{ headerShown: false }} />
    </LanguageProvider>
  );
}

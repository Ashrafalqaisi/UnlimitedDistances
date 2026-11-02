import { Stack } from 'expo-router';
import { LanguageProvider } from '@/language';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LanguageProvider>
  );
}

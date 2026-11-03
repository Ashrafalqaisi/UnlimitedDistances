import type { ReactNode, Ref } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  type ScrollViewInstance,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme';
import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';

interface PageProps {
  children: ReactNode;
  scrollRef?: Ref<ScrollViewInstance>;
}

/** Layout for every screen: shared header, scrolling content, shared footer. */
export function Page({ children, scrollRef }: PageProps) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="dark" />
      <AppHeader />
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled">
          {children}
          <AppFooter />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  fill: {
    flex: 1,
  },
});

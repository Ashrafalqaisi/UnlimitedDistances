import type { ReactNode, Ref } from 'react';
import { Platform, ScrollView, StyleSheet, type ScrollViewInstance, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors, space } from '../theme';

interface ScreenProps {
  children: ReactNode;
  scrollRef?: Ref<ScrollViewInstance>;
  /**
   * 'top' for tab screens without a navigation bar, so content starts below the status bar.
   * 'none' when a native header or a full-bleed image already handles the top edge.
   */
  inset?: 'top' | 'none';
  statusBar?: 'dark' | 'light';
  background?: string;
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * Scrolling container for every screen. iOS adjusts for the status bar, navigation bar,
 * tab bar and keyboard natively; on Android the top inset is added here.
 */
export function Screen({
  children,
  scrollRef,
  inset = 'top',
  statusBar = 'dark',
  background = colors.background,
  contentStyle,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const androidTop = Platform.OS === 'android' && inset === 'top' ? insets.top : 0;

  return (
    <>
      <StatusBar style={statusBar} />
      <ScrollView
        ref={scrollRef}
        style={{ backgroundColor: background }}
        contentContainerStyle={[styles.content, { paddingTop: androidTop }, contentStyle]}
        contentInsetAdjustmentBehavior={inset === 'top' ? 'automatic' : 'never'}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        {children}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: space.xxxl,
  },
});

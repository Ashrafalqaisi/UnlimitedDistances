import { ActivityIndicator, Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { useLanguage } from '../language';
import { colors, radius, space } from '../theme';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: 'md' | 'lg';
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  /** Stretch to the width of the parent. */
  block?: boolean;
  accessibilityRole?: 'button' | 'link';
  style?: StyleProp<ViewStyle>;
}

/** The app's one button: primary (copper), secondary (outlined), ghost (text only) or onDark (over photos). */
export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  block = false,
  accessibilityRole = 'button',
  style,
}: ButtonProps) {
  const { row } = useLanguage();
  const inactive = disabled || loading;
  const tone = tones[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        row,
        size === 'lg' && styles.large,
        { backgroundColor: tone.background, borderColor: tone.border },
        block && styles.block,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={tone.text} />
      ) : (
        icon && <Icon name={icon} size={18} color={tone.text} />
      )}
      <Text style={[styles.label, size === 'lg' && styles.labelLarge, { color: tone.text }]}>{label}</Text>
    </Pressable>
  );
}

const tones: Record<Variant, { background: string; border: string; text: string }> = {
  primary: { background: colors.brand, border: colors.brand, text: colors.white },
  secondary: { background: colors.white, border: colors.line, text: colors.ink },
  ghost: { background: 'transparent', border: 'transparent', text: colors.brand },
  onDark: { background: 'rgba(255,255,255,0.16)', border: 'rgba(255,255,255,0.45)', text: colors.white },
};

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    paddingHorizontal: space.xl,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  large: {
    minHeight: 52,
    paddingHorizontal: space.xxl,
  },
  block: {
    alignSelf: 'stretch',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  labelLarge: {
    fontSize: 16,
    fontWeight: '800',
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});

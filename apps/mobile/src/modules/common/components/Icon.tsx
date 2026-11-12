import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { useLanguage } from '../language';
import { colors } from '../theme';

export type IconName = ComponentProps<typeof Ionicons>['name'];

// Arrows and chevrons point the other way in Arabic
const DIRECTIONAL = /(chevron|arrow)-(back|forward)/;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

/** Ionicons with automatic mirroring of directional icons in right-to-left languages. */
export function Icon({ name, size = 20, color = colors.ink, style }: IconProps) {
  const { isRTL } = useLanguage();
  const mirrored = isRTL && DIRECTIONAL.test(name);

  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      style={[mirrored && { transform: [{ scaleX: -1 }] }, style]}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}

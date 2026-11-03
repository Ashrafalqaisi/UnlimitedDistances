import type { ReactNode } from 'react';
import {
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

interface ImageBoxProps {
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  children?: ReactNode;
}

// Replaces the deprecated ImageBackground: a cover image positioned behind the children
export function ImageBox({ source, style, imageStyle, children }: ImageBoxProps) {
  return (
    <View style={style}>
      <Image source={source} style={[StyleSheet.absoluteFill, imageStyle]} resizeMode="cover" />
      {children}
    </View>
  );
}

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
import { LinearGradient } from 'expo-linear-gradient';

interface ImageBoxProps {
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  /** Darken the lower part of the photo so white text on it stays readable. */
  shade?: boolean;
  children?: ReactNode;
}

// Replaces the deprecated ImageBackground: a cover image positioned behind the children
export function ImageBox({ source, style, imageStyle, shade = false, children }: ImageBoxProps) {
  return (
    <View style={[styles.clip, style]}>
      <Image source={source} style={[StyleSheet.absoluteFill, imageStyle]} resizeMode="cover" />
      {shade && (
        <LinearGradient
          colors={['rgba(20,20,20,0)', 'rgba(20,20,20,0.25)', 'rgba(20,20,20,0.82)']}
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
        />
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  clip: {
    overflow: 'hidden',
  },
});

import { View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  gradient?: boolean;
};

export function ThemedView({ style, lightColor, darkColor, gradient = false, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const gradientColors = useThemeColor({ light: lightColor, dark: darkColor }, 'gradient') as [string, string, ...string[]];

  if (gradient) {
    return (
      <LinearGradient
        colors={gradientColors.length >= 2 ? gradientColors : ['#ffffff', '#800080']}
        style={[{ flex: 1 }, style]}
        {...otherProps}
      />
    );
  }

  return <View style={[{ backgroundColor: backgroundColor as string }, style]} {...otherProps} />;
}

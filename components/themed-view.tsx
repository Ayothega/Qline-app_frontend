import { View, type ViewProps } from 'react-native';
import clsx from 'clsx';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string; // Add className support
};

export function ThemedView({ style, lightColor, darkColor, className, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View
      style={[{ backgroundColor }, style]}
      className={className}
      {...otherProps}
    />
  );
}
